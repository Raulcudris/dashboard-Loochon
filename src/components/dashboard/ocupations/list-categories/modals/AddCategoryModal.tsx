import React, { useState } from 'react';
import { Button, Stack, TextField, Grid } from '@mui/material';
import { createCategory } from '@/services/occupations/categoryService';
import { NewCategory, defaultNewCategory } from '@/interface/occupations/categoryInterface';
import { BaseModal } from './BaseModal';

export const AddCategoryModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onCategoryAdded: () => void;
}> = ({ open, onClose, onCategoryAdded }) => {
  const [newCategory, setNewCategory] = useState<NewCategory>(defaultNewCategory);

  const handleInputChange = (field: keyof NewCategory, value: string | number) => {
    setNewCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Añadir Nueva Categoría">
      {({ showSnackbar }) => (
        <>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                label="Codigo"
                value={newCategory.recIdentifikeyRcwk}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Nombre de Categoría"
                value={newCategory.recTitleworkRcwk}
                fullWidth
                onChange={(e) => handleInputChange('recTitleworkRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                value={newCategory.recDescrworkRcwk}
                fullWidth
                multiline
                rows={3}
                onChange={(e) => handleInputChange('recDescrworkRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Palabras clave"
                value={newCategory.recKeylocationRcwk}
                fullWidth
                onChange={(e) => handleInputChange('recKeylocationRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="URL de Imagen o Icono"
                value={newCategory.recImageviewRcwk}
                fullWidth
                onChange={(e) => handleInputChange('recImageviewRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Estado"
                value={newCategory.recStatusregiRcwk}
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
                if (!newCategory.recTitleworkRcwk.trim()) {
                  showSnackbar('Por favor, complete el campo de título.', 'error');
                  return;
                }

                try {
                  await createCategory(newCategory);
                  showSnackbar('Categoría creada con éxito.', 'success');
                  onCategoryAdded();
                  onClose();
                  setNewCategory(defaultNewCategory);
                } catch (error: unknown) {
                  console.error('Error al crear la categoría:', error);
                  showSnackbar('Error al crear la categoría. Por favor, inténtelo de nuevo.', 'error');
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
