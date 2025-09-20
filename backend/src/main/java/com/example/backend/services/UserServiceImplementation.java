package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entities.Purchase;
import com.example.backend.entities.Sweet;
import com.example.backend.entities.User;
import com.example.backend.config.jwtProvider;
import com.example.backend.dtos.SweetPurchaseDto;
import com.example.backend.repositories.PurchaseRepository;
import com.example.backend.repositories.SweetRepository;
import com.example.backend.repositories.userRepository;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private userRepository userRepository;

    @Autowired
    private SweetRepository sweetRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Override
    public User findUserByID(Long id) throws Exception {
        Optional<User> user = userRepository.findById(id);

        user.get().setPassword(null);

        if (user.isEmpty()) {
            throw new Exception("User not found");
        }

        return user.get();

    }

    @Override
    public User findUserByEmail(String email) throws Exception {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UnsupportedOperationException("User not found");
        }

        return user;

    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UnsupportedOperationException("User not found");
        }

        return user;
    }

    @Override
    public SweetPurchaseDto purchaseSweet(Long sweetId, double quantity, User user) throws Exception {
        // Logic to purchase a sweet
        Sweet sweet = sweetRepository.findById(sweetId).orElseThrow(() -> new Exception("Sweet not found"));

        if (sweet.getQuantityStock() < quantity) {
            throw new Exception("Insufficient stock");
        }

        sweet.setQuantityStock(sweet.getQuantityStock() - quantity);

        Purchase purchase = new Purchase();

        purchase.setQuantity(quantity);

        purchase.setSweetName(sweet.getName());

        purchase.setTotalPrice(sweet.getPrice() * quantity);

        purchase.setSweetCategory(sweet.getCategory());

        List<User> users = new ArrayList<>();
        users.add(user);
        purchase.setUsers(users);

        sweetRepository.save(sweet);

        purchaseRepository.save(purchase);

        SweetPurchaseDto purchaseDto = new SweetPurchaseDto();

        purchaseDto.setMessage("Purchase successful");

        purchaseDto.setSweetName(sweet.getName());

        purchaseDto.setQuantity(quantity);

        purchaseDto.setTotalPrice(sweet.getPrice() * quantity);

        return purchaseDto;
    }
}