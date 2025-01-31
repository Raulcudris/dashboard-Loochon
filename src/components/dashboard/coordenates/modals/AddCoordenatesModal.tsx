'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
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
  IconButton,
} from '@mui/material';
import { createCity } from '@/services';
import { NewCoordenate, defaultNewCoordenate } from '@/interface';

// Carga dinámica del mapa
const MapComponent = dynamic(() => import('./Maps/MapComponent'), { ssr: false });

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const largeMapModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
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
  const [temporaryCoordenate, setTemporaryCoordenate] = useState<NewCoordenate>(defaultNewCoordenate);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [largeMapOpen, setLargeMapOpen] = useState<boolean>(false);

  const handleInputChange = (field: keyof NewCoordenate, value: string | number) => {
    setNewCoordenate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const openLargeMap = () => {
    setTemporaryCoordenate({ ...newCoordenate }); // Guardamos el estado actual para edición
    setLargeMapOpen(true);
  };

  const cancelLargeMapChanges = () => {
    setLargeMapOpen(false); // Solo cerramos el modal sin aplicar cambios
  };

  const saveLargeMapChanges = () => {
    setNewCoordenate({ ...temporaryCoordenate }); // Guardamos los cambios en el formulario principal
    setLargeMapOpen(false);
  };

  const handleSave = async () => {
    if (!newCoordenate.sisNombreSipr.trim() || !newCoordenate.sisGeolatSipr || !newCoordenate.sisGeolonSipr) {
      setSnackbarMessage('Por favor, complete todos los campos obligatorios.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await createCity(newCoordenate);
      setSnackbarMessage('Coordenada creada con éxito.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onCoordenateAdded();
      onClose();
      setNewCoordenate(defaultNewCoordenate);
    } catch (error) {
      console.error('Error al crear la coordenada:', error);
      setSnackbarMessage('Error al crear la coordenada. Inténtelo de nuevo.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="add-coordenates-modal">
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            &times;
          </IconButton>
          <Typography variant="h6" align="center" component="h2" sx={{ mb: 3 }}>
            Añadir Información de Coordenadas
          </Typography>
          <br />
          <Grid container spacing={2}>
            {/* Columna 1: primera mitad del formulario */}
            <Grid item xs={4}>
              <TextField
                label="Nombre de la Provincia"
                value={newCoordenate.sisNombreSipr}
                fullWidth
                onChange={(e) => handleInputChange('sisNombreSipr', e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Código de Provincia"
                value={newCoordenate.sisCodproSipr}
                fullWidth
                onChange={(e) => handleInputChange('sisCodproSipr', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Código del Municipio"
                value={newCoordenate.sisCodmunSimu}
                fullWidth
                onChange={(e) => handleInputChange('sisCodmunSimu', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="ID del Departamento"
                value={newCoordenate.sisIdedptSidp}
                fullWidth
                onChange={(e) => handleInputChange('sisIdedptSidp', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Código Postal"
                value={newCoordenate?.sisCodposSipr || ''}
                fullWidth
                onChange={(e) => handleInputChange('sisCodposSipr', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            {/* Columna 2: segunda mitad del formulario */}
            <Grid item xs={4}>
              <TextField
                label="Clase de la Provincia"
                value={newCoordenate.sisProclaSipr}
                fullWidth
                onChange={(e) => handleInputChange('sisProclaSipr', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Estado de Registro"
                value={newCoordenate.sisEstregSipr}
                fullWidth
                onChange={(e) => handleInputChange('sisEstregSipr', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Latitud Geográfica"
                value={newCoordenate.sisGeolatSipr}
                type="number"
                fullWidth
                onChange={(e) => handleInputChange('sisGeolatSipr', parseFloat(e.target.value))}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Longitud Geográfica"
                value={newCoordenate.sisGeolonSipr}
                type="number"
                fullWidth
                onChange={(e) => handleInputChange('sisGeolonSipr', parseFloat(e.target.value))}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={4}>
              <Box sx={mapContainerStyle}>
                <MapComponent
                  coordinates={[newCoordenate.sisGeolatSipr || 0, newCoordenate.sisGeolonSipr || 0]}
                  setCoordinates={(newCoords) => {
                    setNewCoordenate((prev) => ({
                      ...prev,
                      sisGeolatSipr: newCoords[0],
                      sisGeolonSipr: newCoords[1],
                    }));
                  }}
                />
                <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'center' }}>
                  <Button variant="contained" onClick={openLargeMap}>
                    Ampliar vista
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Modal del mapa grande */}
      <Modal open={largeMapOpen} onClose={() => setLargeMapOpen(false)}>
        <Box sx={largeMapModalStyle}>
          {/* Botón de cierre */}
          <IconButton
            aria-label="close"
            onClick={cancelLargeMapChanges}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            &times;
          </IconButton>

          {/* Mapa en pantalla completa */}
          <MapComponent
            coordinates={[
              temporaryCoordenate.sisGeolatSipr || 0,
              temporaryCoordenate.sisGeolonSipr || 0
            ]}
            setCoordinates={(newCoords) => {
              setTemporaryCoordenate((prev) => ({
                ...prev,
                sisGeolatSipr: newCoords[0],
                sisGeolonSipr: newCoords[1],
              }));
            }}
            isDraggable={true} // Permitir mover el marcador
            isFullScreen={true} // Estilo de pantalla completa
          />

          {/* Botones de acción */}
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={saveLargeMapChanges}>
              Guardar Ubicación
            </Button>
            <Button variant="outlined" color="secondary" onClick={cancelLargeMapChanges}>
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
