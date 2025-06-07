'use client';
import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { BaseModal } from './BaseModal';
import { useCategories } from '@/hooks/use-category';

interface ToggleCategoryModalProps {
  open: boolean;
  onClose: () => void;
  categoryId: number;
  categoryName: string;
  isActive: boolean; // true si está actualmente activa
  onToggleSuccess: () => void;
}

export const ToggleCategoryModal: React.FC<ToggleCategoryModalProps> = ({
  open,
  onClose,
  categoryId,
  categoryName,
  isActive,
  onToggleSuccess,
}) => {
  const { loading, activateCategory, deactivateCategory } = useCategories();

  const handleToggle = async (
    showSnackbar: (message: string, severity: 'success' | 'error') => void
  ) => {
    if (!categoryId) {
      showSnackbar('ID de categoría no válido.', 'error');
      return;
    }

    try {
      if (isActive) {
        await deactivateCategory(categoryId);
        showSnackbar('Categoría inactivada exitosamente.', 'success');
      } else {
        await activateCategory(categoryId);
        showSnackbar('Categoría activada exitosamente.', 'success');
      }

      onToggleSuccess();
      setTimeout(onClose, 1000);
    } catch (error) {
      console.error('Error al cambiar estado de la categoría:', error);
      showSnackbar(
        isActive
          ? 'Error al inactivar la categoría.'
          : 'Error al activar la categoría.',
        'error'
      );
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={
        isActive
          ? '¿Estás seguro de inactivar esta categoría?'
          : '¿Estás seguro de activar esta categoría?'
      }
    >
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {categoryName || 'Nombre no disponible'}
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
