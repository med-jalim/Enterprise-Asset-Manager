package com.company.employee_app.service;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;

import com.company.employee_app.dto.EmployeeCreateRequestDto;
import com.company.employee_app.dto.EmployeeResponseDto;
import com.company.employee_app.entity.Employee;
import com.company.employee_app.exception.ResourceNotFoundException;
import com.company.employee_app.mapper.EmployeeMapper;
import com.company.employee_app.repository.EmployeeRepository;


@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public Page<EmployeeResponseDto> getAllEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable).map((e) -> employeeMapper.toDto(e));
    }

    public EmployeeResponseDto getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .map((e)-> employeeMapper.toDto(e))
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    public EmployeeResponseDto createEmployee(EmployeeCreateRequestDto employeeCreateRequestDto) {
        Employee employee = employeeMapper.toEntity(employeeCreateRequestDto);
        return employeeMapper.toDto(employeeRepository.save(employee));
    }

    public EmployeeResponseDto updateEmployee(Long id, EmployeeCreateRequestDto employeeCreateRequestDto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        employee.setName(employeeCreateRequestDto.name());
        employee.setEmail(employeeCreateRequestDto.email());
        return employeeMapper.toDto(employeeRepository.save(employee));
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        employeeRepository.delete(employee);
    }
    
}
