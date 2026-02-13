package com.company.employee_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.employee_app.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    
}
