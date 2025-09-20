package com.example.backend.services;

import com.example.backend.dtos.SweetPurchaseDto;
import com.example.backend.entities.User;

public interface UserService {

    public User findUserByID(Long id) throws Exception;

    public User findUserByEmail(String email) throws Exception;

    public User findUserByJwt(String jwt) throws Exception;

    public SweetPurchaseDto purchaseSweet(Long id, double quantity, User user) throws Exception;

}
