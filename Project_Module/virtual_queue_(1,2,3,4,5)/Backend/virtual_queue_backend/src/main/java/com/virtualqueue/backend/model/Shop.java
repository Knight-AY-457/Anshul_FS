package com.virtualqueue.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shops")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // Shop name

    @Column(nullable = false)
    private String ownerEmail; // Owner (shopkeeper) email

    @Column(length = 1000)
    private String description;

    public Shop() {}

    public Shop(String name, String ownerEmail, String description) {
        this.name = name;
        this.ownerEmail = ownerEmail;
        this.description = description;
    }

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
