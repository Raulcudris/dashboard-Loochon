'use client';

import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { BaseModal } from './BaseModal';
import { useCoordenates } from '@/hooks/use-coordenates';
import { changeCityStatus } from '@/services';

interface ToggleCoordenatesModalProps {
  open: boolean;
  onClose: () => void;
  coordenateId: string | null;
  coordenateName?: string | null;
  isActive: boolean; // true si está actualmente activa
  onToggleSuccess: () => void;
}

export const ToggleCoordenatesModal: React.FC<ToggleCoordenatesModalProps> = ({
  open,
  onClose,
  coordenateId,
  coordenateName,
  isActive,
  onToggleSuccess,
}) => {
  const { loading } = useCoordenates();

  const handleToggle = async (showSnackbar: (message: string, severity: 'success' | 'error') => void) => {
    if (!coordenateId) {
      showSnackbar('ID de coordenada no válido.', 'error');
      return;
    }

    try {
      const newStatus = isActive ? "2" : "1"; // 2: Inactivar, 1: Activar
      await changeCityStatus(coordenateId, newStatus);
      showSnackbar(
        isActive ? 'Coordenada inactivada exitosamente.' : 'Coordenada activada exitosamente.',
        'success'
      );
      onToggleSuccess();
      setTimeout(onClose, 1000);
    } catch (error) {
      console.error('Error al cambiar estado de la coordenada:', error);
      showSnackbar(
        isActive ? 'Error al inactivar la coordenada.' : 'Error al activar la coordenada.',
        'error'
      );
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={isActive ? '¿Estás seguro de inactivar esta ubicación?' : '¿Estás seguro de activar esta ubicación?'}
    >
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {coordenateName || 'Nombre no disponible'}
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
