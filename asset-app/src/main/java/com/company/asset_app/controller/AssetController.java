package com.company.asset_app.controller;

import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.asset_app.entity.Asset;
import com.company.asset_app.service.AssetService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/{version}/assets",version = "v1")
public class AssetController {
    protected final AssetService assetService;

    @GetMapping
    public ResponseEntity<Page<Asset>> getAllAssets(@PageableDefault Pageable pageable) { 
        return ResponseEntity.ok(assetService.getAllAssets(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long id) {
        return ResponseEntity.ok(assetService.getAssetById(id));
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
