import React from 'react';
import styles from './DownloadCard.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa6';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';

type DownloadCardProps = {
  title: string;
  description?: string;
  href: string;
  icon?: string;
};

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  // File & Document icons
  'download': FiIcons.FiDownload,
  'document': FiIcons.FiFile,
  'pdf': FiIcons.FiFile,
  'csv': FiIcons.FiFile,
  'folder': FiIcons.FiFolder,
  'manual': FiIcons.FiBook,
  
  // Technology & Device icons
  'code': FiIcons.FiCode,
  'terminal': FiIcons.FiTerminal,
  'smartphone': FiIcons.FiSmartphone,
  'laptop': FiIcons.FiMonitor,
  'cpu': FiIcons.FiCpu,
  'python': FaIcons.FaPython,
  'android': FaIcons.FaAndroid,
  'ios': FaIcons.FaApple,
  
  // UI elements
  'settings': FiIcons.FiSettings,
  'menu': FiIcons.FiMenu,
  'search': FiIcons.FiSearch,
  'info': FiIcons.FiInfo,
  'help': FiIcons.FiHelpCircle,
  'cards': FiIcons.FiLayout,
  
  // Science & Learning
  'microscope': FaIcons.FaMicroscope,
  'book': FiIcons.FiBook,
  'graduation': FaIcons.FaGraduationCap,
  'brain': FaIcons.FaBrain,
  'lightbulb': FiIcons.FiZap,
  'sensor': FaIcons.FaWaveSquare,
  
  // Robot & Hardware
  'robot': FaIcons.FaRobot,
  'gear': FiIcons.FiTool,
  'wrench': FiIcons.FiTool,
  'tools': FiIcons.FiTool,
  'circuit': BiIcons.BiCircle,
  'drone': FaIcons.FaHotel, // aproximado
  'motor': FaIcons.FaGear,
  'firmware': FaIcons.FaGamepad,
  
  // Media & Creative
  'image': FiIcons.FiImage,
  'video': FiIcons.FiVideo,
  'camera': FiIcons.FiCamera,
  'palette': FiIcons.FiAward,
  'pencil': FiIcons.FiEdit2,
  'brush': FaIcons.FaPaintbrush,
  
  // Navigation & Layout
  'home': FiIcons.FiHome,
  'arrow': FiIcons.FiArrowRight,
  'link': FiIcons.FiExternalLink,
  'grid': FiIcons.FiGrid,
  'list': FiIcons.FiList,
  'map': FiIcons.FiMap,
  'rocket': FaIcons.FaRocket,
  
  // Status & Feedback
  'check': FiIcons.FiCheck,
  'success': FiIcons.FiCheckCircle,
  'warning': FiIcons.FiAlertCircle,
  'error': FiIcons.FiXCircle,
  'questionmark': FiIcons.FiHelpCircle,
  
  // Communication
  'message': FiIcons.FiMessageCircle,
  'mail': FiIcons.FiMail,
  'bell': FiIcons.FiBell,
  'share': FiIcons.FiShare2,
  
  // User & Social
  'user': FiIcons.FiUser,
  'users': FiIcons.FiUsers,
  'github': FaIcons.FaGithub,
  'linkedin': FaIcons.FaLinkedin,
  'twitter': FaIcons.FaTwitter,
};

export default function DownloadCard({ title, description, href, icon }: DownloadCardProps) {
  let IconComponent = iconMap['download'];
  
  if (icon && icon in iconMap) {
    IconComponent = iconMap[icon];
  }
  
  return (
    <a href={useBaseUrl(href)} download className={styles.card}>
      <span className={styles.icon}>
        <IconComponent size={24} />
      </span>
      <div>
        <strong className={styles.title}>{title}</strong>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      <span className={styles.arrow}>
        <FiIcons.FiDownload size={16} />
      </span>
    </a>
  );
}
