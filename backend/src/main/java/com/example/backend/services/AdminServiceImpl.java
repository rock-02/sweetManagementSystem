package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.SweetRequestDto;
import com.example.backend.entities.Sweet;
import com.example.backend.repositories.SweetRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private SweetRepository sweetRepository;

    @Override
    public String addSweet(SweetRequestDto sweetRequestDto) throws Exception {

        Sweet isExist = sweetRepository.findByNameAndCategory(sweetRequestDto.getName(), sweetRequestDto.getCategory());
        if (isExist != null) {
            throw new Exception("Sweet with the same name and category already exists");
        }
        Sweet sweet = new Sweet();

        sweet.setName(sweetRequestDto.getName());

        sweet.setPrice(sweetRequestDto.getPrice());

        sweet.setQuantityStock(sweetRequestDto.getQuantityStock());

        sweet.setCategory(sweetRequestDto.getCategory());

        sweetRepository.save(sweet);

        return "Sweet added successfully";

    }

    @Override
    public Sweet updateSweet(Long id, SweetRequestDto sweetRequestDto) throws Exception {

        Sweet sweet = sweetRepository.findById(id).orElseThrow(() -> new Exception("Sweet not found"));

        sweet.setName(sweetRequestDto.getName());

        sweet.setPrice(sweetRequestDto.getPrice());

        sweet.setQuantityStock(sweetRequestDto.getQuantityStock());

        sweet.setCategory(sweetRequestDto.getCategory());

        return sweetRepository.save(sweet);
    }

    @Override
    public String deleteSweet(Long id) throws Exception {

        Sweet sweet = sweetRepository.findById(id).orElseThrow(() -> new Exception("Sweet not found"));

        sweetRepository.delete(sweet);

        return "Sweet deleted successfully";
    }

}
