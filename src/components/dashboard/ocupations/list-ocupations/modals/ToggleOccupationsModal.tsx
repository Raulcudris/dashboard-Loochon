'use client';

import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { BaseModal } from './BaseModal';
import { useOccupations } from '@/hooks/use-occupations';

interface ToggleOccupationsModalProps {
  open: boolean;
  onClose: () => void;
  occupationId: number;
  occupationTitle: string;
  isActive: boolean;
  onToggleSuccess: () => void;
}

export const ToggleOccupationsModal: React.FC<ToggleOccupationsModalProps> = ({
  open,
  onClose,
  occupationId,
  occupationTitle,
  isActive,
  onToggleSuccess,
}) => {
  const { loading, toggleOccupationStatus } = useOccupations();

  const handleToggle = async (
    showSnackbar: (message: string, severity: 'success' | 'error') => void
  ) => {
    if (!occupationId) {
      showSnackbar('ID de ocupación no válido.', 'error');
      return;
    }

    const newStatus = isActive ? '2' : '1';

    try {
      const success = await toggleOccupationStatus(occupationId, newStatus);

      if (success) {
        showSnackbar(
          isActive ? 'Ocupación inactivada exitosamente.' : 'Ocupación activada exitosamente.',
          'success'
        );
        onToggleSuccess();
        setTimeout(onClose, 1000);
      } else {
        showSnackbar(
          isActive ? 'Error al inactivar la ocupación.' : 'Error al activar la ocupación.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error al cambiar estado de la ocupación:', error);
      showSnackbar('Error inesperado al cambiar el estado.', 'error');
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={
        isActive
          ? '¿Estás seguro de inactivar esta ocupación?'
          : '¿Estás seguro de activar esta ocupación?'
      }
    >
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {occupationTitle || 'Título no disponible'}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color={isActive ? 'error' : 'success'}
              onClick={() => handleToggle(showSnackbar)}
              disabled={loading}
            >
              {loading ? 'Procesando...' : isActive ? 'Inactivar' : 'Activar'}
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
