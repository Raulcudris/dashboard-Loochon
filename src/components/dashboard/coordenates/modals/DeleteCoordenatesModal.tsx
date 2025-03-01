'use client';

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { BaseModal } from './BaseModal'; // Asegúrate de que la ruta de importación sea correcta
import { useCoordenates } from '@/hooks/use-coordenates'; // Importa el hook

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
  // Usa el hook useCoordenates
  const { deleteCoordenate, loading, error } = useCoordenates();

  const handleDelete = async (showSnackbar: (message: string, severity: 'success' | 'error') => void) => {
    if (!coordenateId) {
      showSnackbar('ID de coordenada no válido.', 'error');
      return;
    }

    try {
      const success = await deleteCoordenate(coordenateId); // Llamar al servicio
      if (success) {
        showSnackbar('Coordenada eliminada exitosamente.', 'success');
        onDeleteSuccess(); // Notificar al padre que se eliminó
        setTimeout(onClose, 1000); // Espera 1 segundo para cerrar el modal
      }
    } catch (error) {
      console.error('Error al eliminar la coordenada:', error);
      showSnackbar('Error al eliminar la coordenada. Por favor, inténtelo de nuevo.', 'error');
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="¿Estás seguro de eliminar la coordenada?">
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {coordenateName || 'Nombre no disponible'}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="error" onClick={() => handleDelete(showSnackbar)} disabled={loading}>
              {loading ? 'Eliminando...' : 'Eliminar'}
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