package com.example.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SweetPurchaseDto {

    private String message;

    private String sweetName;

    private double quantity;

    private double totalPrice;
}
