'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { changeCityStatus } from '@/services';

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

interface DeleteCoordenatesModalProps {
  open: boolean; // Si el modal está abierto
  onClose: () => void; // Función para cerrar el modal
  coordenateId: string | null; // ID de la coordenada (asegúrate de pasar un string válido)
  coordenateName?: string | null; // Nombre opcional de la coordenada
  onDeleteSuccess: () => void; // Callback para notificar que se eliminó con éxito
}

export const DeleteCoordenatesModal: React.FC<DeleteCoordenatesModalProps> = ({
  open,
  onClose,
  coordenateId,
  coordenateName,
  onDeleteSuccess,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleDelete = async () => {
    if (!coordenateId) {
      setSnackbarMessage('ID de coordenada no válido.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await changeCityStatus(coordenateId); // Llamar al servicio
      setSnackbarMessage('Coordenada eliminada exitosamente.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onDeleteSuccess(); // Notificar al padre que se eliminó
        // Cerrar el modal después de mostrar el Snackbar
      setTimeout(onClose, 1000); // Espera 500 ms para que se muestre la alerta
    } catch (error) {
      console.error('Error al eliminar la coordenada:', error);
      setSnackbarMessage('Error al eliminar la coordenada. Por favor, inténtelo de nuevo.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="delete-coordenate-modal">
        <Box
          sx={{
            ...modalStyle,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
            ¿Estás seguro de eliminar la coordenada?
          </Typography>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {coordenateName || 'Nombre no disponible'}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="error" onClick={handleDelete}>
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
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
