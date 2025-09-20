package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.SweetPurchaseDto;
import com.example.backend.entities.Sweet;
import com.example.backend.entities.User;
import com.example.backend.services.SweetService;
import com.example.backend.services.UserService;

@RestController
@RequestMapping("/api")
public class sweetController {

    @Autowired
    private SweetService sweetService;

    @Autowired
    private UserService userService;

    @GetMapping("/sweets/all")
    ResponseEntity<List<Sweet>> getAllSweets(@RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserByJwt(token);

        if (user == null) {
            throw new Exception("User not found");
        }

        List<Sweet> sweets = sweetService.getAllSweets();

        return ResponseEntity.status(HttpStatus.OK).body(sweets);
    }

    @GetMapping("/sweets/{id}")
    ResponseEntity<Sweet> getSweetById(@RequestHeader("Authorization") String token, @PathVariable Long id)
            throws Exception {

        User user = userService.findUserByJwt(token);

        if (user == null) {
            throw new Exception("User not found");
        }

        Sweet sweet = sweetService.getSweetById(id);

        return ResponseEntity.status(HttpStatus.OK).body(sweet);
    }

    @GetMapping("/sweets/search")
    ResponseEntity<List<Sweet>> searchSweets(@RequestHeader("Authorization") String token,
            String name, String category, Double minPrice, Double maxPrice) throws Exception {

        User user = userService.findUserByJwt(token);

        if (user == null) {
            throw new Exception("User not found");
        }

        List<Sweet> sweets = sweetService.searchSweets(name, category, minPrice, maxPrice);

        return ResponseEntity.status(HttpStatus.OK).body(sweets);
    }

    @PostMapping("/sweets/{id}/purchase")
    ResponseEntity<SweetPurchaseDto> purchaseSweet(@RequestHeader("Authorization") String token,
            @PathVariable Long id, @RequestParam double quantity) throws Exception {

        User user = userService.findUserByJwt(token);

        if (user == null) {
            throw new Exception("User not found");
        }

        SweetPurchaseDto response = userService.purchaseSweet(id, quantity, user);

        // Logic to purchase the sweet
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
