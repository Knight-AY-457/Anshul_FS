package com.virtualqueue.backend.controller;

import com.virtualqueue.backend.model.Shop;
import com.virtualqueue.backend.model.User;
import com.virtualqueue.backend.service.UserService;
import com.virtualqueue.backend.service.ShopService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService svc;
    private final ShopService shopSvc;

    public UserController(UserService svc, ShopService shopSvc) {
        this.svc = svc;
        this.shopSvc = shopSvc;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {

            String role = user.getRole() == null ? "" : user.getRole().toLowerCase();
            user.setRole(role);

            User saved = svc.register(user);


            if (role.equals("shopkeeper")) {


                String shopName = saved.getName();


                Shop shop = new Shop(shopName, saved.getEmail(), "Auto-created");
                shopSvc.createShop(shop);
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (DataIntegrityViolationException ex) {

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already registered."));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error registering user."));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        Optional<User> user = svc.getUserByEmail(email);

        if (user.isPresent())
            return ResponseEntity.ok(user.get());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid email."));
    }


    @GetMapping
    public ResponseEntity<List<User>> all() {
        return ResponseEntity.ok(svc.getAllUsers());
    }


    @GetMapping("/{email}")
    public ResponseEntity<User> byEmail(@PathVariable String email) {
        return svc.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
