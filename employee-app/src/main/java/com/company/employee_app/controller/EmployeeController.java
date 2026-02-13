package com.company.employee_app.controller;

import org.springframework.web.bind.annotation.RestController;

import com.company.employee_app.dto.EmployeeCreateRequestDto;
import com.company.employee_app.dto.EmployeeResponseDto;
import com.company.employee_app.service.EmployeeService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping(path="/{version}/employees",version = "v1")
public class EmployeeController {
    private final EmployeeService employeeService;

    public ResponseEntity<Page<EmployeeResponseDto>> getAllEmployees(@PageableDefault Pageable pageable) {
        return ResponseEntity.ok(employeeService.getAllEmployees(pageable));
    }
    
    public ResponseEntity<EmployeeResponseDto> getEmployeeById(Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    public ResponseEntity<EmployeeResponseDto> createEmployee(EmployeeCreateRequestDto employeeCreateRequestDto) {
        return ResponseEntity.ok(employeeService.createEmployee(employeeCreateRequestDto));
    }

    public ResponseEntity<EmployeeResponseDto> updateEmployee(Long id,
            EmployeeCreateRequestDto employeeCreateRequestDto) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeCreateRequestDto));
    }
    
    public ResponseEntity<Void> deleteEmployee(Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

}
