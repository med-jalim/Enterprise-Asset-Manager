package com.company.asset_app.controller;

import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.asset_app.entity.Asset;
import com.company.asset_app.service.AssetService;

@RestController
@RequestMapping(path = "/{version}/assets",version = "v1")
public class AssetController {
    protected final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping
    public ResponseEntity<List<Asset>> getAllAssets() {
        List<Asset> assets = assetService.getAllAssets();
        return ResponseEntity.ok(assets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long id) {
        Asset asset = assetService.getAssetById(id);
        if (Objects.nonNull(asset)) {
            return ResponseEntity.ok(asset);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Asset> createAsset(@RequestBody Asset asset) {
        Asset createdAsset = assetService.createAsset(asset);
        return ResponseEntity.ok(createdAsset);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long id, @RequestBody Asset assetDetails) {
        Asset updatedAsset = assetService.updateAsset(id, assetDetails);
        if (Objects.nonNull(updatedAsset)) {
            return ResponseEntity.ok(updatedAsset);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }


}
