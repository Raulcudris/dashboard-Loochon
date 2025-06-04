'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { EditOccupations, defaultNewOccupations } from '@/interface';
import { BaseModal } from './BaseModal';
import { useOccupations } from '@/hooks/use-occupations';

export const EditOccupationsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  occupation: EditOccupations | null;
  onSave: () => void;
}> = ({ open, onClose, occupation, onSave }) => {
  const { editOccupationData, loading } = useOccupations();

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

  const isValid = updatedOccupation.recIdentifikeyRcws && updatedOccupation.recTitleworkRcws;

  return (
    <BaseModal open={open} onClose={onClose} title="Editar Ocupación">
      {({ showSnackbar }) => (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Clave"
                value={updatedOccupation.recIdentifikeyRcws}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Categoría"
                value={updatedOccupation.recIdentifikeyRcwk}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Título"
                value={updatedOccupation.recTitleworkRcws}
                fullWidth
                onChange={(e) => handleInputChange('recTitleworkRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                value={updatedOccupation.recDescrworkRcws}
                fullWidth
                multiline
                rows={3}
                onChange={(e) => handleInputChange('recDescrworkRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Orden de Visualización"
                value={updatedOccupation.recOrdviewkeyRcws}
                type="number"
                fullWidth
                onChange={(e) => handleInputChange('recOrdviewkeyRcws', Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado"
                value={updatedOccupation.recStatusregiRcws}
                fullWidth
                select
                onChange={(e) => handleInputChange('recStatusregiRcws', e.target.value as '1' | '2')}
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
                const success = await editOccupationData(updatedOccupation);
                if (success) {
                  showSnackbar('Ocupación actualizada con éxito.', 'success');
                  onSave();
                  setTimeout(() => onClose(), 1000);
                } else {
                  showSnackbar('Error al actualizar la ocupación.', 'error');
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
