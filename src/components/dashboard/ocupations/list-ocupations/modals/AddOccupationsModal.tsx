'use client';

import React, { useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { NewOccupations, defaultNewOccupations } from '@/interface';
import { BaseModal } from './BaseModal';
import { useOccupations } from '@/hooks/use-occupations';

export const AddOccupationsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onOccupationAdded: () => void;
}> = ({ open, onClose, onOccupationAdded }) => {
  const [newOccupation, setNewOccupation] = useState<NewOccupations>(defaultNewOccupations);
  const { createNewOccupation, loading } = useOccupations();

  const handleInputChange = (field: keyof NewOccupations, value: string | number) => {
    setNewOccupation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => setNewOccupation(defaultNewOccupations);

  const isValid =
    newOccupation.recIdentifikeyRcws.trim() &&
    newOccupation.recIdentifikeyRcwk.trim() &&
    newOccupation.recTitleworkRcws.trim();

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
                  handleInputChange('recOrdviewkeyRcws', parseInt(e.target.value, 10) || 0)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado"
                value={newOccupation.recStatusregiRcws}
                select
                fullWidth
                onChange={(e) =>
                  handleInputChange('recStatusregiRcws', e.target.value as '1' | '2')
                }
              >
                <MenuItem value="1">Activo</MenuItem>
                <MenuItem value="2">Inactivo</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
            <Button
              variant="contained"
              disabled={!isValid || loading}
              onClick={async () => {
                const success = await createNewOccupation(newOccupation);
                if (success) {
                  showSnackbar('Ocupación creada con éxito.', 'success');
                  onOccupationAdded();
                  onClose();
                  resetForm();
                } else {
                  showSnackbar('Error al crear la ocupación.', 'error');
                }
              }}
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Stack>
        </>
      )}
    </BaseModal>
  );
};
