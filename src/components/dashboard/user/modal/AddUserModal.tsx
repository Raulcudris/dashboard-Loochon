'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { createUser } from '../services/userService';
import { Grid } from '@mui/material';
import { defaultNewUser, NewUser } from '../interface/userInterface';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose, onUserAdded }) => {
  const [newUser, setNewUser] = useState<NewUser>(defaultNewUser);

  const handleInputChange = (field: keyof NewUser, value: string | number) => {
    setNewUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Validación de campos obligatorios
    if (
      !newUser.recNombreReus.trim() ||
      !newUser.recApelidReus.trim() ||
      !newUser.apjCorreoApgm.trim()
    ) {
      alert('Por favor, complete los campos obligatorios.');
      return;
    }

    // Preparar datos antes de guardar
    const userToSave: NewUser = {
      ...newUser,
      recNombreReus: newUser.recNombreReus.toUpperCase(),
      recApelidReus: newUser.recApelidReus.toUpperCase(),
    };

    // Llamada al servicio `createUser`
    createUser(userToSave)
      .then(() => {
        setNewUser(defaultNewUser); // Limpiar formulario
        onClose(); // Cerrar modal
        alert('Usuario creado con éxito.');
        onUserAdded(); // Refrescar lista de usuarios
      })
      .catch((error) => {
        console.error('Error al crear el usuario:', error);
        alert('Error al crear el usuario. Por favor, inténtelo de nuevo.');
      });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-user-modal">
      <Box sx={modalStyle}>
        <Typography variant="h6" align="center" component="h2" sx={{ mb: 2 }}>
          Añadir Nuevo Usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Nombre"
              value={newUser.recNombreReus}
              fullWidth
              onChange={(e) => handleInputChange('recNombreReus', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Número de Identificación"
              value={newUser.recNroideReus}
              fullWidth
              onChange={(e) => handleInputChange('recNroideReus', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Apellido"
              value={newUser.recApelidReus}
              fullWidth
              onChange={(e) => handleInputChange('recApelidReus', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Correo Electrónico"
              value={newUser.apjCorreoApgm}
              fullWidth
              onChange={(e) => handleInputChange('apjCorreoApgm', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
          <TextField
            label="Sexo"
            value={newUser.recSexusuReus } // Valor inicial vacío si no hay uno seleccionado
            select
            fullWidth
            onChange={(e) => handleInputChange('recSexusuReus', e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="0"></option>
            <option value="1">Masculino</option>
            <option value="2">Femenino</option>
            <option value="3">Otros</option>
          </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Dirección"
              value={newUser.recDirresReus}
              fullWidth
              onChange={(e) => handleInputChange('recDirresReus', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Teléfono"
              value={newUser.recTelefoReus}
              fullWidth
              onChange={(e) => handleInputChange('recTelefoReus', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Fecha de Nacimiento"
              value={newUser.recFecnacReus}
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleInputChange('recFecnacReus', e.target.value)}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
          <Button  variant="contained" onClick={handleSave}>
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
