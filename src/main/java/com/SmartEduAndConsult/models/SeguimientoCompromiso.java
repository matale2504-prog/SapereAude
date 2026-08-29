package com.SmartEduAndConsult.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "seguimiento_compromisos")
public class SeguimientoCompromiso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_reserva", nullable = false)
    private ReservaCita reservaCita;

    @Column(name = "descripcion_tarea", columnDefinition = "TEXT", nullable = false)
    private String descripcionTarea;

    @Column(name = "recursos_recomendados", columnDefinition = "TEXT")
    private String recursosRecomendados;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Enums.EstadoCompromiso estado = Enums.EstadoCompromiso.PENDIENTE;
}