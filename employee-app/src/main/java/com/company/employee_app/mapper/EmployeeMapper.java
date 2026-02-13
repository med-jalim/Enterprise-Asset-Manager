package com.company.employee_app.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.company.employee_app.dto.EmployeeCreateRequestDto;
import com.company.employee_app.dto.EmployeeResponseDto;
import com.company.employee_app.entity.Employee;
@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    EmployeeResponseDto toDto(Employee employee);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Employee toEntity(EmployeeCreateRequestDto employeeCreateRequestDto);
} 
