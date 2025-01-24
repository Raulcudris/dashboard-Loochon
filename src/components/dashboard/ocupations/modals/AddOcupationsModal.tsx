'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import { createOccupation } from '@/services';
import { NewOccupations, defaultNewOccupations } from '@/interface';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface AddOccupationsModalProps {
  open: boolean;
  onClose: () => void;
  onOccupationAdded: () => void;
}

export const AddOccupationsModal: React.FC<AddOccupationsModalProps> = ({
  open,
  onClose,
  onOccupationAdded,
}) => {
  const [newOccupation, setNewOccupation] = useState<NewOccupations>(defaultNewOccupations);

  const handleInputChange = (field: keyof NewOccupations, value: string | number) => {
    setNewOccupation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // Validación de campos obligatorios
    if (!newOccupation.recTitleworkRcws.trim()) {
      alert('Por favor, complete el campo de título.');
      return;
    }

    try {
      await createOccupation(newOccupation);
      alert('Ocupación creada con éxito.');
      onOccupationAdded(); // Refrescar la lista de ocupaciones
      onClose(); // Cerrar el modal
      setNewOccupation(defaultNewOccupations); // Limpiar formulario
    } catch (error) {
      console.error('Error al crear la ocupación:', error);
      alert('Error al crear la ocupación. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-occupations-modal">
      <Box sx={modalStyle}>
        <Typography variant="h6" align="center" component="h2" sx={{ mb: 3 }}>
          Añadir Nueva Ocupación
        </Typography>
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
              onChange={(e) => handleInputChange('recOrdviewkeyRcws', parseInt(e.target.value, 10))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Estado (1 = Activo, 0 = Inactivo)"
              value={newOccupation.recStatusregiRcws}
              fullWidth
              onChange={(e) => handleInputChange('recStatusregiRcws', e.target.value)}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
