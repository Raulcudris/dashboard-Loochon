// components/dashboard/user/icons/user-icons.tsx
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Briefcase as BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase'; // Icono de maletín
import { Folders as CategoryIcon } from '@phosphor-icons/react/dist/ssr/Folders';

export const occupationsIcons = {
    BriefcaseIcon : BriefcaseIcon, // Icono de Ocupaciones
    CategoryIcon: CategoryIcon      // Categorías principales    
} as Record<string, Icon>;