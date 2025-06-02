'use client';

import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { BaseModal } from './BaseModal';
import { useCoordenates } from '@/hooks/use-coordenates';

interface DeleteCoordenatesModalProps {
  open: boolean;
  onClose: () => void;
  coordenateId: string | null;
  coordenateName?: string | null;
  onDeleteSuccess: () => void;
}

export const DeleteCoordenatesModal: React.FC<DeleteCoordenatesModalProps> = ({
  open,
  onClose,
  coordenateId,
  coordenateName,
  onDeleteSuccess,
}) => {
  const { loading, permanentlyDeleteCoordenate } = useCoordenates();

  const handleDelete = async (showSnackbar: (message: string, type: 'success' | 'error') => void) => {
    if (!coordenateId) {
      showSnackbar('ID de coordenada no válido.', 'error');
      return;
    }

    try {
      await permanentlyDeleteCoordenate(coordenateId);
      showSnackbar('Coordenada eliminada permanentemente.', 'success');
      onDeleteSuccess();
      setTimeout(onClose, 800);
    } catch (error) {
      console.error('Error al eliminar:', error);
      showSnackbar('No se pudo eliminar la coordenada.', 'error');
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="¿Eliminar coordenada permanentemente?"
    >
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            Esta acción no se puede deshacer.
          </Typography>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {coordenateName || 'Nombre no disponible'}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="error"
              disabled={loading}
              onClick={() => handleDelete(showSnackbar)}
            >
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
