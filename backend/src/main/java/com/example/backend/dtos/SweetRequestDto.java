package com.example.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SweetRequestDto {

    private String name;

    private String category;

    private double price;

    private double quantityStock;

}
