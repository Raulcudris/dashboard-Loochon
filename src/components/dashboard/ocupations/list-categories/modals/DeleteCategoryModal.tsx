import React, { useState } from 'react';
import { Button, Stack, Typography, CircularProgress } from '@mui/material';
import { deleteCategory } from '@/services/occupations/categoryService';
import { Category } from '@/interface/occupations/categoryInterface';
import { BaseModal } from './BaseModal';

export const DeleteCategoryModal: React.FC<{
  open: boolean;
  onClose: () => void;
  category: Category | null;
  onDeleteSuccess: () => void;
}> = ({ open, onClose, category, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <BaseModal open={open} onClose={onClose} title="Eliminar Categoría">
      {({ showSnackbar }) => (
        <>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            ¿Estás seguro de eliminar esta categoría?
          </Typography>
          <Typography sx={{ mb: 2, textAlign: 'center' }}>
            {category?.recTitleworkRcwk || 'Nombre no disponible'}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                if (!category) return;

                setIsDeleting(true);

                try {
                  // Cambiar el estado de la categoría a "inactiva" (estado 2)
                  await deleteCategory(category.recPrimarykeyRcwk);
                  showSnackbar('Categoría eliminada exitosamente.', 'success');
                  onDeleteSuccess();
                  setTimeout(() => {
                    onClose(); // Cerrar modal
                  }, 2000);
                } catch (error: unknown) {
                  console.error('Error al eliminar la categoría:', error);
                  const errorMessage = error instanceof Error ? error.message : String(error);
                  showSnackbar(errorMessage, 'error');
                } finally {
                  setIsDeleting(false);
                }
              }}
              disabled={isDeleting || !category}
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
