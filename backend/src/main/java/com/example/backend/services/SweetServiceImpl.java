package com.example.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entities.Sweet;
import com.example.backend.repositories.SweetRepository;


@Service
public class SweetServiceImpl implements SweetService {

    @Autowired
    private SweetRepository sweetRepository;

    @Override
    public Sweet getSweetById(Long id) throws Exception {
        Sweet sweet = sweetRepository.findById(id).orElse(null);
        if (sweet == null) {
            throw new Exception("Sweet not found");
        }
        return sweet;
    }

    @Override
    public List<Sweet> getAllSweets() throws Exception {
        List<Sweet> sweets = sweetRepository.findAll();
        if (sweets.isEmpty()) {
            throw new Exception("No sweets found");
        }
        return sweets;
    }

    @Override
    public List<Sweet> searchSweets(String name, String category, Double minPrice, Double maxPrice) {
        return sweetRepository.searchSweets(
                name != null && !name.isEmpty() ? name : null,
                category != null && !category.isEmpty() ? category : null,
                minPrice,
                maxPrice);
    }
}
