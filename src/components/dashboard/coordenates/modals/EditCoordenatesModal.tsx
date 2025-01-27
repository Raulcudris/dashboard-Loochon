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
  Snackbar,
  Alert,
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
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

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
        const normalizedCoordenate: NewCoordenate = {
          ...defaultNewCoordenate,
          ...updatedCoordenate,
        };

        await editCity(normalizedCoordenate);
        setSnackbarMessage('Coordenada actualizada con éxito.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onSave();
        onClose();
      } catch (error) {
        console.error('Error al actualizar la coordenada:', error);
        setSnackbarMessage('Ocurrió un error al actualizar la coordenada.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
