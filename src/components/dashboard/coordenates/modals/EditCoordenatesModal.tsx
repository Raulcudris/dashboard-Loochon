'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
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
  IconButton,
} from '@mui/material';
import { EditCoordenate, defaultNewCoordenate, NewCoordenate } from '@/interface';
import { editCity } from '@/services';

const MapComponent = dynamic(() => import('./Maps/MapComponent'), { ssr: false });

// Estilos del modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000, // Ajustar para mayor ancho
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// Estilo del contenedor del mapa
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


interface EditCoordenatesModalProps {
  open: boolean;
  onClose: () => void;
  coordenate: EditCoordenate | null;
  onSave: () => void;
}

export const EditCoordenatesModal: React.FC<EditCoordenatesModalProps> = ({
  open,
  onClose,
  coordenate,
  onSave,
}) => {
  const [updatedCoordenate, setUpdatedCoordenate] = useState<EditCoordenate>(defaultNewCoordenate);
  const [temporaryCoordenate, setTemporaryCoordenate] = useState<EditCoordenate>(defaultNewCoordenate);
  const [smallMapCoords, setSmallMapCoords] = useState<[number, number]>([0, 0]); // Coordenadas del mapa pequeño
  const [isModified, setIsModified] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [largeMapOpen, setLargeMapOpen] = useState<boolean>(false);

  useEffect(() => {
    if (coordenate) {
      setUpdatedCoordenate(coordenate);
    }
  }, [coordenate]);

  useEffect(() => {
    if (coordenate) {
      setIsModified(JSON.stringify(coordenate) !== JSON.stringify(updatedCoordenate));
    }
  }, [updatedCoordenate, coordenate]);

  const handleInputChange = (field: keyof EditCoordenate, value: string | number) => {
    setUpdatedCoordenate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
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
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const openLargeMap = () => {
    setTemporaryCoordenate({ ...updatedCoordenate }); // Guarda un estado temporal
    setLargeMapOpen(true);
  };

  const cancelLargeMapChanges = () => {
    setLargeMapOpen(false); // Solo cerramos el modal sin actualizar nada
  };

  const saveLargeMapChanges = () => {
    const newCoords: [number, number] = [
      temporaryCoordenate?.sisGeolatSipr || 0,
      temporaryCoordenate?.sisGeolonSipr || 0,
    ];

    // Solo actualizamos las coordenadas si se presiona "Guardar"
    setUpdatedCoordenate({ ...temporaryCoordenate });
    setSmallMapCoords(newCoords);
    setLargeMapOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="edit-coordenate-modal">
        <Box sx={modalStyle}>
          {/* Botón de cierre */}
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
          <Typography variant="h6" align="center" component="h2" sx={{ mb: 2 }}>
            Actualizar Información de Coordenadas
          </Typography>
          <br />
          <Grid container spacing={2}>
            {/* Columna 1: primera mitad del formulario */}
            <Grid item xs={4}>
              <TextField
                label="Código de la Provincia"
                value={updatedCoordenate?.sisCodproSipr || ''}
                fullWidth
                onChange={(e) => handleInputChange('sisCodproSipr', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Código del Municipio"
                value={updatedCoordenate?.sisCodmunSimu || ''}
                fullWidth
                onChange={(e) => handleInputChange('sisCodmunSimu', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Código del Departamento"
                value={updatedCoordenate?.sisIdedptSidp || ''}
                fullWidth
                onChange={(e) => handleInputChange('sisIdedptSidp', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Nombre del Departamento"
                value={updatedCoordenate.state?.sisNombreSidp || ''}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Nombre del Municipio"
                value={updatedCoordenate.city?.sisNombreSimu || ''}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Columna 2: segunda mitad del formulario */}
            <Grid item xs={4}>
              <TextField
                label="Nombre de la Provincia"
                value={updatedCoordenate?.sisNombreSipr || ''}
                fullWidth
                onChange={(e) => handleInputChange('sisNombreSipr', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Código Postal"
                value={updatedCoordenate?.sisCodposSipr || ''}
                fullWidth
                onChange={(e) => handleInputChange('sisCodposSipr', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Indicador de Capital"
                value={updatedCoordenate?.sisProclaSipr || ''}
                fullWidth
                onChange={(e) => handleInputChange('sisProclaSipr', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Latitud"
                value={updatedCoordenate?.sisGeolatSipr || 0}
                type="number"
                fullWidth
                onChange={(e) => handleInputChange('sisGeolatSipr', parseFloat(e.target.value))}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Longitud"
                value={updatedCoordenate?.sisGeolonSipr || 0}
                type="number"
                fullWidth
                onChange={(e) => handleInputChange('sisGeolonSipr', parseFloat(e.target.value))}
              />
            </Grid>
            {/* Columna 3: mapa */}
            <Grid item xs={4}>
              <Box sx={mapContainerStyle}>
                <MapComponent
                  coordinates={[updatedCoordenate?.sisGeolatSipr || 0, updatedCoordenate?.sisGeolonSipr || 0]}
                  setCoordinates={(newCoords) => {
                    setUpdatedCoordenate(prev => ({
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
          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={!isModified} >
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
          <MapComponent
            coordinates={[temporaryCoordenate?.sisGeolatSipr || 0, temporaryCoordenate?.sisGeolonSipr || 0]}
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

          <Stack direction="row" spacing={2} sx={{ mt: 1, justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={saveLargeMapChanges}>
              Guardar Ubicación
            </Button>
            <Button variant="outlined" color="secondary" onClick={cancelLargeMapChanges}>
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
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
};
