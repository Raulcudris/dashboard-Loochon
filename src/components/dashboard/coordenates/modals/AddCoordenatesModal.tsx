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
  Snackbar,
  Alert,
} from '@mui/material';
import { createCity } from '@/services';
import { NewCoordenate, defaultNewCoordenate } from '@/interface';

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

interface AddCoordenatesModalProps {
  open: boolean;
  onClose: () => void;
  onCoordenateAdded: () => void;
}

export const AddCoordenatesModal: React.FC<AddCoordenatesModalProps> = ({
  open,
  onClose,
  onCoordenateAdded,
}) => {
  const [newCoordenate, setNewCoordenate] = useState<NewCoordenate>(defaultNewCoordenate);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleInputChange = (field: keyof NewCoordenate, value: string | number) => {
    setNewCoordenate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    // Validación de campos obligatorios
    if (!newCoordenate.sisNombreSipr.trim()) {
      setSnackbarMessage('Por favor, complete el campo de Nombre de la Provincia.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await createCity(newCoordenate);
      setSnackbarMessage('Coordenada creada con éxito.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onCoordenateAdded(); // Refrescar la lista de coordenadas
      onClose(); // Cerrar el modal
      setNewCoordenate(defaultNewCoordenate); // Limpiar formulario
    } catch (error) {
      console.error('Error al crear la coordenada:', error);
      setSnackbarMessage('Error al crear la coordenada. Por favor, inténtelo de nuevo.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="add-coordenates-modal">
        <Box sx={modalStyle}>
          <Typography variant="h6" align="center" component="h2" sx={{ mb: 3 }}>
            Añadir Nueva Coordenada
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nombre de la Provincia"
                value={newCoordenate.sisNombreSipr}
                fullWidth
                onChange={(e) => handleInputChange('sisNombreSipr', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Código de Provincia"
                value={newCoordenate.sisCodproSipr}
                fullWidth
                onChange={(e) => handleInputChange('sisCodproSipr', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Código del Municipio"
                value={newCoordenate.sisCodmunSimu}
                fullWidth
                onChange={(e) => handleInputChange('sisCodmunSimu', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="ID del Departamento"
                value={newCoordenate.sisIdedptSidp}
                fullWidth
                onChange={(e) => handleInputChange('sisIdedptSidp', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Latitud Geográfica"
                value={newCoordenate.sisGeolatSipr}
                type="number"
                fullWidth
                onChange={(e) => handleInputChange('sisGeolatSipr', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Longitud Geográfica"
                value={newCoordenate.sisGeolonSipr}
                type="number"
                fullWidth
                onChange={(e) => handleInputChange('sisGeolonSipr', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado de Registro"
                value={newCoordenate.sisEstregSipr}
                fullWidth
                onChange={(e) => handleInputChange('sisEstregSipr', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Clase de la Provincia"
                value={newCoordenate.sisProclaSipr}
                fullWidth
                onChange={(e) => handleInputChange('sisProclaSipr', e.target.value)}
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

      {/* Snackbar para mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
