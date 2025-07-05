/* ============================================================
   SUPER CALCULADORA MODULAR WEB
   Archivo : script.js
   Autor   : profe Néstor Fabio Montoya Palacios
   Fecha   : 6 jul 2025
   Funciones:
     ▸ Construir dinámicamente el árbol de categorías / módulos
     ▸ Cargar cada módulo dentro del <iframe>
     ▸ Gestionar tema claro / oscuro (persistente)
     ▸ Controlar menú móvil con overlay
   Edición:
     — 42 módulos en total (incluye categoría nueva: Probabilidad)
===============================================================*/

/* ------------------------------------------------------------
   1.  DEFINICIÓN DE CATEGORÍAS Y MÓDULOS
       (Sólo edita este array para agregar, mover o renombrar)
------------------------------------------------------------ */
const categories = [
  /* ─── Matemáticas Básicas ───────────────────────────────── */
  {
    name: "Matemáticas Básicas", icon: "🧮", children: [
      { name: "Álgebra",                slug: "algebra",             icon: "🧮" },
      { name: "MCD y MCM",              slug: "calculadora_mcd_mcm", icon: "➗" },
      { name: "Conversión de Unidades", slug: "ConversionUnidades",  icon: "📏" },
      { name: "Lógica y Conjuntos",     slug: "logica_conjuntos",    icon: "🧠" },
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

  /* ─── Trigonometría ────────────────────────────────────── */
  {
    name: "Trigonometría", icon: "📏", children: [
      { name: "Conversión de Ángulos", slug: "ConversionAngular", icon: "🔄" },
      { name: "Triángulos",            slug: "triangulos",        icon: "🔺" },
      { name: "Trigonometría",         slug: "trigonometria",     icon: "📐" },
      { name: "Vectores",              slug: "vectores",          icon: "🧭" },
    ]
  },

  /* ─── Cálculo ──────────────────────────────────────────── */
  {
    name: "Cálculo", icon: "♾️", children: [
      { name: "Sucesión de Fibonacci",   slug: "fibonacci",            icon: "🌀" },
      { name: "Cálculo (general)",       slug: "calculo",              icon: "♾️" },
      { name: "Definición de Límites",   slug: "limites",              icon: "♾️" },
      { name: "Integrales Definidas",    slug: "IntegralesDefinidas",  icon: "🔗" },
      { name: "Área entre Curvas",            slug: "AreaEntreCurvas",     icon: "📏" },
      { name: "Optimización",            slug: "optimizacion",         icon: "📊" },
      { name: "Sólidos de Revolución",   slug: "solidosRevolucion",    icon: "🧊" },
      { name: "Newton-Raphson",          slug: "newton_raphson",       icon: "🌀" },
      { name: "Series de Taylor",        slug: "taylor",               icon: "✨" },
      { name: "Series de Fourier",       slug: "fourier",              icon: "〰️" },
      { name: "Volúmenes por Revolución",slug: "volumenes",            icon: "📦" },
      { name: "Runge-Kutta",             slug: "RungeKutta",           icon: "⚙️" },
      { name: "Ecuaciones Diferenciales",slug: "edos",                 icon: "📉" },
    ]
  },

  /* ─── Estadística ──────────────────────────────────────── */
  {
    name: "Estadística", icon: "📊", children: [
      { name: "Estadística",      slug: "estadistica",   icon: "📊" },
      { name: "Combinatoria",     slug: "combinatoria",  icon: "🎲" },
      { name: "Regresión",        slug: "regresion",     icon: "📉" },
      { name: "Aguja de Buffon",  slug: "agujaBuffon",   icon: "📍" },
      { name: "Máquina de Galton",slug: "maquinaGalton", icon: "⚪" },
    ]
  },

  /* ─── Álgebra Lineal ───────────────────────────────────── */
  {
    name: "Álgebra Lineal", icon: "🧩", children: [
      { name: "Matrices",             slug: "matrices",           icon: "🟩" },
      { name: "Sistemas de Ecuaciones",slug:"sistemas",           icon: "🟰" },
      { name: "Programación Lineal",  slug: "programacionLineal", icon: "📊" },
    ]
  },

  /* ─── Probabilidad (nueva) ─────────────────────────────── */
  {
    name: "Probabilidad", icon: "🎰", children: [
      { name: "Probabilidad", slug: "probabilidad", icon: "🎰" },
    ]
  },

  /* ─── Química ──────────────────────────────────────────── */
  {
    name: "Química", icon: "⚗️", children: [
      { name: "Tabla Periódica", slug: "TablaPeriodica", icon: "⚗️" },
      { name: "Balanceo de Ecuaciones", slug: "BalanceoEcuaciones", icon: "⚖️" },
    ]
  },

  /* ─── Banco de Fórmulas ───────────────────────────────── */
  {
    name: "Banco de Fórmulas", icon: "📜", children: [
      { name: "Fórmulas", slug: "formulas", icon: "📜" },
    ]
  },
];

/* ------------------------------------------------------------
   2.  CAPTURA DE ELEMENTOS DEL DOM
------------------------------------------------------------ */
const navList   = document.getElementById("nav-list");
const frame     = document.getElementById("content-frame");
const mainTitle = document.getElementById("main-title");
const sidebar   = document.getElementById("sidebar");
const overlay   = document.getElementById("sidebar-overlay");
const mobileBtn = document.getElementById("mobile-menu-btn");
const themeBtn  = document.getElementById("theme-toggle");
const themeText = document.getElementById("theme-text");

/* ------------------------------------------------------------
   3.  CONSTRUIR EL MENÚ LATERAL (HTML dinámico)
------------------------------------------------------------ */
function buildMenu() {
  /* Enlace fijo «Inicio» */
  const home = document.createElement("a");
  home.href           = "#inicio";
  home.dataset.module = "inicio";
  home.className      = "sidebar-link";
  home.textContent    = "🏠 Inicio";
  navList.appendChild(home);

  /* Categorías y sus módulos */
  categories.forEach(cat => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = `${cat.icon} ${cat.name}`;
    details.appendChild(summary);

    cat.children.forEach(mod => {
      const link = document.createElement("a");
      link.href           = `#${mod.slug}`;
      link.dataset.module = mod.slug;
      link.className      = "sidebar-link";
      link.textContent    = `${mod.icon} ${mod.name}`;
      details.appendChild(link);
    });

    navList.appendChild(details);
  });
}

/* ------------------------------------------------------------
   4.  CARGAR MÓDULO EN EL IFRAME
------------------------------------------------------------ */
function loadModule(slug) {
  /* 4-a  Resalta enlace activo */
  document
    .querySelectorAll(".sidebar-link.active")
    .forEach(el => el.classList.remove("active"));

  const active = document.querySelector(`.sidebar-link[data-module="${slug}"]`);
  if (active) active.classList.add("active");

  /* 4-b  Título (sin emoji) */
  const title = active
      ? active.textContent.replace(/^[^\s]+\s/, "").trim()
      : slug;
  mainTitle.textContent = title;

  /* 4-c  Ruta del iframe */
  frame.src = `modules/${slug}.html`;
}

/* Observa cambios en el hash de la URL */
function handleHashChange() {
  const slug = location.hash.slice(1) || "inicio";
  loadModule(slug);
}

/* Delegación de clics en toda la barra lateral */
navList.addEventListener("click", e => {
  const link = e.target.closest("[data-module]");
  if (!link) return;

  /* Cierra menú en móviles */
  if (sidebar.classList.contains("open")) toggleMobileMenu();
});

/* ------------------------------------------------------------
   5.  TEMA CLARO / OSCURO
------------------------------------------------------------ */
function setTheme(mode) {
  const html = document.documentElement;
  if (mode === "dark") html.classList.add("dark");
  else                 html.classList.remove("dark");

  themeText.textContent = mode === "dark" ? "Modo Claro" : "Modo Oscuro";
  localStorage.setItem("theme", mode);
}

themeBtn.addEventListener("click", () => {
  const next = document.documentElement.classList.contains("dark")
               ? "light" : "dark";
  setTheme(next);
});

/* ------------------------------------------------------------
   6.  MENÚ MÓVIL (hamburguesa + overlay)
------------------------------------------------------------ */
function toggleMobileMenu() {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
}

mobileBtn.addEventListener("click", toggleMobileMenu);
overlay  .addEventListener("click", toggleMobileMenu);

/* ------------------------------------------------------------
   7.  INICIALIZACIÓN
------------------------------------------------------------ */
(function init() {
  buildMenu();                           // genera la barra lateral

  /* Tema guardado o preferencia del sistema */
  const stored = localStorage.getItem("theme");
  const pref   = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  setTheme(stored || pref);

  /* Manejar navegación */
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();                    // primera carga
})();
