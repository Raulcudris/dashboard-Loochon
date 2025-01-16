'use client';

import { Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { editUser } from "../../../../services/userService";
import { defaultNewUser, EditUser, NewUser } from '@/interface/userInterface';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: EditUser | null;
  onSave: () => void; // Callback para refrescar la lista después de guardar
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const [updatedUser, setUpdatedUser] = useState<EditUser | null>(null);

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    } else {
      setUpdatedUser(null);
    }
  }, [user]);

  const handleInputChange = (field: keyof EditUser, value: string | number) => {
    if (updatedUser) {
      setUpdatedUser((prev) => ({
        ...prev!,
        [field]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (updatedUser) {
      try {
        const userToSave: NewUser = {
          ...defaultNewUser,
          ...updatedUser,
          recNomusuReus: `${updatedUser.recNombreReus || ''} ${updatedUser.recApelidReus || ''}`.trim(),
        };
        await editUser(userToSave);
        alert('Usuario actualizado con éxito.');
        onSave(); // Refrescar la lista de usuarios
        onClose(); // Cerrar el modal
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        alert('Hubo un error al actualizar el usuario. Por favor, inténtelo de nuevo.');
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-user-modal">
      <Box sx={modalStyle}>
        <Typography variant="h6" align="center" component="h2" sx={{ mb: 2 }}>
          Modificar Usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Nombre"
              value={updatedUser?.recNombreReus || ''}
              fullWidth
              onChange={(e) => handleInputChange('recNombreReus', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Apellido"
              value={updatedUser?.recApelidReus || ''}
              fullWidth
              onChange={(e) => handleInputChange('recApelidReus', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Correo Electrónico"
              value={updatedUser?.apjCorreoApgm || ''}
              fullWidth
              onChange={(e) => handleInputChange('apjCorreoApgm', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Dirección"
              value={updatedUser?.recDirresReus || ''}
              fullWidth
              onChange={(e) => handleInputChange('recDirresReus', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Teléfono"
              value={updatedUser?.recTelefoReus || ''}
              fullWidth
              onChange={(e) => handleInputChange('recTelefoReus', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Fecha de Nacimiento"
              value={updatedUser?.recFecnacReus || ''}
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleInputChange('recFecnacReus', e.target.value)}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
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
