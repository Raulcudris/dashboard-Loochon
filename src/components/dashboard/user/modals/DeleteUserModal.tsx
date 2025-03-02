import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { changeUserStatus } from '../../../../services/userService';
import { BaseModal } from './BaseModal'; // Importar BaseModal

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
  onConfirm: () => void; // Callback para refrescar la lista de usuarios
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  open,
  onClose,
  user,
  onConfirm,
}) => {
  const handleConfirm = async (showSnackbar: (message: string, severity: 'success' | 'error') => void) => {
    try {
      if (user?.recIdeunikeyReus) {
        await changeUserStatus(user.recIdeunikeyReus); // Llamada al servicio para eliminar usuario
        showSnackbar('Usuario eliminado con éxito.', 'success');
        onConfirm(); // Refrescar la lista de usuarios
      } else {
        showSnackbar('Error: Usuario no válido.', 'error');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      showSnackbar('Hubo un problema al eliminar el usuario. Inténtelo nuevamente.', 'error');
    } finally {
      onClose(); // Cerrar modal
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="¿Estás seguro de eliminar al usuario?">
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {user?.recNombreReus} {user?.recApelidReus}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="error" onClick={() => handleConfirm(showSnackbar)}>
              Eliminar
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </>
      )}
    </BaseModal>
  );
};