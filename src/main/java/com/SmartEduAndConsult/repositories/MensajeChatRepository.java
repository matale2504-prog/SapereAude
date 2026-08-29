package com.SmartEduAndConsult.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.SmartEduAndConsult.models.MensajeChat;

public interface MensajeChatRepository extends JpaRepository<MensajeChat, Long> {
    @Query("SELECT m FROM MensajeChat m WHERE (m.remitente.id = :user1 AND m.destinatario.id = :user2) OR (m.remitente.id = :user2 AND m.destinatario.id = :user1) ORDER BY m.fechaEnvio ASC")
    List<MensajeChat> obtenerConversacion(@Param("user1") Long user1, @Param("user2") Long user2);
}