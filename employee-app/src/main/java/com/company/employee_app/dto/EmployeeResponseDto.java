package com.company.employee_app.dto;

public record EmployeeResponseDto(
        Long id,
        String firstName,
        String lastName,
        String email
) {
    
}
