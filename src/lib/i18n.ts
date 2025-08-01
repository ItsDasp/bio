import { Translation } from '@/types';

export const translations: Record<'en' | 'es', Translation> = {
  en: {
    home: 'Home',
    embed: 'Embed Generator',
    
    name: 'Dasp',
    bio: `✧ 18 ✧
✧ Node.js developer ✧
✧ 🇨🇱 ✧`,

    visitLink: 'Visit Link',
    copyLink: 'Copy Link',
    connectWithMe: 'Connect with me',
    findMeOnPlatforms: 'Find me on these platforms',
    
    settings: 'Settings',
    animatedBackground: 'Animated Background',
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
    previous: 'Previous',
    next: 'Next',
    minimize: 'Minimize',
    maximize: 'Maximize',
    clickToClose: 'Click anywhere to close',
    openFullscreen: 'Open fullscreen view',
    
    siteTitle: 'Dasp - Bio',
    siteDescription: 'My links uwu',
    
    embedTitle: 'Embed Generator',
    embedDescription: 'Create custom embeds for Discord.',
    configuration: 'Configuration',
    customTitle: 'Custom Title',
    customDescription: 'Custom Description',
    customImage: 'Image URL',
    customColor: 'Accent Color',
    previewTitle: 'Preview',
    generateUrl: 'Generate URL',
    copyUrl: 'Copy URL',
    urlCopied: 'URL copied to clipboard!',
    titlePlaceholder: 'Custom title',
    descriptionPlaceholder: 'Custom description',
    imagePlaceholder: 'https://example.com/image.jpg',
    defaultEmbedTitle: 'My Custom Link',
    defaultEmbedDescription: 'Custom description for social media',
    
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
    embed: 'Generador de Embed',
    
    name: 'Dasp',
    bio: `✧ 18 ✧
✧ Node.js developer ✧
✧ 🇨🇱 ✧`,

    visitLink: 'Visitar Enlace',
    copyLink: 'Copiar Enlace',
    connectWithMe: 'Conecta conmigo',
    findMeOnPlatforms: 'Encuéntrame en estas plataformas',
    
    settings: 'Configuración',
    animatedBackground: 'Fondo Animado',
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
    previous: 'Anterior',
    next: 'Siguiente',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
    clickToClose: 'Haz clic en cualquier lugar para cerrar',
    openFullscreen: 'Abrir vista de pantalla completa',
    
    siteTitle: 'Dasp - Bio',
    siteDescription: 'Mis enlaces uwu',
    
    embedTitle: 'Generador de Embed',
    embedDescription: 'Crea URLs con previews personalizados para Discord.',
    configuration: 'Configuración',
    customTitle: 'Título Personalizado',
    customDescription: 'Descripción Personalizada',
    customImage: 'URL de Imagen',
    customColor: 'Color de Acento',
    previewTitle: 'Vista Previa',
    generateUrl: 'Generar URL',
    copyUrl: 'Copiar URL',
    urlCopied: '¡URL copiada al portapapeles!',
    titlePlaceholder: 'Título personalizado',
    descriptionPlaceholder: 'Descripción personalizada',
    imagePlaceholder: 'https://ejemplo.com/imagen.jpg',
    defaultEmbedTitle: 'Mi Enlace Personalizado',
    defaultEmbedDescription: 'Descripción personalizada para redes sociales',
    
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
