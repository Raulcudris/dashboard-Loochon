'use client';

import { Stack, Typography } from '@mui/material';
import { UserCard } from '@/components/dashboard/user/user-card';
import { paths } from '@/config/paths';
import { occupationsIcons } from '@/components/dashboard/ocupations/icons/occupations-icons'; // Importa los iconos

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography variant="h4">Gestión de Ocupaciones y servicios</Typography>
      </Stack>

      {/* Cards de submenús */}
      <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
        <UserCard
          title="Ocupaciones y servicios"
          description="Ver y gestionar todas las ocupaciones y servicios registradas"
          icon={<occupationsIcons.BriefcaseIcon size={32} />} // Usa el icono como componente
          href={`${paths.dashboard.occupations}/occupations-list`} // Ruta para listar ciudades
        />
        <UserCard
          title="Categorías ocupacionales"
          description="Ver y gestionar todas las categorías generales de trabajos disponibles"
          icon={<occupationsIcons.CategoryIcon size={32} />} // Usa el icono como componente
          href={`${paths.dashboard.occupations}/category-list`} // Ruta para listar ciudades
        />
      </Stack>      
    </Stack>
  );
}