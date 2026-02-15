package com.company.asset_app.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.company.asset_app.client.EmployeeClient;
import com.company.asset_app.dto.AssetCreateRequestDto;
import com.company.asset_app.dto.AssetResponseDto;
import com.company.asset_app.dto.EmployeeResponseDto;
import com.company.asset_app.entity.Asset;
import com.company.asset_app.exception.ResourceNotFoundException;
import com.company.asset_app.mapper.AssetMapper;
import com.company.asset_app.repository.AssetRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final AssetRepository assetRepository;
    private final AssetMapper assetMapper;
    private final EmployeeClient employeeClient;


    public Page<AssetResponseDto> getAllAssets(Pageable pageable) {
        return assetRepository.findAll(pageable)
        .map(a->assetMapper.toDto(a));
    }

    public AssetResponseDto getAssetById(Long id) {
        return assetRepository.findById(id)
        .map(a->assetMapper.toDto(a))
        .orElseThrow(()-> new ResourceNotFoundException("Asset not found " + id));
    }

    public AssetResponseDto createAsset(AssetCreateRequestDto dto) {
        return assetMapper.toDto(assetRepository.save(assetMapper.toEntity(dto)));
    }

    public AssetResponseDto updateAsset(Long id, AssetCreateRequestDto assetDetails) {
        Asset asset = assetRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Asset not found " + id));
        asset.setName(assetDetails.getName());
        asset.setCategory(assetDetails.getCategory());
        asset.setSerialNumber(assetDetails.getSerialNumber());
        asset.setStatus(assetDetails.getStatus());
        return assetMapper.toDto(assetRepository.save(asset));
    }

    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }

    public EmployeeResponseDto getEmployeeById(Long id) {
        return employeeClient.getEmployeeById(id).getBody();
    }

    
}
