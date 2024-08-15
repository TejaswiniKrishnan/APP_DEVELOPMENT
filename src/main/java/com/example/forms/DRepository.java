package com.example.forms;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DRepository extends JpaRepository<DModel, Long> {
    DModel findByEmail(String email);

    DModel findByFirstname(String firstname);

    List<DModel> findAll();

    @Query("SELECT d.phoneNumber FROM DModel d WHERE d.phoneNumber IS NOT NULL")
    List<String> findAllPhoneNumbers();

}
