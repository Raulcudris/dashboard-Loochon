'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { changeCityStatus } from '@/services/coordenatesService';

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
  const handleDelete = async () => {
    if (!coordenateId) {
      alert('ID de coordenada no válido.'); // Manejo de errores
      return;
    }
    try {
      await changeCityStatus(coordenateId); // Llamar al servicio
      alert('Coordenada eliminada exitosamente.');
      onDeleteSuccess(); // Notificar al padre que se eliminó
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al eliminar la coordenada:', error);
      alert('Error al eliminar la coordenada. Por favor, inténtelo de nuevo.');
    }
  };

  return (
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
  );
};
