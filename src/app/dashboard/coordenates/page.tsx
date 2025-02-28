'use client';

import { Stack, Typography } from '@mui/material';
import { UserCard } from '@/components/dashboard/user/user-card';
import { paths } from '@/config/paths';
import { coordenatesIcons } from '@/components/dashboard/coordenates/icons/coordenates-icons'; // Importa los iconos

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography variant="h4">Gestión de Coordenadas</Typography>
      </Stack>

      {/* Cards de submenús */}
      <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
        <UserCard
          title="Coordenadas y ubicacion"
          description="Ver y gestionar todos las coordenadas registradas"
          icon={<coordenatesIcons.mapPin size={32} />} // Usa el icono como componente
          href={`${paths.dashboard.coordenates}/coordenates-list`} // Ruta para listar ciudades
        />
      </Stack>
    </Stack>
  );
}