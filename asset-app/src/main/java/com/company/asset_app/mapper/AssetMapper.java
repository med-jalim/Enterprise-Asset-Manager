package com.company.asset_app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.company.asset_app.dto.AssetCreateRequestDto;
import com.company.asset_app.dto.AssetResponseDto;
import com.company.asset_app.entity.Asset;

@Mapper(componentModel = "spring")
public interface AssetMapper {

    AssetResponseDto toDto(Asset asset);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Asset toEntity(AssetCreateRequestDto dto);

}
