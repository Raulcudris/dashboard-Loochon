import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning'; // Icono de advertencia
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users'; // Icono de usuarios
import { FileText as FileTextIcon } from '@phosphor-icons/react/dist/ssr/FileText'; // Icono de documentos
import { Megaphone as MegaphoneIcon } from '@phosphor-icons/react/dist/ssr/Megaphone'; // Icono de megáfono
import { MapPin as MapPinIcon } from '@phosphor-icons/react/dist/ssr/MapPin'; // Icono de ubicación
import { Briefcase as BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase'; // Icono de maletín
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix'; // Icono de engranaje
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell'; // Icono de campana

export const navIcons = {
  'warning': WarningIcon, // Icono de advertencia
  'users': UsersIcon, // Icono de usuarios
  'file-text': FileTextIcon, // Icono de documentos
  'megaphone': MegaphoneIcon, // Icono de megáfono
  'map-pin': MapPinIcon, // Icono de ubicación
  'briefcase': BriefcaseIcon, // Icono de maletín
  'gear-six': GearSixIcon, // Icono de engranaje
  'bell': BellIcon, // Icono de campana
} as Record<string, Icon>;