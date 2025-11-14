package com.virtualqueue.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "queue_requests")
public class QueueRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // actual Shop reference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    //  backward support
    private String shopName;

    @Column(nullable = false)
    private String serviceType;

    // link to requesting user
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String status;   // PENDING / APPROVED / DECLINED / SERVED

    private LocalDateTime requestTime;
    private LocalDateTime approvalTime;
    private LocalDateTime servedTime;

    // NEW — queue position (1 = first)
    private Integer position;   // null → not counted

    // NEW — estimated wait time in minutes
    private Integer estimatedTimeMin;

    public QueueRequest() {
        this.requestTime = LocalDateTime.now();
        this.status = "PENDING";
    }

    public QueueRequest(Shop shop, String serviceType, User user) {
        this();
        this.shop = shop;
        this.serviceType = serviceType;
        this.user = user;
        this.shopName = shop.getName();
    }

    // ============= Getters & Setters =============

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Shop getShop() { return shop; }
    public void setShop(Shop shop) {
        this.shop = shop;
        if (shop != null)
            this.shopName = shop.getName();
    }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getRequestTime() { return requestTime; }
    public void setRequestTime(LocalDateTime requestTime) { this.requestTime = requestTime; }

    public LocalDateTime getApprovalTime() { return approvalTime; }
    public void setApprovalTime(LocalDateTime approvalTime) { this.approvalTime = approvalTime; }

    public LocalDateTime getServedTime() { return servedTime; }
    public void setServedTime(LocalDateTime servedTime) { this.servedTime = servedTime; }

    public Integer getPosition() { return position; }
    public void setPosition(Integer position) { this.position = position; }

    public Integer getEstimatedTimeMin() { return estimatedTimeMin; }
    public void setEstimatedTimeMin(Integer estimatedTimeMin) { this.estimatedTimeMin = estimatedTimeMin; }
}
