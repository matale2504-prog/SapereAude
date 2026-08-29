package com.SmartEduAndConsult.repositories;

import com.SmartEduAndConsult.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecursoEducativoRepository extends JpaRepository<RecursoEducativo, Long> {
    List<RecursoEducativo> findByServicioAsociadoId(Long servicioId);
}