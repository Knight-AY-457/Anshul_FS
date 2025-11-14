package com.virtualqueue.backend.service;

import com.virtualqueue.backend.model.Shop;
import com.virtualqueue.backend.repository.ShopRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopService {

    private final ShopRepository repo;

    public ShopService(ShopRepository repo) {
        this.repo = repo;
    }

    //  Create shop (1 shop per owner email)
    public Shop createShop(Shop shop) {
        Optional<Shop> existing = repo.findByOwnerEmail(shop.getOwnerEmail());
        if (existing.isPresent()) {
            return existing.get();
        }

        return repo.save(shop);
    }

    public List<Shop> getAllShops() {
        return repo.findAll();
    }

    public Optional<Shop> findByShopName(String name) {
        return repo.findByName(name);
    }

    public Optional<Shop> findByOwnerEmail(String email) {
        return repo.findByOwnerEmail(email);
    }

    // NEW
    public Optional<Shop> findById(Long id) {
        return repo.findById(id);
    }
}
