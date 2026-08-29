package com.SmartEduAndConsult.services;

import org.springframework.stereotype.Service;

@Service
public class EmailService {
    public void enviarConfirmacionReserva(String destinatarioEmail, String detalleReserva) {
        // En entorno real se usa JavaMailSender. 
        // Esta simulación garantiza la ejecución correcta sin bloquear la API.
        System.out.println(">>> NOTIFICACIÓN DE EMAIL ENVIADA A: " + destinatarioEmail);
        System.out.println(">>> DETALLE: " + detalleReserva);
    }
}