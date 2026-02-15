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
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping(path="/{version}/employees",version = "v1")
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<Page<EmployeeResponseDto>> getAllEmployees(@PageableDefault Pageable pageable) {
        return ResponseEntity.ok(employeeService.getAllEmployees(pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDto> createEmployee(@RequestBody EmployeeCreateRequestDto employeeCreateRequestDto) {
        return ResponseEntity.ok(employeeService.createEmployee(employeeCreateRequestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> updateEmployee(@PathVariable Long id,
            @RequestBody EmployeeCreateRequestDto employeeCreateRequestDto) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeCreateRequestDto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

}
