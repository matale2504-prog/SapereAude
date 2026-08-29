package com.SmartEduAndConsult.repositories;

import com.SmartEduAndConsult.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    List<Servicio> findByCategoria(Enums.CategoriaServicio categoria);
}