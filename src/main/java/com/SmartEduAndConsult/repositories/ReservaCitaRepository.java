package com.SmartEduAndConsult.repositories;

import com.SmartEduAndConsult.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservaCitaRepository extends JpaRepository<ReservaCita, Long> {
    List<ReservaCita> findByUsuarioId(Long usuarioId);
}