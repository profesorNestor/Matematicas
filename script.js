document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const contentFrame = document.getElementById('content-frame');
    const mainHeaderTitle = document.getElementById('main-header-title');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');
    const rootHtml = document.documentElement;

    /**
     * Carga un módulo en el iframe y actualiza el estado de la UI.
     * @param {string} moduleId - El ID del módulo a cargar (ej. 'algebra').
     */
    function loadModule(moduleId) {
        // Actualiza el título del header en móvil
        const linkElement = document.querySelector(`.sidebar-link[data-module="${moduleId}"] span`);
        mainHeaderTitle.textContent = linkElement ? linkElement.textContent : 'Inicio';

        // Actualiza el src del iframe
        contentFrame.src = `modules/${moduleId}.html`;

        // Actualiza el link activo
        sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.module === moduleId);
        });

        // Cierra el menú en móvil
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }

    // Event listeners para los links del menú
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleId = link.dataset.module;
            if (moduleId) {
                // Actualiza la URL hash para mantener el estado
                window.location.hash = moduleId;
            }
        });
    });

    // Manejo del menú en móvil
    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });

    // Manejo del tema (claro/oscuro)
    themeToggle.addEventListener('click', () => {
        rootHtml.classList.toggle('dark');
        const isDark = rootHtml.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeUI(isDark);
        // Notificar al iframe del cambio de tema
        contentFrame.contentWindow.postMessage({theme: isDark ? 'dark' : 'light'}, '*');
    });

    function updateThemeUI(isDark) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            themeText.textContent = isDark ? 'Modo Oscuro' : 'Modo Claro';
            icon.classList.toggle('fa-moon', isDark);
            icon.classList.toggle('fa-sun', !isDark);
        }
    }

    function applyInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        const isDark = savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
        rootHtml.classList.toggle('dark', isDark);
        updateThemeUI(isDark);
    }
    
    // Función de inicialización de la app
    function init() {
        applyInitialTheme();
        
        const initialModule = window.location.hash.substring(1) || 'inicio';
        loadModule(initialModule);

        window.addEventListener('hashchange', () => {
            const moduleId = window.location.hash.substring(1) || 'inicio';
            loadModule(moduleId);
        });
    }

    init();
});
