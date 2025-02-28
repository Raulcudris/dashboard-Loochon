'use client';

import { Stack, Typography } from '@mui/material';
import { UserCard } from '@/components/dashboard/user/user-card';
import { paths } from '@/config/paths';
import { userIcons } from '@/components/dashboard/user/icons/user-icons'; // Importa los iconos

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography variant="h4">Gestión de Usuarios</Typography>
      </Stack>

      {/* Cards de submenús */}
      <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
        <UserCard
          title="Listado de Usuarios"
          description="Ver y gestionar todos los usuarios registrados"
          icon={<userIcons.user size={32} />} // Usa el icono como componente
          href={`${paths.dashboard.users}/user-list`} // Ruta para listar usuarios
        />
        <UserCard
          title="Bloqueo/Desbloqueo"
          description="Bloquear o desbloquear usuarios"
          icon={<userIcons.lock size={32} />} // Usa el icono como componente
          href={`${paths.dashboard.users}/block-unblock`}
        />
        <UserCard
          title="Historial de Actividad"
          description="Ver las acciones recientes de los usuarios"
          icon={<userIcons.history size={32} />} // Usa el icono como componente
          href={`${paths.dashboard.users}/activity-history`}
        />
        <UserCard
          title="Verificación de Identidad"
          description="Revisar y aprobar/rechazar solicitudes de verificación"
          icon={<userIcons.identity size={32} />} // Usa el icono como componente
          href={`${paths.dashboard.users}/identity-verification`}
        />
      </Stack>
    </Stack>
  );
}