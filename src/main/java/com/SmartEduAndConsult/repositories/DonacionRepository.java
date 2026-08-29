package com.SmartEduAndConsult.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SmartEduAndConsult.models.Donacion;

public interface DonacionRepository extends JpaRepository<Donacion, Long> {
}