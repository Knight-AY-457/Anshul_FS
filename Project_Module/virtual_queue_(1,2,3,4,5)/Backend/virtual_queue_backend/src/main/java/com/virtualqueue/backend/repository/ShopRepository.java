package com.virtualqueue.backend.repository;

import com.virtualqueue.backend.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {

    Optional<Shop> findByName(String name);

    Optional<Shop> findByOwnerEmail(String ownerEmail);
}
