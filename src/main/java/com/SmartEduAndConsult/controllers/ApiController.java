package com.SmartEduAndConsult.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SmartEduAndConsult.models.ArticuloBlog;
import com.SmartEduAndConsult.models.Donacion;
import com.SmartEduAndConsult.models.MensajeChat;
import com.SmartEduAndConsult.models.Pago;
import com.SmartEduAndConsult.models.RecursoEducativo;
import com.SmartEduAndConsult.models.ReservaCita;
import com.SmartEduAndConsult.models.SeguimientoCompromiso;
import com.SmartEduAndConsult.models.Servicio;
import com.SmartEduAndConsult.models.Usuario;
import com.SmartEduAndConsult.services.GeneralService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    private final GeneralService service;

    public ApiController(GeneralService service) {
        this.service = service;
    }

    // Auth & Usuarios
    @PostMapping("/usuarios/registro")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(service.registrarUsuario(usuario));
    }

    @PostMapping("/usuarios/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        return service.login(credenciales.get("email"), credenciales.get("passwordHash"))
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));
    }

    // Servicios
    @GetMapping("/servicios")
    public List<Servicio> getServicios() { return service.listarServicios(); }

    @PostMapping("/servicios")
    public Servicio postServicio(@RequestBody Servicio s) { return service.crearServicio(s); }

    // Reservas (Dispara notificación de correo automáticamente)
    @PostMapping("/reservas")
    public ResponseEntity<ReservaCita> postReserva(@RequestBody ReservaCita r) {
        return ResponseEntity.ok(service.crearReserva(r));
    }

    @GetMapping("/reservas/usuario/{userId}")
    public List<ReservaCita> getReservasUsuario(@PathVariable Long userId) { 
        return service.obtenerReservasPorUsuario(userId); 
    }

    // Compromisos (Punto de integración con IA)
    @PostMapping("/compromisos")
    public SeguimientoCompromiso postCompromiso(@RequestBody SeguimientoCompromiso sc) { 
        return service.guardarCompromiso(sc); 
    }

    @GetMapping("/compromisos/reserva/{reservaId}")
    public SeguimientoCompromiso getCompromiso(@PathVariable Long reservaId) { 
        return service.obtenerCompromisoPorReserva(reservaId); 
    }

    // Recursos Educativos y Herramientas
    @GetMapping("/recursos")
    public List<RecursoEducativo> getRecursos() { return service.listarRecursos(); }

    @PostMapping("/recursos")
    public RecursoEducativo postRecurso(@RequestBody RecursoEducativo r) { return service.crearRecurso(r); }

    // Pagos
    @PostMapping("/pagos")
    public ResponseEntity<Pago> postPago(@RequestBody Pago p) {
        return ResponseEntity.ok(service.procesarPago(p));
    }

    // Chat (Usuarios <-> Asesores)
    @PostMapping("/chat/enviar")
    public ResponseEntity<MensajeChat> enviarMensaje(@RequestBody MensajeChat mensaje) {
        return ResponseEntity.ok(service.enviarMensaje(mensaje));
    }

    @GetMapping("/chat/conversacion")
    public List<MensajeChat> getConversacion(@RequestParam Long u1, @RequestParam Long u2) {
        return service.obtenerConversacion(u1, u2);
    }

    // Blog / Artículos
    @GetMapping("/articulos")
    public List<ArticuloBlog> getArticulos() { return service.listarArticulos(); }

    @PostMapping("/articulos")
    public ArticuloBlog postArticulo(@RequestBody ArticuloBlog a) { return service.crearArticulo(a); }

    // Donaciones
    @PostMapping("/donaciones")
    public ResponseEntity<Donacion> postDonacion(@RequestBody Donacion d) {
        return ResponseEntity.ok(service.registrarDonacion(d));
    }
}