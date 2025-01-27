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
  CircularProgress,
} from '@mui/material';
import { changeOccupationStatus } from '@/services';
import { Occupations } from '@/interface';

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

interface DeleteOccupationsModalProps {
  open: boolean;
  onClose: () => void;
  occupation: Occupations | null;
  onDeleteSuccess: () => void;
}

export const DeleteOccupationsModal: React.FC<DeleteOccupationsModalProps> = ({
  open,
  onClose,
  occupation,
  onDeleteSuccess,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!occupation) {
      setSnackbarMessage('No se ha seleccionado ninguna ocupación para eliminar.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setIsDeleting(true);

    try {
      await changeOccupationStatus(occupation.recPrimarykeyRcws); // Llama al servicio
      setSnackbarMessage('Ocupación eliminada exitosamente.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Llamar al callback para refrescar los datos
      onDeleteSuccess();

      // Cerrar el modal después de una pequeña espera para mostrar el Snackbar
      setTimeout(onClose, 500);
    } catch (error) {
      console.error('Error al eliminar la ocupación:', error);
      setSnackbarMessage('Error al eliminar la ocupación. Por favor, inténtelo de nuevo.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="delete-occupations-modal">
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
            ¿Estás seguro de eliminar esta ocupación?
          </Typography>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {occupation?.recDescrworkRcws || 'Nombre no disponible'}
          </Typography>
          <Stack direction="row" 
                 spacing={2} 
                 sx={{ mt: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={isDeleting}
              startIcon={isDeleting && <CircularProgress size={20} color="inherit" />}
            >
              Eliminar
            </Button>
            <Button variant="outlined" onClick={onClose} disabled={isDeleting}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
