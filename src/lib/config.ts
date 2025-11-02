import { Profile } from '@/types';
export const profileData: Profile = {
  name: 'Dasp',
  bio: `✧ 18 ✧
✧ Node.js developer ✧
✧ 🇨🇱 ✧`,
  avatar: '/avatar.jpg',
  links: [
    {
      id: '0',
      title: 'Senko Bot',
      url: 'https://senko.nekomera.xyz',
      icon: 'https://i.imgur.com/JkubEXf.jpeg',
      color: '#ffb6c1',
      isActive: true,
    },
    {
      id: '1',
      title: 'GitHub',
      url: 'https://github.com/itsdasp',
      icon: 'Github',
      color: '#333333',
      isActive: true,
    },
    {
      id: '2',
      title: 'Portfolio',
      url: 'https://dasp.nekomera.xyz/',
      icon: 'Globe',
      color: '#a855f7',
      isActive: true,
    },
    {
      id: '3',
      title: 'Twitter',
      url: 'https://x.com/xdasp_',
      icon: 'Twitter',
      color: '#1DA1F2',
      isActive: true,
    },
    {
      id: '4',
      title: 'Email',
      url: 'mailto:contact@me@xdasp.me',
      icon: 'Mail',
      color: '#EA4335',
      isActive: true,
    },
    {
      id: '5',
      title: 'Discord',
      url: 'https://discord.com/users/475378131373654026',
      icon: 'Discord',
      color: '#5865F2',
      isActive: true,
    },
    {
      id: '6',
      title: 'Instagram',
      url: 'https://www.instagram.com/xidasp/',
      icon: 'Instagram',
      color: '#E4405F',
      isActive: true,
    },
  ],
};
export const siteMetadata = {
  title: 'Dasp - Bio',
  description: 'Mis enlaces uwu. Pa mis stalkers uwu',
  url: 'https://xdasp.me/',
  image: '/avatar.jpg',
  author: 'Dasp',
  keywords: 'dasp, desarrollador, full stack, ui ux, portfolio, contacto, developer, nodejs',
};
