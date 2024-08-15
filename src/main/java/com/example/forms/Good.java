package com.example.forms;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Good {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int count;

    // Constructors
    public Good() {}

    public Good(Long id, String name, int count) {
        this.id = id;
        this.name = name;
        this.count = count;
    }
}
