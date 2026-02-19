package com.company.asset_app.controller;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.company.asset_app.dto.AssetCreateRequestDto;
import com.company.asset_app.dto.AssetResponseDto;
import com.company.asset_app.service.AssetService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/{version}/assets",version = "v1")
public class AssetController {
    protected final AssetService assetService;

    @GetMapping
    public ResponseEntity<Page<AssetResponseDto>> getAllAssets(@PageableDefault Pageable pageable) { 
        return ResponseEntity.ok(assetService.getAllAssets(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetResponseDto> getAssetById(@PathVariable Long id) {
        return ResponseEntity.ok(assetService.getAssetById(id));
    }

    @PostMapping
    public ResponseEntity<AssetResponseDto> createAsset(@RequestBody AssetCreateRequestDto dto) {
        AssetResponseDto createdAsset = assetService.createAsset(dto);
        return ResponseEntity.ok(createdAsset);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetResponseDto> updateAsset(@PathVariable Long id, @RequestBody AssetCreateRequestDto assetDetails) {
        return ResponseEntity.ok(assetService.updateAsset(id, assetDetails));
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }


  
    


}
