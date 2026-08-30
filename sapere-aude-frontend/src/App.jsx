// src/App.jsx
import React, { useState } from "react";
import { registrarUsuario, loginUsuario } from "./services/api";
import "./App.css";

export default function App() {
  const [vistaActual, setVistaActual] = useState("home");
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [herramientaSeleccionada, setHerramientaSeleccionada] = useState(null);
  const [iaSeleccionada, setIaSeleccionada] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [mensaje, mensajeSet] = useState("");
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUsuario({ email, password });
      setUsuarioLogueado(data);
      mensajeSet("¡Bienvenido a Sapere Aude!");
      setVistaActual("home");
    } catch (error) {
      mensajeSet("Error: Credenciales inválidas.");
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      await registrarUsuario({ nombre, email, password });
      mensajeSet("¡Registro exitoso! Por favor inicia sesión.");
      setVistaActual("login");
    } catch (error) {
      mensajeSet("Error al registrar el usuario.");
    }
  };

  const listaServicios = [
    {
      id: "asesorias",
      titulo: "1. Asesorías Académicas",
      resumen: "Acompañamiento enfocado a estudiantes universitarios en ciencias sociales, matemáticas, administración, idiomas y salud.",
      detalles: [
        "Clases individuales personalizadas",
        "Clases grupales por temática",
        "Preparación para exámenes y refuerzo académico",
        "Planes de estudio personalizados",
        "Orientación en trabajos con enfoque analítico",
        "Acompañamiento en proyectos académicos",
        "Resolución guiada de trabajos académicos"
      ]
    },
    {
      id: "elearning",
      titulo: "2. E-learning",
      resumen: "Desarrollo de cursos, clases y programas formativos en modalidad virtual orientados a fortalecer competencias.",
      detalles: [
        "Cursos virtuales por temática",
        "Microclases prácticas y flexibles",
        "Programas de nivelación académica",
        "Cursos de preparación de ingreso a la universidad",
        "Talleres interactivos de actualización",
        "Bootcamps intensivos"
      ]
    },
    {
      id: "contenido",
      titulo: "3. Creación de Contenido Educativo",
      resumen: "Contenido desarrollado para plataformas digitales enfocado en la divulgación de conocimiento y estrategias de estudio.",
      detalles: [
        "Creación de contenido académico para redes sociales",
        "Videos educativos especializados",
        "Blog educativo y de artículos académicos",
        "Podcast formativo",
        "Material académico pago descargable"
      ]
    },
    {
      id: "consultoria",
      titulo: "4. Consultoría",
      resumen: "Asesoría en el ciclo de proyectos dirigida a organizaciones en áreas social, educativa, ambiental y salud.",
      detalles: [
        "Formulación de proyectos",
        "Estructuración de propuestas técnicas",
        "Diseño de planes de trabajo y optimización de recursos",
        "Capacitación para equipos de trabajo corporativo",
        "Diseño de estrategias y procesos formativos"
      ]
    }
  ];

  const listaHerramientas = [
    {
      id: "escritura",
      titulo: "Escritura y Contenido para Redes Sociales",
      resumen: "Herramientas para redacción y creación de contenido digital.",
      items: [{ nombre: "Rytr", url: "https://rytr.me/" }]
    },
    {
      id: "correccion",
      titulo: "Corrección Ortográfica y Gramatical",
      resumen: "Apoyo para mejorar la calidad de tus textos.",
      items: [
        { nombre: "Quillbot", url: "https://quillbot.com/" },
        { nombre: "Writerly", url: "https://www.writerly.ai/" }
      ]
    },
    {
      id: "redes_herramientas",
      titulo: "Creación de Contenido de Redes Sociales",
      resumen: "Optimización de estrategias de marketing y contenidos.",
      items: [
        { nombre: "Wordkraft", url: "https://wordkraft.ai/" },
        { nombre: "Writesonic", url: "https://writesonic.com/" }
      ]
    },
    {
      id: "escritura_extra",
      titulo: "Escritura y Asistencia Creativa",
      resumen: "Plataformas de apoyo a la redacción y generación de ideas.",
      items: [
        { nombre: "Heyfriday", url: "https://heyfriday.ai/home" },
        { nombre: "Hyperwriteai", url: "https://www.hyperwriteai.com/" },
        { nombre: "Jenni", url: "https://jenni.ai/?via=tien&gad_source=1" }
      ]
    },
    {
      id: "resumenes",
      titulo: "Resúmenes",
      resumen: "Extracción rápida de ideas clave de textos o documentos.",
      items: [
        { nombre: "Tldrthis", url: "https://www.tldrthis.com/" },
        { nombre: "Getconverse", url: "https://www.getconverse.com/?ref=futuretools.io" }
      ]
    },
    {
      id: "diseno",
      titulo: "Aplicaciones para Diseño",
      resumen: "Herramientas de diseño gráfico y recursos visuales.",
      items: [
        { nombre: "Creative Cloud", url: "https://creativecloud.adobe.com/es" },
        { nombre: "Looka", url: "https://looka.com/" },
        { nombre: "Leonardo", url: "https://leonardo.ai/" },
        { nombre: "Renderforest", url: "https://www.renderforest.com/es/" },
        { nombre: "Stockimg", url: "https://stockimg.ai/" }
      ]
    },
    {
      id: "multimedia",
      titulo: "Producción de Videos, Imágenes y Multimedia",
      resumen: "Edición de video, imágenes y generación multimedia.",
      items: [
        { nombre: "Runwayml", url: "https://runwayml.com/" },
        { nombre: "Hotpot", url: "https://hotpot.ai/" },
        { nombre: "Canva", url: "https://www.canva.com/" },
        { nombre: "Deepai", url: "https://deepai.org/" },
        { nombre: "Fotor", url: "https://www.fotor.com/es/" },
        { nombre: "Lumen5", url: "https://lumen5.com/" },
        { nombre: "Pictory", url: "https://pictory.ai/" },
        { nombre: "Keyframes Studio", url: "https://keyframes.studio/" },
        { nombre: "Predis", url: "https://predis.ai/" },
        { nombre: "Veed", url: "https://www.veed.io/" },
        { nombre: "Clipdrop", url: "https://clipdrop.co/" },
        { nombre: "Fliki", url: "https://fliki.ai/?via=kenny123" },
        { nombre: "Clipchamp", url: "https://clipchamp.com/es/" },
        { nombre: "Synthesia", url: "https://www.synthesia.io/" }
      ]
    },
    {
      id: "directorios",
      titulo: "Directorio de Inteligencias Artificiales",
      resumen: "Plataformas y buscadores de herramientas de IA.",
      items: [
        { nombre: "Lachief", url: "https://www.lachief.io/" },
        { nombre: "Toolify", url: "https://www.toolify.ai/" },
        { nombre: "Aifindy", url: "https://aifindy.com/" }
      ]
    },
    {
      id: "respuestas",
      titulo: "Generador de Respuestas en Distintas Áreas",
      resumen: "Resolución de problemas complejos y cálculos.",
      items: [{ nombre: "Wolframalpha", url: "https://www.wolframalpha.com/" }]
    },
    {
      id: "imagen_video",
      titulo: "Texto a Imagen o Video",
      resumen: "Creación automatizada de material audiovisual.",
      items: [
        { nombre: "Photosonic", url: "https://photosonic.pro/" },
        { nombre: "Synthesia", url: "https://www.synthesia.io/" },
        { nombre: "Rephrase", url: "https://www.rephrase.ai/" }
      ]
    },
    {
      id: "voz",
      titulo: "Generador de Voz",
      resumen: "Síntesis de voz artificial de alta calidad.",
      items: [{ nombre: "Murf", url: "https://murf.ai/" }]
    },
    {
      id: "marketing",
      titulo: "Apoyo en Actividades de Marketing",
      resumen: "Estrategias y redacción publicitaria.",
      items: [{ nombre: "Jasper", url: "https://www.jasper.ai/" }]
    },
    {
      id: "programacion",
      titulo: "Programación en Distintos Lenguajes",
      resumen: "Asistencia para depurar y escribir código.",
      items: [{ nombre: "Metabob", url: "https://metabob.com/" }]
    },
    {
      id: "mapas",
      titulo: "Mapas Conceptuales",
      resumen: "Organización visual de la información.",
      items: [{ nombre: "CmapTools", url: "https://cmap.ihmc.us/cmaptools/" }]
    },
    {
      id: "aprendizaje",
      titulo: "Aprendizaje Autónomo",
      resumen: "Recursos educativos interactivos.",
      items: [{ nombre: "Teach Anything", url: "https://www.teach-anything.com/" }]
    },
    {
      id: "excel",
      titulo: "Apoyo Tareas de Excel",
      resumen: "Automatización y fórmulas de hojas de cálculo.",
      items: [{ nombre: "Aiexcelbot", url: "https://aiexcelbot.com/" }]
    },
    {
      id: "salud",
      titulo: "Asistente Personal de Salud",
      resumen: "Consultas y orientación médica preliminar.",
      items: [{ nombre: "Docus", url: "https://docus.ai/" }]
    },
    {
      id: "presentaciones",
      titulo: "Presentaciones",
      resumen: "Creación automatizada de diapositivas y pitches.",
      items: [
        { nombre: "Magicslides", url: "https://www.magicslides.app/es" },
        { nombre: "Decktopus", url: "https://www.decktopus.com/" }
      ]
    },
    {
      id: "imagenes_gratis",
      titulo: "Imágenes Gratuitas",
      resumen: "Bancos de imágenes libres de derechos.",
      items: [{ nombre: "Pixabay", url: "https://pixabay.com/es/" }]
    },
    {
      id: "musica",
      titulo: "Generador de Música Gratuita",
      resumen: "Composición de pistas musicales mediante IA.",
      items: [
        { nombre: "Boomy", url: "https://boomy.com/" },
        { nombre: "Beatoven", url: "https://www.beatoven.ai/" }
      ]
    },
    {
      id: "buscar",
      titulo: "Buscar Información",
      resumen: "Motores de búsqueda avanzados.",
      items: [{ nombre: "Komo", url: "https://komo.ai/" }]
    },
    {
      id: "cambio_voz",
      titulo: "Cambio de Voz",
      resumen: "Modificación de voz en tiempo real o grabada.",
      items: [{ nombre: "Koe", url: "https://koe.ai/recast/" }]
    }
  ];

  const listaIAs = [
    {
      id: "sitios_web",
      titulo: "Creador de Sitios Web",
      resumen: "Herramientas para diseñar páginas web con IA.",
      items: [
        { nombre: "Ace", url: "https://ace.me/" },
        { nombre: "Typedream", url: "https://typedream.com/?utm_source=toolify" },
        { nombre: "Soloist", url: "https://soloist.ai/?utm_source=toolify" },
        { nombre: "Brizy", url: "https://www.brizy.io/brizy-ai-website-builder?utm_source=toolify" }
      ]
    },
    {
      id: "logotipos",
      titulo: "Crear Logotipos, Tarjetas y Diseño",
      resumen: "Generación de identidad de marca y elementos gráficos.",
      items: [
        { nombre: "BrandCrowd", url: "https://www.brandcrowd.com/es-es?utm_source=toolify" },
        { nombre: "BondU", url: "https://www.bondu.in/?utm_source=toolify" }
      ]
    },
    {
      id: "agentes_ia",
      titulo: "Agentes de IA",
      resumen: "Asistentes virtuales especializados.",
      items: [{ nombre: "Sonic", url: "https://www.atom.com/name/SonicLink" }]
    },
    {
      id: "software_ia",
      titulo: "Herramientas y Software de IA",
      resumen: "Directorio de recursos tecnológicos avanzados.",
      items: [{ nombre: "Futurepedia", url: "https://www.futurepedia.io/?utm_source=toolify" }]
    },
    {
      id: "monitoreo",
      titulo: "Monitoreo de Medios",
      resumen: "Seguimiento de menciones y noticias.",
      items: [{ nombre: "Truescope", url: "https://truescope.com/?utm_source=toolify" }]
    },
    {
      id: "asistente",
      titulo: "Asistente",
      resumen: "Plataformas multifuncionales de ayuda diaria.",
      items: [{ nombre: "Abacus", url: "https://abacus.ai/?utm_source=toolify" }]
    },
    {
      id: "estudio_recursos",
      titulo: "Recursos para Estudiar",
      resumen: "Utilidades enfocadas en la educación.",
      items: [{ nombre: "Cognito", url: "https://cognito.org/?utm_source=toolify" }]
    },
    {
      id: "imagenes_stock",
      titulo: "Imágenes Gratuitas de IA",
      resumen: "Fotografías generadas por inteligencia artificial.",
      items: [{ nombre: "Stockcake", url: "https://stockcake.com/es?utm_source=toolify" }]
    },
    {
      id: "analisis_pdf",
      titulo: "Herramientas de Análisis para PDFs",
      resumen: "Extracción de información de documentos PDF.",
      items: [{ nombre: "Chat PDF", url: "https://www.chatpdf.com/es?utm_source=toolify" }]
    },
    {
      id: "nombre_negocio",
      titulo: "Crea el Nombre para tu Negocio",
      resumen: "Generadores creativos de nombres comerciales.",
      items: [{ nombre: "Namelix", url: "https://namelix.com/?utm_source=toolify" }]
    },
    {
      id: "creacion_negocios",
      titulo: "Creación y Crecimiento de Negocios",
      resumen: "Herramientas de apoyo empresarial.",
      items: [{ nombre: "Pillar", url: "https://pillar.io/?utm_source=toolify" }]
    },
    {
      id: "actores_ia",
      titulo: "Videos con Actores de IA",
      resumen: "Presentadores virtuales y síntesis de video.",
      items: [
        { nombre: "VideoAI", url: "https://videoai.me/?utm_source=toolify" },
        { nombre: "Stability", url: "https://stability.ai/?utm_source=toolify" }
      ]
    },
    {
      id: "marketing_ia",
      titulo: "Marketing",
      resumen: "Optimización de campañas publicitarias.",
      items: [
        { nombre: "Stormy", url: "https://stormy.ai/?utm_source=toolify" },
        { nombre: "Munch Studio", url: "https://www.munchstudio.com/?utm_source=toolify" },
        { nombre: "Glorify", url: "https://glorify.com/?utm_source=toolify" }
      ]
    },
    {
      id: "invitaciones",
      titulo: "Diseñar Invitaciones",
      resumen: "Creación de tarjetas personalizadas.",
      items: [{ nombre: "Greetings Island", url: "https://www.greetingsisland.com/ai-invitation-generator?utm_source=toolify" }]
    },
    {
      id: "investigacion",
      titulo: "Apoyo para la Investigación",
      resumen: "Motores académicos y recopilación bibliográfica.",
      items: [
        { nombre: "Semantic Scholar", url: "https://www.semanticscholar.org/?utm_source=toolify" },
        { nombre: "Research Rabbit", url: "https://www.researchrabbit.ai/?utm_source=toolify" },
        { nombre: "Copyowl", url: "https://copyowl.ai/?utm_source=toolify" },
        { nombre: "Andisearch", url: "https://andisearch.com/" },
        { nombre: "Scispace", url: "https://scispace.com/?utm_source=toolify" }
      ]
    },
    {
      id: "detectar_ia",
      titulo: "Detectar Imágenes Generadas por IA",
      resumen: "Verificación de autenticidad visual.",
      items: [{ nombre: "AI Image Detector", url: "https://www.aiimagedetector.com/?utm_source=toolify" }]
    },
    {
      id: "musica_sonidos",
      titulo: "Crear Música o Sonidos",
      resumen: "Generación de pistas musicales y efectos.",
      items: [
        { nombre: "Udio", url: "https://www.udio.com/?utm_source=toolify" },
        { nombre: "GenSFX", url: "https://gensfx.com/?utm_source=toolify" }
      ]
    },
    {
      id: "imagenes_videos_ia",
      titulo: "Crear Imágenes y Videos con IA",
      resumen: "Suite completa de generación visual.",
      items: [
        { nombre: "Media.io", url: "https://www.media.io/ai/es/home?utm_source=toolify" },
        { nombre: "Hedra", url: "http://hedra.com/app/home" },
        { nombre: "Mango Animate", url: "https://mangoanimate.com/es/ai?utm_source=toolify" },
        { nombre: "BasedLabs", url: "https://www.basedlabs.ai/?utm_source=toolify" },
        { nombre: "Digen", url: "https://digen.ai/en/explore" },
        { nombre: "Vmake", url: "https://vmake.ai/?utm_source=toolify" },
        { nombre: "Magiclight", url: "https://magiclight.ai/es/?utm_source=toolify" },
        { nombre: "Clipfly", url: "https://www.clipfly.ai/?utm_source=toolify" },
        { nombre: "Morphstudio", url: "https://app.morphstudio.com/library" },
        { nombre: "Joyfun", url: "https://joyfun.ai/?utm_source=toolify" },
        { nombre: "Clipmove", url: "https://www.clipmove.com/es?utm_source=toolify" },
        { nombre: "Similarvideo", url: "https://similarvideo.ai/es?utm_source=toolify" },
        { nombre: "Vidnarrate", url: "https://www.vidnarrate.com/?utm_source=toolify" },
        { nombre: "Videoinu", url: "https://videoinu.com/app/home?utm_source=toolify" },
        { nombre: "Genape", url: "https://genape.ai/?utm_source=toolify" },
        { nombre: "Customuse", url: "https://customuse.com/?utm_source=toolify" },
        { nombre: "A1.art", url: "https://a1.art/?source=web&plan=toolify" },
        { nombre: "Disney Pixar Generator", url: "https://disneypixaraigenerator.com/?utm_source=toolify" },
        { nombre: "Icons8", url: "https://icons8.com/?utm_source=toolify" },
        { nombre: "Visualgpt", url: "https://visualgpt.io/?utm_source=toolify" },
        { nombre: "Miricanvas", url: "https://www.miricanvas.com/es?utm_source=toolify" },
        { nombre: "Fotor", url: "https://www.fotor.com/ai-image-tools/" },
        { nombre: "Piclumen", url: "https://www.piclumen.com/?utm_source=toolify" },
        { nombre: "Aistory", url: "https://www.aistory.video/?utm_source=toolify" }
      ]
    },
    {
      id: "agente_trabajo",
      titulo: "Agente de IA para el Trabajo",
      resumen: "Optimización de tareas profesionales y notas.",
      items: [
        { nombre: "Paperclip", url: "https://paperclip.ing/?utm_source=toolify" },
        { nombre: "AskAIchat", url: "https://askaichat.app/es?utm_source=toolify" },
        { nombre: "Polsia", url: "https://polsia.com/?utm_source=toolify" },
        { nombre: "Kuse", url: "https://www.kuse.ai/?utm_source=toolify" },
        { nombre: "Mem", url: "https://get.mem.ai/" },
        { nombre: "Myminutes", url: "https://myminutes.ai/?utm_source=toolify" }
      ]
    },
    {
      id: "generadores_voz_ia",
      titulo: "Generadores de Voz y Texto a Voz",
      resumen: "Herramientas avanzadas de locución y audio.",
      items: [
        { nombre: "Deepgram", url: "https://deepgram.com/ai-voice-generator?utm_source=toolify" },
        { nombre: "Naturalreaders", url: "https://www.naturalreaders.com/?utm_source=toolify" },
        { nombre: "Cvoice", url: "https://cvoice.ai/?utm_source=toolify" },
        { nombre: "Poppop", url: "https://poppop.ai/ai-text-to-speech?utm_source=toolify" }
      ]
    },
    {
      id: "editores_multimedia",
      titulo: "Editor de Fotos y Videos",
      resumen: "Edición integral de contenido gráfico.",
      items: [
        { nombre: "Capcut", url: "https://www.capcut.com/?utm_source=toolify" },
        { nombre: "Pica-ai", url: "https://www.pica-ai.com/?utm_source=toolify" },
        { nombre: "Image Editor", url: "https://image-editor.org/?utm_source=toolify" },
        { nombre: "Remove Photos", url: "https://remove.photos/?utm_source=toolify" },
        { nombre: "Ifoto", url: "https://www.ifoto.ai/?utm_source=toolify" }
      ]
    },
    {
      id: "utilidades_audio_imagen",
      titulo: "Utilidades de Audio y Modificación Visual",
      resumen: "Cambio de voz, eliminación de marcas de agua y mejoras.",
      items: [
        { nombre: "Voice Changer Video", url: "https://voicechanger.video/?utm_source=toolify" },
        { nombre: "AI Vocal", url: "https://aivocal.io/?utm_source=toolify" },
        { nombre: "Decopy", url: "https://decopy.ai/es/?utm_source=toolify" },
        { nombre: "Anijam", url: "https://www.anijam.ai/?utm_source=toolify" },
        { nombre: "Bazaart", url: "https://www.bazaart.com/?utm_source=toolify" },
        { nombre: "Yodayo", url: "https://yodayo.com/?utm_source=toolify" },
        { nombre: "Leonardo AI", url: "https://leonardo.ai/?utm_source=toolify" },
        { nombre: "Lummi", url: "https://www.lummi.ai/?utm_source=toolify" },
        { nombre: "Caricaturer", url: "https://caricaturer.io/?utm_source=toolify" },
        { nombre: "Image to Sketch", url: "https://imagetosketch.com/?utm_source=toolify" },
        { nombre: "Artrobot", url: "https://artrobot.ai/?utm_source=toolify" },
        { nombre: "Musepro", url: "https://musepro.app/?utm_source=toolify" },
        { nombre: "Basedlabs Files", url: "https://www.basedlabs.ai/files" },
        { nombre: "Chat Z", url: "https://chat.z.ai/" },
        { nombre: "Felo", url: "https://felo.ai/search?utm_source=toolify" },
        { nombre: "Picdoc", url: "https://www.picdoc.ai/?utm_source=toolify" },
        { nombre: "Reach", url: "https://www.reach.app/?utm_source=toolify" },
        { nombre: "Photorestore", url: "http://photorestore.io/?utm_source=toolify" },
        { nombre: "Upscaleimage", url: "https://www.upscaleimage.ai/?utm_source=toolify" },
        { nombre: "Unwatermark", url: "https://unwatermark.ai/video-watermark-remover/" },
        { nombre: "Magiceraser", url: "https://magiceraser.org/?utm_source=toolify" }
      ]
    },
    {
      id: "social_creativa",
      titulo: "Redes Sociales, Prompts y Productividad",
      resumen: "Hashtags, prompts, y herramientas de estudio.",
      items: [
        { nombre: "Hashtagenius", url: "https://hashtagenius.com/?utm_source=toolify" },
        { nombre: "MogoFun", url: "https://mogofun.com/?utm_source=toolify" },
        { nombre: "Plano.ly", url: "https://plano.ly/?utm_source=toolify" },
        { nombre: "Grok", url: "https://grok.com/?utm_source=toolify" },
        { nombre: "PromptHero", url: "https://prompthero.com/?utm_source=toolify" },
        { nombre: "Atera", url: "https://www.atera.com/ai/robin/?utm_source=toolifyai" },
        { nombre: "Toolsmart", url: "https://www.toolsmart.ai/online-feature-youtube-to-mp3/" },
        { nombre: "Slidespilot", url: "https://www.slidespilot.com/?utm_source=toolify" },
        { nombre: "Twistly", url: "https://twistly.ai/?utm_source=toolify" },
        { nombre: "Decksyai", url: "https://decksyai.com/?utm_source=toolify" },
        { nombre: "Studyfetch", url: "https://www.studyfetch.com/?utm_source=toolify" },
        { nombre: "Thetawave", url: "https://thetawave.ai/es?utm_source=toolify" },
        { nombre: "Studypotion", url: "https://www.studypotion.ai/?utm_source=toolify" },
        { nombre: "PDFGuru", url: "https://pdfguru.com/pdf-summarizer" },
        { nombre: "AIPDFReader", url: "https://aipdfreader.net/?utm_source=toolify" },
        { nombre: "Filepower", url: "https://filepower.ai/?utm_source=toolify" },
        { nombre: "Opinion Stage", url: "https://www.opinionstage.com/ai?utm_source=toolify" }
      ]
    }
  ];

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setVistaActual("home")}>
          <img 
            src="/logo.png" 
            alt="Sapere Aude E-learning & Consultoría" 
            className="logo-img" 
          />
        </div>
        <div className="nav-links">
          <button className={`nav-link-btn ${vistaActual === "home" ? "active" : ""}`} onClick={() => setVistaActual("home")}>Inicio</button>
          <button className={`nav-link-btn ${vistaActual === "servicios" ? "active" : ""}`} onClick={() => setVistaActual("servicios")}>Servicios</button>
          <button className={`nav-link-btn ${vistaActual === "articulos" ? "active" : ""}`} onClick={() => setVistaActual("articulos")}>Artículos</button>
          <button className={`nav-link-btn ${vistaActual === "herramientas" ? "active" : ""}`} onClick={() => setVistaActual("herramientas")}>Herramientas</button>
          <button className={`nav-link-btn ${vistaActual === "ias" ? "active" : ""}`} onClick={() => setVistaActual("ias")}>IAs</button>
          <button className={`nav-link-btn ${vistaActual === "redes" ? "active" : ""}`} onClick={() => setVistaActual("redes")}>Redes Sociales</button>
          <button className={`nav-link-btn ${vistaActual === "donaciones" ? "active" : ""}`} onClick={() => setVistaActual("donaciones")}>Donaciones</button>
          
          {usuarioLogueado ? (
            <span className="nav-user">Hola, {usuarioLogueado.nombre || "Usuario"}</span>
          ) : (
            <button className="btn-login-nav" onClick={() => setVistaActual("login")}>
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* VISTA HOME */}
      {vistaActual === "home" && (
        <div className="home-content">
          <header className="hero-section">
            <h1>Atrévete a Saber</h1>
            <p>Plataforma centralizada de consultoría, formación virtual y desarrollo profesional.</p>
            <button className="btn-primary" onClick={() => setVistaActual("servicios")}>
              Explorar Servicios
            </button>
          </header>

          <section className="section about-section">
            <h2>Nuestra Misión</h2>
            <div className="card about-card">
              <p>
                Proporcionar servicios de asesorías académicas y consultoría organizacional de alta calidad, 
                orientados al fortalecimiento de las competencias analíticas de estudiantes y equipos de trabajo.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* VISTA SERVICIOS */}
      {vistaActual === "servicios" && (
        <div className="section">
          <h2>Nuestros Servicios y Líneas de Trabajo</h2>
          <p className="section-subtitle">Haz clic en cada línea para ver el desglose completo.</p>
          
          <div className="services-container">
            {listaServicios.map((srv) => (
              <div key={srv.id} className="service-accordion-card">
                <div 
                  className="service-header"
                  onClick={() => setServicioSeleccionado(servicioSeleccionado === srv.id ? null : srv.id)}
                >
                  <h3>{srv.titulo}</h3>
                  <span className="toggle-icon">{servicioSeleccionado === srv.id ? "▲" : "▼"}</span>
                </div>
                <p className="service-summary">{srv.resumen}</p>

                {servicioSeleccionado === srv.id && (
                  <ul className="service-details-list">
                    {srv.detalles.map((detalle, idx) => (
                      <li key={idx}>✓ {detalle}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISTA ARTÍCULOS */}
      {vistaActual === "articulos" && (
        <div className="section">
          <h2>Artículos Académicos</h2>
          <p className="section-subtitle">Publicaciones oficiales del blog de la organización.</p>
          <div className="card-grid">
            <div className="card article-card">
              <h3>Test de Aldrete</h3>
              <p>Valoración de la recuperación postanestésica en salud.</p>
              <a href="https://sapereaudeasesoriasacademicas.blogspot.com/2024/04/test-de-aldrete.html" target="_blank" rel="noopener noreferrer" className="btn-external">Leer Completo ↗</a>
            </div>
            <div className="card article-card">
              <h3>El Principito (Resumen y Análisis)</h3>
              <p>Análisis literario y reflexiones filosóficas.</p>
              <a href="https://sapereaudeasesoriasacademicas.blogspot.com/2024/04/el-principito.html" target="_blank" rel="noopener noreferrer" className="btn-external">Leer Completo ↗</a>
            </div>
          </div>
        </div>
      )}

      {/* VISTA HERRAMIENTAS */}
      {vistaActual === "herramientas" && (
        <div className="section">
          <h2>Herramientas</h2>
          <p className="section-subtitle">A continuación encontrarás herramientas que te facilitarán el desarrollo de tus actividades académicas:</p>
          <div className="services-container">
            {listaHerramientas.map((herr) => (
              <div key={herr.id} className="service-accordion-card">
                <div 
                  className="service-header"
                  onClick={() => setHerramientaSeleccionada(herramientaSeleccionada === herr.id ? null : herr.id)}
                >
                  <h3>{herr.titulo}</h3>
                  <span className="toggle-icon">{herramientaSeleccionada === herr.id ? "▲" : "▼"}</span>
                </div>
                <p className="service-summary">{herr.resumen}</p>
                {herramientaSeleccionada === herr.id && (
                  <div className="accordion-buttons-grid">
                    {herr.items.map((item, idx) => (
                      <a 
                        key={idx} 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-external"
                        style={{ background: "#1e293b", padding: "0.5rem 1rem", borderRadius: "6px", border: "1px solid #334155" }}
                      >
                        {item.nombre} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISTA IAs */}
      {vistaActual === "ias" && (
        <div className="section">
          <h2>IA</h2>
          <p className="section-subtitle">Directorio de recursos de Inteligencia Artificial organizados por categoría.</p>
          <div className="services-container">
            {listaIAs.map((ia) => (
              <div key={ia.id} className="service-accordion-card">
                <div 
                  className="service-header"
                  onClick={() => setIaSeleccionada(iaSeleccionada === ia.id ? null : ia.id)}
                >
                  <h3>{ia.titulo}</h3>
                  <span className="toggle-icon">{iaSeleccionada === ia.id ? "▲" : "▼"}</span>
                </div>
                <p className="service-summary">{ia.resumen}</p>
                {iaSeleccionada === ia.id && (
                  <div className="accordion-buttons-grid">
                    {ia.items.map((item, idx) => (
                      <a 
                        key={idx} 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-external"
                        style={{ background: "#1e293b", padding: "0.5rem 1rem", borderRadius: "6px", border: "1px solid #334155" }}
                      >
                        {item.nombre} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISTA REDES SOCIALES */}
      {vistaActual === "redes" && (
        <div className="section">
          <h2>Redes Sociales</h2>
          <p className="section-subtitle">Conéctate con nosotros a través de nuestras plataformas oficiales.</p>
          <div className="social-grid">
            <a href="https://www.tiktok.com/@sapere.aude.asesorias?_t=ZS-8y6f63JegBb&_r=1" target="_blank" rel="noopener noreferrer" className="social-box">
              <span>TikTok</span>
              <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Síguenos en TikTok</span>
            </a>
            <a href="https://www.instagram.com/sapere.aude.asesorias/" target="_blank" rel="noopener noreferrer" className="social-box">
              <span>Instagram</span>
              <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Visítanos en Instagram</span>
            </a>
            <a href="https://wa.me/573196188448" target="_blank" rel="noopener noreferrer" className="social-box">
              <span>WhatsApp</span>
              <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Escríbenos directamente</span>
            </a>
          </div>
        </div>
      )}

      {/* VISTA DONACIONES */}
      {vistaActual === "donaciones" && (
        <div className="section">
          <h2>Apoya Nuestro Proyecto</h2>
          <p className="section-subtitle">Tu contribución nos ayuda a mantener y expandir nuestros recursos educativos gratuitos.</p>
          <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
            <p>Puedes apoyar nuestro contenido y el desarrollo de herramientas mediante aporte voluntario.</p>
            <a 
              href="https://link.mercadopago.com.co/sapereaude" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
              style={{ display: "inline-block", marginTop: "1rem", textDecoration: "none" }}
            >
              Donar con Mercado Pago ↗
            </a>
          </div>
        </div>
      )}

      {/* VISTA LOGIN */}
      {vistaActual === "login" && (
        <div className="section auth-section">
          <h2>Iniciar Sesión</h2>
          {mensaje && <p className="auth-mensaje">{mensaje}</p>}
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn-primary">Entrar</button>
          </form>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            ¿No tienes cuenta? <button onClick={() => setVistaActual("registro")} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer" }}>Regístrate aquí</button>
          </p>
        </div>
      )}

      {/* VISTA REGISTRO */}
      {vistaActual === "registro" && (
        <div className="section auth-section">
          <h2>Registro de Usuario</h2>
          {mensaje && <p className="auth-mensaje">{mensaje}</p>}
          <form onSubmit={handleRegistro} className="auth-form">
            <div className="form-group">
              <label>Nombre</label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn-primary">Registrarse</button>
          </form>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            ¿Ya tienes cuenta? <button onClick={() => setVistaActual("login")} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer" }}>Inicia sesión</button>
          </p>
        </div>
      )}
    </div>
  );
}