import { 
  FaGithub, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaFacebook, 
  FaYoutube,
  FaTiktok,
  FaDiscord,
  FaSpotify,
  FaTwitch,
  FaEnvelope,
  FaGlobe,
  FaPhone,
  FaWhatsapp,
  FaTelegram
} from 'react-icons/fa';
interface SocialIconProps {
  icon: string;
  className?: string;
}
export default function SocialIcon({ icon, className = 'w-5 h-5' }: SocialIconProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'Github': FaGithub,
    'Twitter': FaTwitter,
    'Instagram': FaInstagram,
    'LinkedIn': FaLinkedin,
    'Facebook': FaFacebook,
    'YouTube': FaYoutube,
    'TikTok': FaTiktok,
    'Discord': FaDiscord,
    'Spotify': FaSpotify,
    'Twitch': FaTwitch,
    'Mail': FaEnvelope,
    'Globe': FaGlobe,
    'Phone': FaPhone,
    'WhatsApp': FaWhatsapp,
    'Telegram': FaTelegram,
  };
  const IconComponent = iconMap[icon];
  if (!IconComponent) {
    return <FaGlobe className={className} />;
  }
  return <IconComponent className={className} />;
}
