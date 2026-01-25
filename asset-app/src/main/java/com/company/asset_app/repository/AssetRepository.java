package com.company.asset_app.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.company.asset_app.entity.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    
}
