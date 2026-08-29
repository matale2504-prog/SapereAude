package com.SmartEduAndConsult.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.SmartEduAndConsult.models.ArticuloBlog;
import com.SmartEduAndConsult.models.Donacion;
import com.SmartEduAndConsult.models.Enums;
import com.SmartEduAndConsult.models.MensajeChat;
import com.SmartEduAndConsult.models.Pago;
import com.SmartEduAndConsult.models.RecursoEducativo;
import com.SmartEduAndConsult.models.ReservaCita;
import com.SmartEduAndConsult.models.SeguimientoCompromiso;
import com.SmartEduAndConsult.models.Servicio;
import com.SmartEduAndConsult.models.Usuario;
import com.SmartEduAndConsult.repositories.ArticuloBlogRepository;
import com.SmartEduAndConsult.repositories.DonacionRepository;
import com.SmartEduAndConsult.repositories.MensajeChatRepository;
import com.SmartEduAndConsult.repositories.PagoRepository;
import com.SmartEduAndConsult.repositories.RecursoEducativoRepository;
import com.SmartEduAndConsult.repositories.ReservaCitaRepository;
import com.SmartEduAndConsult.repositories.SeguimientoCompromisoRepository;
import com.SmartEduAndConsult.repositories.ServicioRepository;
import com.SmartEduAndConsult.repositories.UsuarioRepository;
import com.SmartEduAndConsult.security.JwtUtil;

@Service
public class GeneralService {
    
    private final UsuarioRepository usuarioRepo;
    private final ServicioRepository servicioRepo;
    private final ReservaCitaRepository reservaRepo;
    private final SeguimientoCompromisoRepository compromisoRepo;
    private final RecursoEducativoRepository recursoRepo;
    private final PagoRepository pagoRepo;
    private final MensajeChatRepository chatRepo;
    private final ArticuloBlogRepository articuloRepo;
    private final DonacionRepository donacionRepo;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public GeneralService(UsuarioRepository u, ServicioRepository s,
                          ReservaCitaRepository r,
                          SeguimientoCompromisoRepository sc,
                          RecursoEducativoRepository re,
                          PagoRepository p, MensajeChatRepository chatRepo,
                          ArticuloBlogRepository articuloRepo,
                          DonacionRepository donacionRepo,
                          EmailService emailService,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.usuarioRepo = u;
        this.servicioRepo = s;
        this.reservaRepo = r;
        this.compromisoRepo = sc;
        this.recursoRepo = re;
        this.pagoRepo = p;
        this.chatRepo = chatRepo;
        this.articuloRepo = articuloRepo;
        this.donacionRepo = donacionRepo;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Usuarios & Autenticación segura con JWT y BCrypt
    public Usuario registrarUsuario(Usuario u) {
        u.setPasswordHash(passwordEncoder.encode(u.getPasswordHash()));
        return usuarioRepo.save(u);
    }

    public Optional<String> login(String email, String rawPassword) {
        Optional<Usuario> userOpt = usuarioRepo.findByEmail(email);
        if (userOpt.isPresent()) {
            Usuario user = userOpt.get();
            if (passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
                String token = jwtUtil.generateToken(user.getEmail());
                return Optional.of(token);
            }
        }
        return Optional.empty();
    }

    // Servicios
    public List<Servicio> listarServicios() { return servicioRepo.findAll(); }
    public Servicio crearServicio(Servicio s) { return servicioRepo.save(s); }

    // Reservas + Notificación automática de Correo
    public ReservaCita crearReserva(ReservaCita r) {
        ReservaCita guardada = reservaRepo.save(r);
        Usuario u = usuarioRepo.findById(r.getUsuario().getId()).orElse(null);
        if (u != null) {
            emailService.enviarConfirmacionReserva(
                u.getEmail(),
                "Tu reserva de cita ID #" + guardada.getId() + " ha sido registrada con éxito."
            );
        }
        return guardada;
    }

    public List<ReservaCita> obtenerReservasPorUsuario(Long userId) {
        return reservaRepo.findByUsuarioId(userId);
    }

    // Compromisos
    public SeguimientoCompromiso guardarCompromiso(SeguimientoCompromiso sc) {
        return compromisoRepo.save(sc);
    }

    public SeguimientoCompromiso obtenerCompromisoPorReserva(Long reservaId) {
        return compromisoRepo.findByReservaCitaId(reservaId).orElse(null);
    }

    // Recursos Educativos & Herramientas
    public List<RecursoEducativo> listarRecursos() { return recursoRepo.findAll(); }
    public RecursoEducativo crearRecurso(RecursoEducativo r) { return recursoRepo.save(r); }

    // Pagos
    // Dentro de com/SmartEduAndConsult/services/GeneralService.java

    public Pago procesarPago(Pago pago) {
        // Si no viene un estado definido, por defecto lo dejamos como PENDIENTE o EXITOSO según tu lógica de pasarela
        if (pago.getEstadoTransaccion() == null) {
            pago.setEstadoTransaccion(Enums.EstadoPago.EXITOSO); 
        }
        pago.setFechaPago(java.time.LocalDateTime.now());
    
        // Aquí podrías integrar en el futuro la llamada al SDK de Stripe / Wompi usando sus credenciales
    
        return pagoRepo.save(pago);
    }

    public List<Pago> obtenerPagosPorUsuario(Long usuarioId) {
        return pagoRepo.findByUsuarioId(usuarioId);
    }

    // Chat entre Usuarios y Asesores
    public MensajeChat enviarMensaje(MensajeChat mensaje) { return chatRepo.save(mensaje); }
    public List<MensajeChat> obtenerConversacion(Long user1, Long user2) {
        return chatRepo.obtenerConversacion(user1, user2);
    }

    // Artículos / Blog
    public List<ArticuloBlog> listarArticulos() { return articuloRepo.findAll(); }
    public ArticuloBlog crearArticulo(ArticuloBlog a) { return articuloRepo.save(a); }

    // Donaciones
    public Donacion registrarDonacion(Donacion d) { return donacionRepo.save(d); }
}