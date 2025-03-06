import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { changeUserStatus } from '../../../../services/userService';
import { BaseModal } from './BaseModal'; // Importar BaseModal
import { User } from '@/interface'; // Importa el tipo User desde tu archivo de interfaces

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onConfirm: () => void; // Callback para refrescar la lista de usuarios
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  open,
  onClose,
  user,
  onConfirm,
}) => {

  const handleConfirm = async (
    showSnackbar: (message: string, severity: 'success' | 'error') => void
  ) => {
    try {
      if (!user || !user.recIdeunikeyReus) {
        showSnackbar('Error: Usuario no válido o no seleccionado.', 'error');
        return;
      }

      await changeUserStatus(user.recIdeunikeyReus.toString()); // Convertir a string
      showSnackbar('Usuario inactivado con éxito.', 'success');
      onConfirm();
    } catch (error) {
      console.error('Error al inactivar el usuario:', error);
      showSnackbar('Hubo un problema al inactivar el usuario. Inténtelo nuevamente.', 'error');
    } finally {
      onClose();
    }
  };


  return (
    <BaseModal open={open} onClose={onClose} title="¿Estás seguro de inactivar al usuario?">
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {user ? `${user.recNombreReus} ${user.recApelidReus}` : 'Usuario no seleccionado'}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleConfirm(showSnackbar)}
              disabled={!user?.recIdeunikeyReus} // Evita errores si user no tiene ID
            >
              Inactivar
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
