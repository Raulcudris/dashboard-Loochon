import React, { useEffect, useState } from 'react';
import { Button, Stack, TextField, Grid } from '@mui/material';
import { editCategory } from '@/services/occupations/categoryService';
import { EditCategory, defaultNewCategory } from '@/interface/occupations/categoryInterface';
import { BaseModal } from './BaseModal';

export const EditCategoryModal: React.FC<{
  open: boolean;
  onClose: () => void;
  category: EditCategory | null;
  onSave: () => void;
}> = ({ open, onClose, category, onSave }) => {
  const [updatedCategory, setUpdatedCategory] = useState<EditCategory>(defaultNewCategory);

  useEffect(() => {
    if (category) {
      setUpdatedCategory(category);
    } else {
      setUpdatedCategory(defaultNewCategory);
    }
  }, [category]);

  const handleInputChange = (field: keyof EditCategory, value: string | number) => {
    setUpdatedCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Editar Categoría">
      {({ showSnackbar }) => (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Clave"
                value={updatedCategory.recIdentifikeyRcwk || ''}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Título"
                value={updatedCategory.recTitleworkRcwk || ''}
                fullWidth
                onChange={(e) => handleInputChange('recTitleworkRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                value={updatedCategory.recDescrworkRcwk || ''}
                fullWidth
                multiline
                rows={3}
                onChange={(e) => handleInputChange('recDescrworkRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Palabras clave"
                value={updatedCategory.recKeylocationRcwk || ''}
                fullWidth
                onChange={(e) => handleInputChange('recKeylocationRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="URL de Imagen"
                value={updatedCategory.recImageviewRcwk || ''}
                fullWidth
                onChange={(e) => handleInputChange('recImageviewRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado"
                value={updatedCategory.recStatusregiRcwk}
                select
                fullWidth
                onChange={(e) => handleInputChange('recStatusregiRcwk', e.target.value)}
                SelectProps={{ native: true }}
              >
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
              </TextField>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={async () => {
                try {
                  await editCategory(updatedCategory);
                  showSnackbar('Categoría actualizada con éxito.', 'success');
                  onSave();
                  setTimeout(() => onClose(), 2000);
                } catch (error: unknown) {
                  console.error('Error al actualizar la categoría:', error);
                  showSnackbar('Error al actualizar la categoría. Por favor, inténtelo de nuevo.', 'error');
                }
              }}
            >
              Guardar
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
