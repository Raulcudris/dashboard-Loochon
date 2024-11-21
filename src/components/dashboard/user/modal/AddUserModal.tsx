'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar'; // Para mensajes de confirmación
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { createUser } from '../services/userService';

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
  onUserAdded: () => void; // Callback para actualizar la lista de usuarios
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose, onUserAdded }) => {
  const [newUser, setNewUser] = useState({
    recNombreReus: '',
    recNroideReus: '',
    recApelidReus: '',
    apjCorreoApgm: '',
    recDirresReus: '',
    recTelefoReus: '',
    recFecnacReus: '',
    recSexusuReus: '',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleInputChange = (field: string, value: string) => {
    setNewUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Validación simple
      if (!newUser.recNombreReus || !newUser.recApelidReus || !newUser.apjCorreoApgm) {
        setSnackbar({ open: true, message: 'Por favor, complete los campos obligatorios.', severity: 'error' });
        return;
      }
      const completeUser = {
        recNombreReus: newUser.recNombreReus,
        recApelidReus: newUser.recApelidReus,
        recFecnacReus: newUser.recFecnacReus || '1900-01-01',
        recDirresReus: newUser.recDirresReus || 'Sin Dirección',
        recTelefoReus: newUser.recTelefoReus || 'Sin Teléfono',
        apjCorreoApgm: newUser.apjCorreoApgm,
        recNroideReus: newUser.recNroideReus || 'Sin ID',
        recSexusuReus: newUser.recSexusuReus || '1', // Valor predeterminado para sexo
        recNroregReus: 0, // Generar un número único
        recNiknamReus: newUser.recNombreReus.toLowerCase(),
        recNomusuReus: `${newUser.recNombreReus} ${newUser.recApelidReus}`,
        recImgvisReus: 'https://example.com/default-avatar.jpg', // URL de imagen predeterminada
        recCodposReus: '00000',
        sisCodpaiSipa: '170', // Código de país predeterminado
        sisIdedptSidp: '205020',
        sisCodproSipr: '205020001000',
        recGeolatReus: 0,
        recGeolonReus: 0,
        sisCountaRkey: 0,
        sisCountbRkey: 0,
        sisCountcRkey: 0,
        sisCountdRkey: 0,
        sisCounteRkey: 0,
        sisCountfRkey: 0,
        recEstregReus: '1', // Activo por defecto como string
        };
      await createUser(completeUser);
      setSnackbar({ open: true, message: 'Usuario creado con éxito.', severity: 'success' });

      // Limpieza y cierre
      onClose();
      onUserAdded();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al crear el usuario.', severity: 'error' });
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <>
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
              label="Numero de identificacion"
              value={newUser.recNroideReus}
              fullWidth
              onChange={(e) => handleInputChange('recNroideReus', e.target.value)}
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
              label="Sexo"
              value={newUser.recSexusuReus}
              fullWidth
              onChange={(e) => handleInputChange('recSexusuReus', e.target.value)}
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
      />
    </>
  );
};
