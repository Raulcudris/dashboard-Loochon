'use client';

import React, { useEffect, useState } from 'react';
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
import { defaultNewOccupations, EditOccupations, NewOccupations } from '@/interface';
import { editOccupation } from '@/services';

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

interface EditOccupationsModalProps {
  open: boolean;
  onClose: () => void;
  occupation: EditOccupations | null;
  onSave: () => void;
}

export const EditOccupationsModal: React.FC<EditOccupationsModalProps> = ({
  open,
  onClose,
  occupation,
  onSave,
}) => {
  const [updatedOccupation, setUpdatedOccupation] = useState<EditOccupations>(defaultNewOccupations);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (occupation) {
      setUpdatedOccupation(occupation);
    }
  }, [occupation]);

  const handleInputChange = (field: keyof EditOccupations, value: string | number) => {
    if (updatedOccupation) {
      setUpdatedOccupation({ ...updatedOccupation, [field]: value });
    }
  };

  const handleSave = async () => {
    if (updatedOccupation) {
      try {
        const normalizedOccupations: NewOccupations = {
          ...defaultNewOccupations,
          ...updatedOccupation,
        };

        // Llamada al servicio
        await editOccupation(normalizedOccupations);

        // Notificación de éxito
        setSnackbarMessage('Ocupación actualizada con éxito.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        // Actualizar datos
        onSave();

        // Cerrar el modal después de mostrar el Snackbar
        setTimeout(onClose, 1000); // Espera 500 ms para que se muestre la alerta
      } catch (error) {
        console.error('Error al actualizar la ocupación:', error);

        // Notificación de error
        setSnackbarMessage('Error al actualizar la ocupación. Por favor, inténtelo de nuevo.');
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
      <Modal open={open} onClose={onClose} aria-labelledby="edit-occupations-modal">
        <Box sx={modalStyle}>
          <Typography variant="h6" align="center" component="h2" sx={{ mb: 3 }}>
            Editar Ocupación
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Clave"
                value={updatedOccupation?.recIdentifikeyRcws || ''}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Categoría"
                value={updatedOccupation?.recIdentifikeyRcwk || ''}
                fullWidth
                onChange={(e) => handleInputChange('recIdentifikeyRcwk', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Título"
                value={updatedOccupation?.recTitleworkRcws || ''}
                fullWidth
                onChange={(e) => handleInputChange('recTitleworkRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                value={updatedOccupation?.recDescrworkRcws || ''}
                fullWidth
                multiline
                rows={3}
                onChange={(e) => handleInputChange('recDescrworkRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Estado"
                value={updatedOccupation?.recStatusregiRcws || ''}
                fullWidth
                onChange={(e) => handleInputChange('recStatusregiRcws', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Orden de Visualización"
                value={updatedOccupation?.recOrdviewkeyRcws || ''}
                fullWidth
                onChange={(e) => handleInputChange('recOrdviewkeyRcws', e.target.value)}
              />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar
            </Button>
            <Button variant="outlined" onClick={onClose}>
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
