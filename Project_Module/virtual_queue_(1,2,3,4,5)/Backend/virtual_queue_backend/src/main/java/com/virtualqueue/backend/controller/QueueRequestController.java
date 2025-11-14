package com.virtualqueue.backend.controller;

import com.virtualqueue.backend.model.QueueRequest;
import com.virtualqueue.backend.service.QueueRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/queue-requests")
@CrossOrigin(origins = "http://localhost:5173")
public class QueueRequestController {

    @Autowired
    private QueueRequestService queueRequestService;

    @PostMapping
    public QueueRequest createRequest(@RequestBody Map<String, Object> payload) {
        return queueRequestService.createRequest(payload);
    }


    @PutMapping("/{id}/approve")
    public QueueRequest approveRequest(@PathVariable Long id) {
        return queueRequestService.updateStatus(id, "APPROVED");
    }


    @PutMapping("/{id}/decline")
    public QueueRequest declineRequest(@PathVariable Long id) {
        return queueRequestService.updateStatus(id, "DECLINED");
    }


    @PutMapping("/{id}/served")
    public QueueRequest servedRequest(@PathVariable Long id) {
        return queueRequestService.serve(id);
    }


    @GetMapping("/user/{email}")
    public List<QueueRequest> getUserRequests(@PathVariable String email) {
        return queueRequestService.getRequestsByUserEmail(email);
    }


    @GetMapping("/shop/{shopName}/pending")
    public List<QueueRequest> getPendingRequests(@PathVariable String shopName) {
        return queueRequestService.getRequestsByShop(shopName);   // returns ALL
    }



    @GetMapping("/shop/{shopName}/all")
    public List<QueueRequest> getAllShopRequests(@PathVariable String shopName) {
        return queueRequestService.getRequestsByShop(shopName);
    }

    @GetMapping("/{id}/eta")
    public Map<String, Object> getETA(@PathVariable Long id) {
        return queueRequestService.getETA(id);
    }
}
