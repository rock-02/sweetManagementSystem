package com.example.backend.services;

import com.example.backend.dtos.SweetRequestDto;
import com.example.backend.entities.Sweet;

public interface AdminService {

    String addSweet(SweetRequestDto sweetRequestDto) throws Exception;

    Sweet updateSweet(Long id, SweetRequestDto sweetRequestDto) throws Exception;

    String deleteSweet(Long id) throws Exception;


}
