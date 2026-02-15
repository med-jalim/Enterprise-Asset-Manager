package com.company.asset_app.client;

import org.springframework.boot.data.autoconfigure.web.DataWebProperties.Pageable;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.company.asset_app.dto.EmployeeResponseDto;

@FeignClient(name = "employee-app")
public interface EmployeeClient {

    @GetMapping
    public ResponseEntity<Page<EmployeeResponseDto>> getAllEmployees(@PageableDefault Pageable pageable);
    
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> getEmployeeById(@PathVariable Long id);
}
