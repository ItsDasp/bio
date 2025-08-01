export interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  color?: string;
  isActive: boolean;
}
export interface Profile {
  name: string;
  bio: string;
  avatar: string;
  links: Link[];
}
export interface EmbedData {
  title: string;
  description: string;
  image: string;
  color: string;
  url: string;
}
export interface Language {
  code: 'en' | 'es';
  name: string;
  flag: string;
}
export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url?: string;
  duration?: number;
}
export interface Translation {
  home: string;
  embed: string;
  name: string;
  bio: string;
  visitLink: string;
  copyLink: string;
  connectWithMe: string;
  findMeOnPlatforms: string;
  settings: string;
  animatedBackground: string;
  typewriterEffect: string;
  animatedBioText: string;
  close: string;
  github: string;
  portfolio: string;
  twitter: string;
  email: string;
  discord: string;
  instagram: string;
  music: string;
  musicTitle: string;
  nowPlaying: string;
  play: string;
  pause: string;
  songs: string;
  clickToClose: string;
  openFullscreen: string;
  siteTitle: string;
  siteDescription: string;
  embedTitle: string;
  embedDescription: string;
  configuration: string;
  customTitle: string;
  customDescription: string;
  customImage: string;
  customColor: string;
  previewTitle: string;
  generateUrl: string;
  copyUrl: string;
  urlCopied: string;
  defaultEmbedTitle: string;
  defaultEmbedDescription: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  imagePlaceholder: string;
  language: string;
  english: string;
  spanish: string;
  accessibilityTitle: string;
  accessibility: {
    warning: {
      title: string;
      description: string;
      yes: string;
      no: string;
      note: string;
    };
    seizureWarning: {
      title: string;
      message: string;
      disclaimer: string;
      cancel: string;
      confirm: string;
    };
  };
}
