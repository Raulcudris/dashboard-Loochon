import React, { useState } from 'react';
import { Button, Stack, TextField, Grid } from '@mui/material';
import { createOccupation } from '@/services';
import { NewOccupations, defaultNewOccupations } from '@/interface';
import { BaseModal } from './BaseModal';

export const AddOccupationsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onOccupationAdded: () => void;
}> = ({ open, onClose, onOccupationAdded }) => {
  const [newOccupation, setNewOccupation] = useState<NewOccupations>(defaultNewOccupations);

  const handleInputChange = (field: keyof NewOccupations, value: string | number) => {
    setNewOccupation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Añadir Nueva Ocupación">
      {({ showSnackbar }) => (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Clave"
                value={newOccupation.recIdentifikeyRcws}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Categoría"
                value={newOccupation.recIdentifikeyRcwk}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Título"
                value={newOccupation.recTitleworkRcws}
                fullWidth
                onChange={(e) => handleInputChange('recTitleworkRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                value={newOccupation.recDescrworkRcws}
                fullWidth
                multiline
                rows={3}
                onChange={(e) => handleInputChange('recDescrworkRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Orden de Visualización"
                value={newOccupation.recOrdviewkeyRcws}
                type="number"
                fullWidth
                onChange={(e) =>
                  handleInputChange('recOrdviewkeyRcws', e.target.value ? parseInt(e.target.value, 10) : 0)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado (1 = Activo, 0 = Inactivo)"
                value={newOccupation.recStatusregiRcws}
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
                if (!newOccupation.recTitleworkRcws.trim()) {
                  showSnackbar('Por favor, complete el campo de título.', 'error');
                  return;
                }

                try {
                  await createOccupation(newOccupation);
                  showSnackbar('Ocupación creada con éxito.', 'success');
                  onOccupationAdded();
                  onClose();
                  setNewOccupation(defaultNewOccupations);
                } catch (error: unknown) {
                  console.error('Error al crear la ocupación:', error);
                  showSnackbar('Error al crear la ocupación. Por favor, inténtelo de nuevo.', 'error');
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
