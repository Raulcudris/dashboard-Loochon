// components/dashboard/user/icons/user-icons.tsx
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Lock as LockIcon } from '@phosphor-icons/react/dist/ssr/Lock';
import { ClockCounterClockwise as HistoryIcon } from '@phosphor-icons/react/dist/ssr/ClockCounterClockwise'; // Icono de historial
import { IdentificationCard as IdentityIcon } from '@phosphor-icons/react/dist/ssr/IdentificationCard';

export const userIcons = {
  user: UserIcon, // Icono de usuario
  lock: LockIcon, // Icono de bloqueo/desbloqueo
  history: HistoryIcon, // Icono de historial de actividad
  identity: IdentityIcon, // Icono de verificación de identidad
} as Record<string, Icon>;