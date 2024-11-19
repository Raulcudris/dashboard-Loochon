'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

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

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newUser: any) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose, onSave }) => {
  const [newUser, setNewUser] = useState({
    recNombreReus: '',
    recApelidReus: '',
    apjCorreoApgm: '',
    recDirresReus: '',
    recTelefoReus: '',
    recFecnacReus: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setNewUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(newUser);
    onClose();
    setNewUser({
      recNombreReus: '',
      recApelidReus: '',
      apjCorreoApgm: '',
      recDirresReus: '',
      recTelefoReus: '',
      recFecnacReus: '',
    });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-user-modal">
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Añadir Nuevo Usuario
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Nombre"
            value={newUser.recNombreReus}
            fullWidth
            onChange={(e) => handleInputChange('recNombreReus', e.target.value)}
          />
          <TextField
            label="Apellido"
            value={newUser.recApelidReus}
            fullWidth
            onChange={(e) => handleInputChange('recApelidReus', e.target.value)}
          />
          <TextField
            label="Correo Electrónico"
            value={newUser.apjCorreoApgm}
            fullWidth
            onChange={(e) => handleInputChange('apjCorreoApgm', e.target.value)}
          />
          <TextField
            label="Dirección"
            value={newUser.recDirresReus}
            fullWidth
            onChange={(e) => handleInputChange('recDirresReus', e.target.value)}
          />
          <TextField
            label="Teléfono"
            value={newUser.recTelefoReus}
            fullWidth
            onChange={(e) => handleInputChange('recTelefoReus', e.target.value)}
          />
          <TextField
            label="Fecha de Nacimiento"
            value={newUser.recFecnacReus}
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleInputChange('recFecnacReus', e.target.value)}
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
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
