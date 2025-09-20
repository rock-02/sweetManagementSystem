package com.example.backend.services;

import java.util.List;

import com.example.backend.entities.Sweet;

public interface SweetService {

    Sweet getSweetById(Long id) throws Exception;

    List<Sweet> getAllSweets() throws Exception;

    List<Sweet> searchSweets(String name, String category, Double minPrice, Double maxPrice);

}
