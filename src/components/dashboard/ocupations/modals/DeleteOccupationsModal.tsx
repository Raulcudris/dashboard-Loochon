import React, { useState } from 'react';
import { Button, Stack, Typography, CircularProgress } from '@mui/material';
import { BaseModal } from '@/components/dashboard/ocupations/modals/BaseModal';
import { changeOccupationStatus } from '@/services';
import { Occupations } from '@/interface';

export const DeleteOccupationsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  occupation: Occupations | null;
  onDeleteSuccess: () => void;
}> = ({ open, onClose, occupation, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <BaseModal open={open} onClose={onClose} title="Eliminar Ocupación">
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            ¿Estás seguro de eliminar esta ocupación?
          </Typography>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {occupation?.recDescrworkRcws || 'Nombre no disponible'}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                if (!occupation) {
                  showSnackbar('No se ha seleccionado ninguna ocupación para eliminar.', 'error');
                  return;
                }

                setIsDeleting(true);

                try {
                  // Cambiar el estado de la ocupación a "eliminado" (estado 2)
                  await changeOccupationStatus(occupation.recPrimarykeyRcws);
                  showSnackbar('Ocupación eliminada exitosamente.', 'success');
                  onDeleteSuccess();
                  setTimeout(() => {
                    onClose(); // Cerrar el modal después de 2 segundos
                  }, 2000);
                } catch (error: any) {
                  console.error('Error al eliminar la ocupación:', error);
                  // Mostrar mensaje de error específico del backend si está disponible
                  const errorMessage = error.message || 'Error al eliminar la ocupación. Por favor, inténtelo de nuevo.';
                  showSnackbar(errorMessage, 'error');
                } finally {
                  setIsDeleting(false);
                }
              }}
              disabled={isDeleting}
              startIcon={isDeleting && <CircularProgress size={20} color="inherit" />}
            >
              Eliminar
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