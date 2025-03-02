import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography, Grid } from '@mui/material';
import { createUser } from '../../../../services/userService';
import { defaultNewUser, NewUser } from '@/interface/userInterface';
import { BaseModal } from './BaseModal'; // Asegúrate de importar el BaseModal

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

  const handleSave = (showSnackbar: (message: string, severity: 'success' | 'error') => void) => {
    if (!newUser.recNombreReus.trim() || !newUser.recApelidReus.trim() || !newUser.apjCorreoApgm.trim()) {
      showSnackbar('Por favor, complete los campos obligatorios.', 'error');
      return;
    }

    const userToSave: NewUser = {
      ...newUser,
      recNombreReus: newUser.recNombreReus.toUpperCase(),
      recApelidReus: newUser.recApelidReus.toUpperCase(),
    };

    createUser(userToSave)
      .then(() => {
        setNewUser(defaultNewUser);
        onClose();
        showSnackbar('Usuario creado con éxito.', 'success');
        onUserAdded();
      })
      .catch((error) => {
        console.error('Error al crear el usuario:', error);
        showSnackbar('Error al crear el usuario. Por favor, inténtelo de nuevo.', 'error');
      });
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Añadir Nuevo Usuario">
      {({ showSnackbar }) => (
        <>
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
                value={newUser.recSexusuReus}
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
            <Button variant="contained" onClick={() => handleSave(showSnackbar)}>
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