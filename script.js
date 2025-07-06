/* ============================================================
   SUPER CALCULADORA MODULAR WEB
   Archivo : script.js
   Autor   : profe Néstor Fabio Montoya Palacios
   Fecha   : 6 jul 2025  (última actualización: 6 jul 2025)
   -----------------------------------------------------------------
   Funciones principales:
     ▸ Construir dinámicamente el árbol de categorías / módulos.
     ▸ Cargar cada módulo dentro del <iframe> principal.
     ▸ Gestionar tema claro / oscuro (persistente en localStorage).
     ▸ Controlar el menú móvil mediante overlay.

   ¡IMPORTANTE!
   ────────────────────────────────────────────────────────────────
   ◉  Para agregar, mover o renombrar módulos SOLO se debe editar
      el arreglo «categories» de la sección 1.  El resto del código
      (construcción del menú, carga de módulos, etc.) se adapta
      automáticamente.
   ◉  Cada elemento «children» representa un módulo y requiere:
        { name: "Nombre Visible", slug: "NombreDelArchivo", icon: "Emoji" }
      donde «NombreDelArchivo» coincide EXACTAMENTE con el archivo
      .html dentro de la carpeta /modules.
   -----------------------------------------------------------------
*/

/* ============================================================
   1.  DEFINICIÓN DE CATEGORÍAS Y MÓDULOS
============================================================ */
const categories = [
  /* ─────────────────────────── Matemáticas Básicas ────────────────────────── */
  {
    name: "Matemáticas Básicas", icon: "🧮", children: [
      { name: "Álgebra",                slug: "algebra",             icon: "🧮" },
      { name: "MCD y MCM",              slug: "calculadora_mcd_mcm", icon: "➗" },
      { name: "Conversión de Unidades", slug: "ConversionUnidades",  icon: "📏" },
      { name: "Conjuntos",              slug: "conjuntos",           icon: "📂" },
      { name: "Lógica",                 slug: "logica",              icon: "🧠" },
      { name: "Lógica y Conjuntos",     slug: "logica_conjuntos",    icon: "🧩" },
      { name: "Números Romanos",        slug: "NumerosRomanos",      icon: "🏺" },
      { name: "Polígonos",              slug: "poligonos",           icon: "🔷" },
      { name: "Poliedros",              slug: "poliedros",           icon: "🧊" },
      { name: "Progresiones",           slug: "progresiones",        icon: "📈" },
      { name: "Números Complejos",      slug: "complejos",           icon: "⚛️" },
      { name: "Fórmula de Gauss",       slug: "gauss",               icon: "🔢" },
      { name: "Fractales",              slug: "fractales",           icon: "🧩" },
      { name: "Matemática Financiera",  slug: "matematicaFinaciera", icon: "💰" },
      { name: "Gráficas",               slug: "graficas",            icon: "📊" },
      { name: "Triángulo de Pascal",    slug: "trianguloPascal",     icon: "🔺" },
    ]
  },

  /* ────────────────────────────── Trigonometría ───────────────────────────── */
  {
    name: "Trigonometría", icon: "📏", children: [
      { name: "Conversión de Ángulos", slug: "ConversionAngular", icon: "🔄" },
      { name: "Triángulos",            slug: "triangulos",        icon: "🔺" },
      { name: "Trigonometría",         slug: "trigonometria",     icon: "📐" },
      { name: "Vectores",              slug: "vectores",          icon: "🧭" },
    ]
  },

  /* ────────────────────────────────── Cálculo ─────────────────────────────── */
  {
    name: "Cálculo", icon: "♾️", children: [
      { name: "Sucesión de Fibonacci",    slug: "fibonacci",            icon: "🌀" },
      { name: "Cálculo (general)",        slug: "calculo",              icon: "♾️" },
      { name: "Definición de Límites",    slug: "limites",              icon: "♾️" },
      { name: "Integrales Definidas",     slug: "IntegralesDefinidas",  icon: "🔗" },
      { name: "Área entre Curvas",        slug: "AreaEntreCurvas",      icon: "📏" },
      { name: "Optimización",             slug: "optimizacion",         icon: "📊" },
      { name: "Sólidos de Revolución",    slug: "solidosRevolucion",    icon: "🧊" },
      { name: "Newton-Raphson",           slug: "newton_raphson",       icon: "🌀" },
      { name: "Series de Taylor",         slug: "taylor",               icon: "✨" },
      { name: "Series de Fourier",        slug: "fourier",              icon: "〰️" },
      { name: "Volúmenes por Revolución", slug: "volumenes",            icon: "📦" },
      { name: "Runge-Kutta",              slug: "RungeKutta",           icon: "⚙️" },
      { name: "Ecuaciones Diferenciales", slug: "edos",                 icon: "📉" },
    ]
  },

  /* ───────────────────────────────── Estadística ──────────────────────────── */
  {
    name: "Estadística", icon: "📊", children: [
      { name: "Estadística",      slug: "estadistica",   icon: "📊" },
      { name: "Combinatoria",     slug: "combinatoria",  icon: "🎲" },
      { name: "Regresión",        slug: "regresion",     icon: "📉" },
      { name: "Aguja de Buffon",  slug: "agujaBuffon",   icon: "📍" },
      { name: "Máquina de Galton",slug: "maquinaGalton", icon: "⚪" },
    ]
  },

  /* ────────────────────────────── Álgebra Lineal ──────────────────────────── */
  {
    name: "Álgebra Lineal", icon: "🧩", children: [
      { name: "Matrices",              slug: "matrices",           icon: "🟩" },
      { name: "Sistemas de Ecuaciones",slug: "sistemas",           icon: "🟰" },
      { name: "Programación Lineal",   slug: "programacionLineal", icon: "📊" },
    ]
  },

  /* ───────────────────────────────── Probabilidad ─────────────────────────── */
  {
    name: "Probabilidad", icon: "🎰", children: [
      { name: "Probabilidad", slug: "probabilidad", icon: "🎰" },
    ]
  },

  /* ─────────────────────────────────── Física ─────────────────────────────── */
  {
    name: "Física", icon: "🔭", children: [
      { name: "Movimiento Parabólico",              slug: "MovimientoParabolico",                  icon: "🎯" },
      { name: "Proyectil con Resistencia",          slug: "simulacionParabolicoResistencia",       icon: "💨" },
      { name: "Movimiento Circular Uniforme",       slug: "simulador_movimiento_circular_uniforme", icon: "🔄" },
      { name: "Movimiento Armónico Simple",         slug: "graficasMAS",                           icon: "🌊" },
      { name: "Ley de Snell",                       slug: "LeyesSnell",                            icon: "📐" },
      { name: "Difracción Rendija Simple",          slug: "DifraccionRendijaSimple",               icon: "💠" },
      { name: "Difracción Rendija Doble",           slug: "Difraccion_rendija_doble",              icon: "💠" },
      { name: "Difracción en Rejilla",              slug: "DifraccionRendijaRejilla",              icon: "💠" },
      { name: "Difracción Rendija Rectangular",     slug: "DifraccionRendijaRectangular",          icon: "💠" },
      { name: "Difracción Rendija Circular",        slug: "DifraccionRendijaCircular",             icon: "💠" },
    ]
  },

  /* ─────────────────────────────────── Química ────────────────────────────── */
  {
    name: "Química", icon: "⚗️", children: [
      { name: "Tabla Periódica",        slug: "TablaPeriodica",     icon: "⚗️" },
      { name: "Balanceo de Ecuaciones", slug: "BalanceoEcuaciones", icon: "⚖️" },
    ]
  },

  /* ──────────────────────────── Banco de Fórmulas ─────────────────────────── */
  {
    name: "Banco de Fórmulas", icon: "📜", children: [
      { name: "Fórmulas", slug: "formulas", icon: "📜" },
    ]
  },
];

/* ============================================================
   2.  CAPTURA DE ELEMENTOS DEL DOM
============================================================ */
const navList   = document.getElementById("nav-list");
const frame     = document.getElementById("content-frame");
const mainTitle = document.getElementById("main-title");
const sidebar   = document.getElementById("sidebar");
const overlay   = document.getElementById("sidebar-overlay");
const mobileBtn = document.getElementById("mobile-menu-btn");
const themeBtn  = document.getElementById("theme-toggle");
const themeText = document.getElementById("theme-text");

/* ============================================================
   3
