/**
 * Icon utility functions to help migrate from FontAwesome/Bootstrap Icons to React Icons
 */

import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io';
import * as IoIcons5 from 'react-icons/io5';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

/**
 * Map of FontAwesome CSS class names to React Icons components
 * This helps during migration to quickly find the corresponding React Icon
 */
export const faIconMapping = {
  // User icons
  'fa-user': FaIcons.FaUser,
  'fa-users': FaIcons.FaUsers,
  'fa-user-circle': FaIcons.FaUserCircle,
  'fa-user-tag': FaIcons.FaUserTag,
  
  // Interface icons
  'fa-bars': FaIcons.FaBars,
  'fa-times': FaIcons.FaTimes,
  'fa-search': FaIcons.FaSearch,
  'fa-cog': FaIcons.FaCog,
  'fa-spinner': FaIcons.FaSpinner,
  'fa-trash': FaIcons.FaTrash,
  'fa-edit': FaIcons.FaEdit,
  'fa-ellipsis-v': FaIcons.FaEllipsisV,
  'fa-envelope': FaIcons.FaEnvelope,
  
  // Navigation icons
  'fa-arrow-right': FaIcons.FaArrowRight,
  'fa-arrow-left': FaIcons.FaArrowLeft,
  'fa-chevron-right': FaIcons.FaChevronRight,
  'fa-chevron-left': FaIcons.FaChevronLeft,
  'fa-chevron-down': FaIcons.FaChevronDown,
  'fa-chevron-up': FaIcons.FaChevronUp,
  
  // Real estate specific
  'fa-home': FaIcons.FaHome,
  'fa-building': FaIcons.FaBuilding,
  'fa-key': FaIcons.FaKey,
  'fa-tag': FaIcons.FaTag,
  'fa-tags': FaIcons.FaTags,
  'fa-map-marker': FaIcons.FaMapMarker,
  'fa-map-marked': FaIcons.FaMapMarkedAlt,
  'fa-chart-line': FaIcons.FaChartLine,
  
  // Form elements
  'fa-eye': FaIcons.FaEye,
  'fa-eye-slash': FaIcons.FaEyeSlash,
  'fa-lock': FaIcons.FaLock,
  'fa-unlock': FaIcons.FaUnlock,
  'fa-check-circle': FaIcons.FaCheckCircle,
  'fa-clipboard': FaIcons.FaClipboard,
  'fa-cloud-upload-alt': FaIcons.FaCloudUploadAlt,
  
  // Social media
  'fa-facebook-f': FaIcons.FaFacebookF,
  'fa-google': FaIcons.FaGoogle,
  'fa-twitter': FaIcons.FaTwitter,
  'fa-instagram': FaIcons.FaInstagram,
  'fa-linkedin': FaIcons.FaLinkedin,
  'fa-youtube': FaIcons.FaYoutube,
  'fa-apple': FaIcons.FaApple,
  
  // Misc
  'fa-star': FaIcons.FaStar,
  'fa-heart': FaIcons.FaHeart,
  'fa-question-circle': FaIcons.FaQuestionCircle,
  'fa-info-circle': FaIcons.FaInfoCircle,
  'fa-comments': FaIcons.FaComments,
  'fa-phone': FaIcons.FaPhone,
  'fa-calendar': FaIcons.FaCalendar,
  'fa-clock': FaIcons.FaClock,
  'fa-dollar-sign': FaIcons.FaDollarSign,
  'fa-sync-alt': FaIcons.FaSyncAlt,
  'fa-paper-plane': FaIcons.FaPaperPlane,
};

/**
 * Map of Bootstrap Icons CSS class names to React Icons components
 */
export const bsIconMapping = {
  'bi-person': BsIcons.BsPerson,
  'bi-people': BsIcons.BsPeople,
  'bi-house': BsIcons.BsHouse,
  'bi-building': BsIcons.BsBuilding,
  'bi-envelope': BsIcons.BsEnvelope,
  'bi-search': BsIcons.BsSearch,
  'bi-gear': BsIcons.BsGear,
  'bi-trash': BsIcons.BsTrash,
  'bi-pencil': BsIcons.BsPencil,
  'bi-eye': BsIcons.BsEye,
  'bi-eye-slash': BsIcons.BsEyeSlash,
  'bi-lock': BsIcons.BsLock,
  'bi-unlock': BsIcons.BsUnlock,
  'bi-check-circle': BsIcons.BsCheckCircle,
  'bi-question-circle': BsIcons.BsQuestionCircle,
  'bi-info-circle': BsIcons.BsInfoCircle,
  'bi-chat': BsIcons.BsChat,
  'bi-telephone': BsIcons.BsTelephone,
  'bi-calendar': BsIcons.BsCalendar,
  'bi-clock': BsIcons.BsClock,
  'bi-cash': BsIcons.BsCash,
};

/**
 * Finds the appropriate React Icon based on the FontAwesome class string
 * @param {string} classNames - FontAwesome class names (e.g., "fas fa-user")
 * @param {Object} props - Additional props to pass to the icon component
 * @returns {React.Element|null} - The React Icon component or null if not found
 */
export const getFontAwesomeToReactIcon = (classNames, props = {}) => {
  // Extract the fa-xxx part
  const match = classNames.match(/fa-([a-z-]+)/);
  if (!match) return null;
  
  const iconName = match[0]; // e.g., "fa-user"
  const IconComponent = faIconMapping[iconName];
  
  return IconComponent ? <IconComponent {...props} /> : null;
};

/**
 * Finds the appropriate React Icon based on the Bootstrap Icons class string
 * @param {string} classNames - Bootstrap Icons class names (e.g., "bi bi-person")
 * @param {Object} props - Additional props to pass to the icon component
 * @returns {React.Element|null} - The React Icon component or null if not found
 */
export const getBootstrapToReactIcon = (classNames, props = {}) => {
  // Extract the bi-xxx part
  const match = classNames.match(/bi-([a-z-]+)/);
  if (!match) return null;
  
  const iconName = match[0]; // e.g., "bi-person"
  const IconComponent = bsIconMapping[iconName];
  
  return IconComponent ? <IconComponent {...props} /> : null;
};

/**
 * A component that renders the appropriate React Icon based on the provided class
 * This is useful for transitioning from class-based icons to React Icons
 * 
 * @param {Object} props
 * @param {string} props.className - The FontAwesome or Bootstrap Icon class
 * @returns {React.Element|null}
 */
export const IconFromClassName = ({ className, ...props }) => {
  if (!className) return null;
  
  if (className.includes('fa-')) {
    return getFontAwesomeToReactIcon(className, props);
  }
  
  if (className.includes('bi-')) {
    return getBootstrapToReactIcon(className, props);
  }
  
  return null;
};

export default {
  getFontAwesomeToReactIcon,
  getBootstrapToReactIcon,
  IconFromClassName
};
