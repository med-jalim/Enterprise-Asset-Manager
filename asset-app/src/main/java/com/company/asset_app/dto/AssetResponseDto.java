package com.company.asset_app.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AssetResponseDto {
    private Long id;
    private String name;
    private String category;
    private String serialNumber;
    private String status;
}
