package com.virtualqueue.backend.controller;

import com.virtualqueue.backend.model.Shop;
import com.virtualqueue.backend.service.ShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "http://localhost:5173")
public class ShopController {

    private final ShopService svc;

    public ShopController(ShopService svc) {
        this.svc = svc;
    }

    @PostMapping
    public ResponseEntity<Shop> create(@RequestBody Shop shop) {
        Shop saved = svc.createShop(shop);
        return ResponseEntity.ok(saved);
    }


    @GetMapping
    public ResponseEntity<List<Shop>> all() {
        return ResponseEntity.ok(svc.getAllShops());
    }


    @GetMapping("/{name}")
    public ResponseEntity<Shop> byName(@PathVariable String name) {
        return svc.findByShopName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/owner/{email}")
    public ResponseEntity<Shop> byOwner(@PathVariable String email) {
        return svc.findByOwnerEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
