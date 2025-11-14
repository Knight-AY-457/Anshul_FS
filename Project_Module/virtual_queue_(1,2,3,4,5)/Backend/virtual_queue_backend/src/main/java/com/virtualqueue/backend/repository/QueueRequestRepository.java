package com.virtualqueue.backend.repository;

import com.virtualqueue.backend.model.QueueRequest;
import com.virtualqueue.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueueRequestRepository extends JpaRepository<QueueRequest, Long> {

    List<QueueRequest> findByUser(User user);

    List<QueueRequest> findByShopName(String shopName);

    List<QueueRequest> findByShopNameAndStatus(String shopName, String status);

    // PREVENT duplicate pending requests for same user
    List<QueueRequest> findByShopNameAndStatusAndUser(
            String shopName,
            String status,
            User user
    );

    // FIFO support — get APPROVED users in correct order
    List<QueueRequest> findByShopNameAndStatusOrderByApprovalTimeAsc(
            String shopName,
            String status
    );

    // For waiting list (PENDING + APPROVED)
    List<QueueRequest> findByShopNameOrderByRequestTimeAsc(String shopName);
}
