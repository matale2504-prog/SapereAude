package com.SmartEduAndConsult.repositories;

import com.SmartEduAndConsult.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByUsuarioId(Long usuarioId);
}