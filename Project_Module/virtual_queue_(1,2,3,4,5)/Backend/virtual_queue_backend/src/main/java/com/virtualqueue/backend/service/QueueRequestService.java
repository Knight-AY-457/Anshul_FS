package com.virtualqueue.backend.service;

import com.virtualqueue.backend.model.QueueRequest;
import com.virtualqueue.backend.model.Shop;
import com.virtualqueue.backend.model.User;
import com.virtualqueue.backend.repository.QueueRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class QueueRequestService {

    @Autowired
    private QueueRequestRepository queueRequestRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ShopService shopService;

    private static final int PER_PERSON_MIN = 5;   // Estimated time per person

    // Customer creates request (no change to request body)
    public QueueRequest createRequest(Map<String, Object> payload) {

        Long shopId = payload.get("shopId") != null
                ? Long.valueOf(payload.get("shopId").toString())
                : null;

        String serviceType = (String) payload.get("serviceType");
        String userEmail = (String) payload.get("userEmail");

        if (shopId == null) throw new RuntimeException("Shop ID missing");
        if (userEmail == null) throw new RuntimeException("User email missing");
        if (serviceType == null) throw new RuntimeException("serviceType missing");

        //  Find entities
        Shop shop = shopService.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found: " + shopId));

        User user = userService.getUserByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        // Create request
        QueueRequest req = new QueueRequest();
        req.setShop(shop);
        req.setUser(user);
        req.setShopName(shop.getName());
        req.setServiceType(serviceType);
        req.setStatus("PENDING");
        req.setRequestTime(LocalDateTime.now());

        //  Calculate next queue position for PENDING (kept to preserve existing behavior)
        int position = getNextPendingPosition(shop.getName());
        req.setPosition(position);

        //  ETA for pending (kept — you’re already showing ETA to customers)
        req.setEstimatedTimeMin(position * PER_PERSON_MIN);

        return queueRequestRepository.save(req);
    }

    //  Determine next queue position (for PENDING list)
    private int getNextPendingPosition(String shopName) {
        List<QueueRequest> pending =
                queueRequestRepository.findByShopNameAndStatus(shopName, "PENDING");
        return pending.size() + 1;
    }

    //  Determine next queue position (for APPROVED list)
    private int getNextApprovedPosition(String shopName) {
        List<QueueRequest> approved =
                queueRequestRepository.findByShopNameAndStatus(shopName, "APPROVED");
        return approved.size() + 1;
    }

    //  Update status + queue behavior
    public QueueRequest updateStatus(Long id, String status) {
        QueueRequest req = queueRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        status = status.toUpperCase();

        // When moving to APPROVED, assign position at the tail of APPROVED list
        if (status.equals("APPROVED")) {
            req.setApprovalTime(LocalDateTime.now());

            // Put at end of approved queue and compute ETA from that position
            int approvedPos = getNextApprovedPosition(req.getShopName());
            req.setPosition(approvedPos);
            req.setEstimatedTimeMin(approvedPos * PER_PERSON_MIN);
        }

        //  ENFORCE FIFO for SERVED among APPROVED users only
        if (status.equals("SERVED")) {
            ensureFIFOApproved(req);
            req.setServedTime(LocalDateTime.now());
        }

        req.setStatus(status);
        QueueRequest saved = queueRequestRepository.save(req);

        // After SERVED, reorder remaining APPROVED people (shift positions + ETA)
        if (status.equals("SERVED")) {
            reorderApprovedQueue(req.getShopName());
        }

        return saved;
    }

    // Serve wrapper (controller may call this directly)
    public QueueRequest serve(Long id) {
        return updateStatus(id, "SERVED");
    }

    // Ensure FIFO for serving: only first APPROVED (lowest position) can be served
    private void ensureFIFOApproved(QueueRequest req) {
        if (!"APPROVED".equalsIgnoreCase(req.getStatus())) {
            // If it isn't currently APPROVED, you can't serve it
            throw new RuntimeException("Only APPROVED requests can be served.");
        }

        List<QueueRequest> approved =
                queueRequestRepository.findByShopNameAndStatus(req.getShopName(), "APPROVED");

        if (approved.isEmpty()) {
            // Nothing approved to serve — let it pass (or throw)
            return;
        }

        approved.sort(Comparator.comparingInt(QueueRequest::getPosition));
        QueueRequest next = approved.get(0);

        if (!next.getId().equals(req.getId())) {
            throw new RuntimeException(
                    "Cannot serve out of order → FIFO enforced. Next to serve ID: " + next.getId()
            );
        }
    }

    // Recalculate positions + ETA for APPROVED customers after someone is served
    private void reorderApprovedQueue(String shopName) {
        List<QueueRequest> approved =
                queueRequestRepository.findByShopNameAndStatus(shopName, "APPROVED");

        approved.sort(Comparator.comparing(QueueRequest::getApprovalTime));

        int pos = 1;
        for (QueueRequest r : approved) {
            r.setPosition(pos);
            r.setEstimatedTimeMin(pos * PER_PERSON_MIN);
            pos++;
        }

        queueRequestRepository.saveAll(approved);
    }

    // Customer view
    public List<QueueRequest> getRequestsByUserEmail(String email) {
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return queueRequestRepository.findByUser(user);
    }

    // Shop view by status OR “ALL”
    public List<QueueRequest> getRequestsByShopAndStatus(String shopName, String status) {
        status = status.toUpperCase();

        if (status.equals("ALL")) {
            return queueRequestRepository.findByShopName(shopName);
        }

        return queueRequestRepository.findByShopNameAndStatus(shopName, status);
    }

    // needed for controller
    public List<QueueRequest> getRequestsByShop(String shopName) {
        return queueRequestRepository.findByShopName(shopName);
    }

    // ETA look-up
    public Map<String, Object> getETA(Long id) {
        QueueRequest req = queueRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        Map<String, Object> result = new HashMap<>();
        result.put("position", req.getPosition());
        result.put("estimatedTimeMin", req.getEstimatedTimeMin());

        return result;
    }
}
