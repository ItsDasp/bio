import { Translation } from '@/types';

export const translations: Record<'en' | 'es', Translation> = {
  en: {
    home: 'Home',
  blog: 'Blog',
    
    name: 'Dasp',
    bio: `✧ 19 ✧
✧ Node.js developer ✧
✧ 🇨🇱 ✧`,

    visitLink: 'Visit Link',
  discordBotPromo: 'Looking for a Discord bot? Try Senko',
    copyLink: 'Copy Link',
    connectWithMe: 'Connect with me',
    findMeOnPlatforms: 'Find me on these platforms',
  projects: 'Projects',
  visitWebsite: 'Visit website',
  features: 'Features',
  moderation: 'Moderation',
  utilities: 'Utilities',
    
    settings: 'Settings',
    animatedBackground: 'Animated Background',
    disableForSeizureSensitivity: 'Disable for seizure sensitivity',
    typewriterEffect: 'Typewriter Effect',
    animatedBioText: 'Animated bio text',
    close: 'Close',
    
    github: 'GitHub',
    portfolio: 'Portfolio',
    twitter: 'Twitter',
    email: 'Email',
    discord: 'Discord',
    instagram: 'Instagram',
    
    music: 'Music',
    musicTitle: 'Music I Like',
    nowPlaying: 'Now Playing',
    play: 'Play',
    pause: 'Pause',
    songs: 'songs',
    clickToClose: 'Click anywhere to close',
    openFullscreen: 'Open fullscreen view',

    previous: 'Previous',
    next: 'Next',
    minimize: 'Minimize',
    maximize: 'Maximize',
    
    siteTitle: 'Dasp - Bio',
    siteDescription: 'My links uwu',
    
    language: 'Language',
    english: 'English',
    spanish: 'Español',
    
    accessibilityTitle: 'Accessibility',
    accessibility: {
      warning: {
        title: 'Accessibility Notice',
        description: 'This website contains animated backgrounds that may trigger seizures in people with photosensitive epilepsy. Do you have a history of seizures or photosensitive epilepsy?',
        yes: 'Yes, disable animations',
        no: 'No, keep animations',
        note: 'You can change this setting later in the settings menu.'
      },
      seizureWarning: {
        title: 'Seizure Risk Warning',
        message: 'Are you sure you want to reactivate animated backgrounds? You previously indicated you have seizure sensitivity.',
        disclaimer: 'Any damage or health issues will be under your responsibility.',
        cancel: 'No, keep disabled',
        confirm: 'Yes, I understand the risks'
      }
    }
  },

  es: {
    home: 'Inicio',
  blog: 'Blog',
    
    name: 'Dasp',
    bio: `✧ 19 ✧
✧ Node.js developer ✧
✧ 🇨🇱 ✧`,

    visitLink: 'Visitar Enlace',
  discordBotPromo: '¿Buscas un bot de Discord? prueba Senko',
    copyLink: 'Copiar Enlace',
    connectWithMe: 'Conecta conmigo',
    findMeOnPlatforms: 'Encuéntrame en estas plataformas',
  projects: 'Proyectos',
  visitWebsite: 'Visitar sitio',
  features: 'Características',
  moderation: 'Moderación',
  utilities: 'Utilidades',
    settings: 'Configuración',
    animatedBackground: 'Fondo Animado',
    disableForSeizureSensitivity: 'Desactivar por sensibilidad a convulsiones',
    typewriterEffect: 'Efecto Typewriter',
    animatedBioText: 'Texto bio animado',
    close: 'Cerrar',
    
    github: 'GitHub',
    portfolio: 'Portafolio',
    twitter: 'Twitter',
    email: 'Correo',
    discord: 'Discord',
    instagram: 'Instagram',
    
    music: 'Música',
    musicTitle: 'Música que me gusta',
    nowPlaying: 'Reproduciendo',
    play: 'Reproducir',
    pause: 'Pausar',
    songs: 'canciones',
    clickToClose: 'Haz clic en cualquier lugar para cerrar',
    openFullscreen: 'Abrir vista de pantalla completa',

    previous: 'Anterior',
    next: 'Siguiente',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
    
    siteTitle: 'Dasp - Bio',
    siteDescription: 'Mis enlaces uwu',
    
    language: 'Idioma',
    english: 'Inglés',
    spanish: 'Español',
    
    accessibilityTitle: 'Accesibilidad',
    accessibility: {
      warning: {
        title: 'Aviso de Accesibilidad',
        description: 'Esta web contiene fondos animados que pueden provocar convulsiones en personas con epilepsia fotosensible. ¿Tienes antecedentes de convulsiones o epilepsia fotosensible?',
        yes: 'Sí, desactivar animaciones',
        no: 'No, mantener animaciones',
        note: 'Puedes cambiar esta configuración más tarde en el menú de ajustes.'
      },
      seizureWarning: {
        title: 'Advertencia de Riesgo de Convulsiones',
        message: '¿Estás seguro que quieres reactivar los fondos animados? Anteriormente indicaste que tienes sensibilidad a las convulsiones.',
        disclaimer: 'Cualquier daño será bajo tu responsabilidad.',
        cancel: 'No, mantener desactivado',
        confirm: 'Sí, entiendo los riesgos'
      }
    }
  }
};


export const languages = [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'es' as const, name: 'Español', flag: '🇪🇸' }
];
