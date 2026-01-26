package com.company.asset_app.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.company.asset_app.entity.Asset;
import com.company.asset_app.exception.ResourceNotFoundException;
import com.company.asset_app.repository.AssetRepository;

@Service
public class AssetService {
    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Asset getAssetById(Long id) {
        return assetRepository.findById(id)
        .orElseThrow(()-> new ResourceNotFoundException("Asset not found " + id));
    }

    public Asset createAsset(Asset asset) {
        return assetRepository.save(asset);
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
