package com.SmartEduAndConsult.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.SmartEduAndConsult.models.MensajeChat;
import com.SmartEduAndConsult.services.GeneralService;

@Controller
public class ChatWebSocketController {

    private final GeneralService service;

    public ChatWebSocketController(GeneralService service) {
        this.service = service;
    }

    // El frontend enviará mensajes a través de /app/chat.enviar
    @MessageMapping("/chat.enviar")
    @SendTo("/topic/mensajes")
    public MensajeChat enviarMensajeRealTime(MensajeChat mensaje) {
        // Guardamos el mensaje en la base de datos de PostgreSQL mediante tu servicio
        return service.enviarMensaje(mensaje);
    }
}