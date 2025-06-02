import React, { useEffect, useState } from 'react';
import { Button, Stack, TextField, Grid } from '@mui/material';
import { editOccupation } from '@/services';
import { EditOccupations, defaultNewOccupations } from '@/interface';
import { BaseModal } from './BaseModal';

export const EditOccupationsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  occupation: EditOccupations | null;
  onSave: () => void;
}> = ({ open, onClose, occupation, onSave }) => {
  const [updatedOccupation, setUpdatedOccupation] = useState<EditOccupations>(defaultNewOccupations);

  useEffect(() => {
    if (occupation) {
      setUpdatedOccupation(occupation);
    } else {
      setUpdatedOccupation(defaultNewOccupations);
    }
  }, [occupation]);

  const handleInputChange = (field: keyof EditOccupations, value: string | number) => {
    setUpdatedOccupation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Editar Ocupación">
      {({ showSnackbar }) => (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Clave"
                value={updatedOccupation.recIdentifikeyRcws || ''}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Categoría"
                value={updatedOccupation.recIdentifikeyRcwk || ''}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Título"
                value={updatedOccupation.recTitleworkRcws || ''}
                fullWidth
                onChange={(e) => handleInputChange('recTitleworkRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                value={updatedOccupation.recDescrworkRcws || ''}
                fullWidth
                multiline
                rows={3}
                onChange={(e) => handleInputChange('recDescrworkRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Orden de Visualización"
                value={updatedOccupation.recOrdviewkeyRcws || 0}
                fullWidth
                type="number"
                onChange={(e) => handleInputChange('recOrdviewkeyRcws', Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado (1 = Activo, 0 = Inactivo)"
                value={updatedOccupation.recStatusregiRcws || 0}
                select
                fullWidth
                onChange={(e) => handleInputChange('recStatusregiRcws', Number(e.target.value))}
                SelectProps={{
                  native: true,
                }}
              >
                <option value={0}>Inactivo</option>
                <option value={1}>Activo</option>
              </TextField>
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={async () => {
                try {
                  //console.log('Iniciando actualización...', updatedOccupation); // Depuración
                  await editOccupation(updatedOccupation);
                  showSnackbar('Ocupación actualizada con éxito.', 'success');
                  onSave();
                  setTimeout(() => {
                    onClose(); // Cierra el modal después de 2 segundos
                  }, 2000);
                } catch (error: unknown) {
                  console.error('Error al actualizar la ocupación:', error);
                  showSnackbar('Error al actualizar la ocupación. Por favor, inténtelo de nuevo.', 'error');
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
