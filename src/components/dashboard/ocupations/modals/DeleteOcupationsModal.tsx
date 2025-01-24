'use client';

import React from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { changeOccupationStatus, deleteOccupation } from '@/services'; // Asegúrate de tener este servicio definido
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
  occupation: Occupations; // Ocupación seleccionada para eliminar
  onDeleteSuccess: () => void; // Callback para actualizar la lista tras eliminar
}

export const DeleteOccupationsModal: React.FC<DeleteOccupationsModalProps> = ({
  open,
  onClose,
  occupation,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    if (!occupation) {
      alert('No se ha seleccionado ninguna ocupación para eliminar.');
      return;
    }

    try {
      console.log('Eliminando ocupación con ID:', occupation.recPrimarykeyRcws);
      await changeOccupationStatus(occupation.recPrimarykeyRcws); // Llama al servicio para eliminar
      alert('Ocupación eliminada exitosamente.');
      onDeleteSuccess(); // Notificar éxito al padre para refrescar datos
      onClose(); // Cerrar modal
    } catch (error) {
      console.error('Error al eliminar la ocupación:', error);
      alert('Error al eliminar la ocupación. Por favor, inténtelo de nuevo.');
    }
  };

  return (
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
  );
};
