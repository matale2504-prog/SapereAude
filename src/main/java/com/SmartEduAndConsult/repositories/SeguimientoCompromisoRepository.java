package com.SmartEduAndConsult.repositories;

import com.SmartEduAndConsult.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SeguimientoCompromisoRepository extends JpaRepository<SeguimientoCompromiso, Long> {
    Optional<SeguimientoCompromiso> findByReservaCitaId(Long reservaId);
}