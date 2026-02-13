
package com.company.employee_app.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    protected Long id ;

    @Column(name = "name", nullable = false)
    protected String name ;

    @Column(name = "email", nullable = false, unique = true)
    protected String email;
    
    @Column(name = "created_at", insertable = false, updatable = false)
    protected LocalDateTime createdAt ;
}
