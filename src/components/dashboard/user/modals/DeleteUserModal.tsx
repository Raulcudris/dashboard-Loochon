'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { changeUserStatus } from '../../../../services/userService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirm = async () => {
    try {
      if (user?.recIdeunikeyReus) {
        await changeUserStatus(user.recIdeunikeyReus); // Llamada al servicio para eliminar usuario
        setSnackbarMessage('Usuario eliminado con éxito.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onConfirm(); // Refrescar la lista de usuarios
      } else {
        setSnackbarMessage('Error: Usuario no válido.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setSnackbarMessage('Hubo un problema al eliminar el usuario. Inténtelo nuevamente.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      onClose(); // Cerrar modal
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="delete-user-modal">
        <Box
          sx={{
            ...modalStyle,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
            ¿Estás seguro de eliminar al usuario?
          </Typography>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {user?.recNombreReus} {user?.recApelidReus}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="error" onClick={handleConfirm}>
              Eliminar
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
