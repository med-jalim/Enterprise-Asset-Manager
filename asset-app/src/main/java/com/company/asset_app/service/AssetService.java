package com.company.asset_app.service;

import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.company.asset_app.dto.AssetCreateRequestDto;
import com.company.asset_app.dto.AssetResponseDto;
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


    public Page<AssetResponseDto> getAllAssets(Pageable pageable) {
        return assetRepository.findAll(pageable)
        .map(a->assetMapper.toDto(a));
    }

    public Asset getAssetById(Long id) {
        return assetRepository.findById(id)
        .orElseThrow(()-> new ResourceNotFoundException("Asset not found " + id));
    }

    public AssetResponseDto createAsset(AssetCreateRequestDto dto) {
        return assetMapper.toDto(assetRepository.save(assetMapper.toEntity(dto)));
    }

    public Asset updateAsset(Long id, Asset assetDetails) {
        Asset asset = assetRepository.findById(id).orElse(null);
        if (Objects.nonNull(asset)) {
            asset.setName(assetDetails.getName());
            asset.setCategory(assetDetails.getCategory());
            asset.setSerialNumber(assetDetails.getSerialNumber());
            asset.setStatus(assetDetails.getStatus());
            return assetRepository.save(asset);
        }
        return null;
    }

    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }

    
}
