'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, Stack, TextField, Grid, IconButton, Modal } from '@mui/material';
import { NewCoordenate, defaultNewCoordenate } from '@/interface';
import { BaseModal } from './BaseModal'; // Asegúrate de que la ruta de importación sea correcta
import { useCoordenates } from '@/hooks/use-coordenates'; // Importa el hook

// Carga dinámica del mapa
const MapComponent = dynamic(() => import('./Maps/MapComponent'), { ssr: false });

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
  const [largeMapOpen, setLargeMapOpen] = useState<boolean>(false);

  // Usa el hook useCoordenates
  const { createCoordenate, loading } = useCoordenates();

  const handleInputChange = (field: keyof NewCoordenate, value: string | number) => {
    setNewCoordenate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const openLargeMap = () => {
    setTemporaryCoordenate({ ...newCoordenate });
    setLargeMapOpen(true);
  };

  const cancelLargeMapChanges = () => {
    setLargeMapOpen(false);
  };

  const saveLargeMapChanges = () => {
    setNewCoordenate({ ...temporaryCoordenate });
    setLargeMapOpen(false);
  };

  const handleSave = async (showSnackbar: (message: string, severity: 'success' | 'error') => void) => {
    if (!newCoordenate.sisNombreSipr.trim() || !newCoordenate.sisGeolatSipr || !newCoordenate.sisGeolonSipr) {
      showSnackbar('Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    try {
      const success = await createCoordenate(newCoordenate);
      if (success) {
        showSnackbar('Coordenada creada con éxito.', 'success');
        onCoordenateAdded();
        onClose();
        setNewCoordenate(defaultNewCoordenate);
      }
    } catch (error) {
      console.error('Error al crear la coordenada:', error);
      showSnackbar('Error al crear la coordenada. Inténtelo de nuevo.', 'error');
    }
  };

  return (
    <>
      <BaseModal open={open} onClose={onClose} title="Añadir Información de Coordenadas">
        {({ showSnackbar }) => (
          <>
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
              <Button variant="contained" color="primary" onClick={() => handleSave(showSnackbar)} disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Cancelar
              </Button>
            </Stack>
          </>
        )}
      </BaseModal>

      {/* Modal del mapa grande */}
      <Modal open={largeMapOpen} onClose={cancelLargeMapChanges}>
        <Box sx={largeMapModalStyle}>
          <IconButton
            aria-label="close"
            onClick={cancelLargeMapChanges}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            &times;
          </IconButton>
          <MapComponent
            coordinates={[
              temporaryCoordenate.sisGeolatSipr || 0,
              temporaryCoordenate.sisGeolonSipr || 0,
            ]}
            setCoordinates={(newCoords) => {
              setTemporaryCoordenate((prev) => ({
                ...prev,
                sisGeolatSipr: newCoords[0],
                sisGeolonSipr: newCoords[1],
              }));
            }}
            isDraggable={true}
            isFullScreen={true}
          />
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
    </>
  );
};