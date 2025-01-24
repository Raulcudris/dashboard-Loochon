'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { EditCoordenate, defaultNewCoordenate, NewCoordenate } from '@/interface';
import { editCity } from '@/services';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface EditCoordenatesModalProps {
  open: boolean;
  onClose: () => void;
  coordenate: EditCoordenate | null;
  onSave: () => void; // Callback para recargar la lista después de guardar
}

export const EditCoordenatesModal: React.FC<EditCoordenatesModalProps> = ({
  open,
  onClose,
  coordenate,
  onSave,
}) => {
  const [updatedCoordenate, setUpdatedCoordenate] = useState<EditCoordenate>(defaultNewCoordenate);

  useEffect(() => {
    if (coordenate) {
      setUpdatedCoordenate(coordenate);
    }
  }, [coordenate]);

  const handleInputChange = (field: keyof EditCoordenate, value: string | number) => {
    setUpdatedCoordenate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (updatedCoordenate) {
      try {
        // Normalizar el objeto para asegurarse de que todos los valores opcionales estén definidos
        const normalizedCoordenate: NewCoordenate = {
          ...defaultNewCoordenate, // Asegura valores por defecto
          ...updatedCoordenate, // Sobrescribe valores con los proporcionados
        };

        await editCity(normalizedCoordenate); // Llamada al servicio con el objeto normalizado
        alert('Coordenada actualizada con éxito.');
        onSave(); // Recargar la lista
        onClose();
      } catch (error) {
        console.error('Error al actualizar la coordenada:', error);
        alert('Ocurrió un error al actualizar la coordenada.');
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-coordenate-modal">
      <Box sx={modalStyle}>
        <Typography variant="h6" align="center" component="h2" sx={{ mb: 2 }}>
          Editar Coordenada
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Código de la Provincia"
              value={updatedCoordenate?.sisCodproSipr || ''}
              fullWidth
              onChange={(e) => handleInputChange('sisCodproSipr', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Código del Municipio"
              value={updatedCoordenate?.sisCodmunSimu || ''}
              fullWidth
              onChange={(e) => handleInputChange('sisCodmunSimu', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="ID del Departamento"
              value={updatedCoordenate?.sisIdedptSidp || ''}
              fullWidth
              onChange={(e) => handleInputChange('sisIdedptSidp', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Nombre de la Provincia"
              value={updatedCoordenate?.sisNombreSipr || ''}
              fullWidth
              onChange={(e) => handleInputChange('sisNombreSipr', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Código Postal"
              value={updatedCoordenate?.sisCodposSipr || ''}
              fullWidth
              onChange={(e) => handleInputChange('sisCodposSipr', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Latitud"
              value={updatedCoordenate?.sisGeolatSipr || 0}
              type="number"
              fullWidth
              onChange={(e) => handleInputChange('sisGeolatSipr', parseFloat(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Longitud"
              value={updatedCoordenate?.sisGeolonSipr || 0}
              type="number"
              fullWidth
              onChange={(e) => handleInputChange('sisGeolonSipr', parseFloat(e.target.value))}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
