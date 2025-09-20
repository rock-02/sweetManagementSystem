package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.SweetRequestDto;
import com.example.backend.entities.Sweet;
import com.example.backend.entities.User;
import com.example.backend.services.AdminService;
import com.example.backend.services.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;

    @PostMapping("/api/sweets")
    public ResponseEntity<String> addSweet(@RequestHeader("Authorization") String token,
            @RequestBody SweetRequestDto sweet) throws Exception {
        // Logic to add a new sweet
        User user = userService.findUserByJwt(token);

        if (user == null) {
            throw new Exception("User not found");
        }

        if (!user.getRoles().contains("ADMIN")) {
            throw new Exception("Unauthorized: Admin access required");
        }
        String resp = adminService.addSweet(sweet);

        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PutMapping("/api/sweets/{id}")
    public ResponseEntity<Sweet> updateSweet(@RequestHeader("Authorization") String token, @PathVariable Long id,
            @RequestBody SweetRequestDto sweet) throws Exception {
        // Logic to update an existing sweet
        User user = userService.findUserByJwt(token);

        if (user == null) {
            throw new Exception("User not found");
        }

        if (!user.getRoles().contains("ADMIN")) {
            throw new Exception("Unauthorized: Admin access required");
        }

        Sweet updatedSweet = adminService.updateSweet(id, sweet);

        return ResponseEntity.status(HttpStatus.OK).body(updatedSweet);
    }

    @DeleteMapping("/api/sweets/{id}")
    public ResponseEntity<String> deleteSweet(@RequestHeader("Authorization") String token, @PathVariable Long id)
            throws Exception {
        // Logic to delete a sweet
        User user = userService.findUserByJwt(token);

        if (user == null) {
            throw new Exception("User not found");
        }

        if (!user.getRoles().contains("ADMIN")) {
            throw new Exception("Unauthorized: Admin access required");
        }

        String response = adminService.deleteSweet(id);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
