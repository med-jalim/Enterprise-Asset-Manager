package com.company.asset_app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssetResponseDto {
    private Long id;
    private String name;
    private String category;
    private String serialNumber;
    private String status;
    private EmployeeResponseDto employee;
}
