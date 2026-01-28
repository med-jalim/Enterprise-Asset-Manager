package com.company.asset_app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AssetCreateRequestDto {
    
    private String name;
    private String category;
    private String serialNumber;
    private String status;
}
