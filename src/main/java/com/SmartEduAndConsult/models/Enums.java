package com.SmartEduAndConsult.models;

public class Enums {
    public enum Rol { ESTUDIANTE, EMPRESA, ASESOR, PROFESIONAL, EMPRENDEDOR, ADMIN }
    public enum CategoriaServicio { ASESORIA, CONSULTORIA, CAPACITACION, FORMACION, ACOMPAÑAMIENTO, E_LEARNING, CREACION_CONTENIDO }
    public enum EstadoReserva { PENDIENTE, CONFIRMADA, COMPLETADA, CANCELADA }
    public enum EstadoCompromiso { PENDIENTE, ENTREGADO }
    public enum TipoRecurso { LINK, PDF, VIDEO, HERRAMIENTA_IA, PACK_DESCARGABLE }
    public enum EstadoPago { EXITOSO, FALLIDO, PENDIENTE }
    public enum PlataformaDonacion { PAYPAL, NEQUI, VAKI }
}