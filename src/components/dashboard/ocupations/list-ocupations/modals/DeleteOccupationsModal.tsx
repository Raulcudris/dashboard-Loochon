'use client';

import React, { useState } from 'react';
import { Button, Stack, Typography, CircularProgress } from '@mui/material';
import { deleteOccupation } from '@/services';
import { Occupations } from '@/interface';
import { BaseModal } from './BaseModal';

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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (
    showSnackbar: (message: string, severity: 'success' | 'error') => void
  ) => {
    if (!occupation?.recPrimarykeyRcws) {
      showSnackbar('Ocupación no válida.', 'error');
      return;
    }

    setIsDeleting(true);
    try {
      await deleteOccupation(occupation.recPrimarykeyRcws);
      showSnackbar('Ocupación eliminada exitosamente.', 'success');
      onDeleteSuccess();
      setTimeout(onClose, 1000); // cierra tras éxito
    } catch (error) {
      console.error('Error al eliminar la ocupación:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      showSnackbar(`Error: ${errorMessage}`, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Eliminar Ocupación">
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            ¿Estás seguro de eliminar esta ocupación?
          </Typography>
          <Typography sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
            {occupation?.recTitleworkRcws || 'Nombre no disponible'}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="error"
              disabled={isDeleting || !occupation}
              onClick={() => handleDelete(showSnackbar)}
              startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
            <Button variant="outlined" onClick={onClose} disabled={isDeleting}>
              Cancelar
            </Button>
          </Stack>
        </>
      )}
    </BaseModal>
  );
};
