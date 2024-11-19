'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

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
  user: any;
  onSave: (updatedUser: any) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const [updatedUser, setUpdatedUser] = React.useState(user);

  const handleInputChange = (field: string, value: string) => {
    setUpdatedUser((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedUser);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-user-modal">
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Modificar Usuario
        </Typography>
        <TextField
          label="Nombre"
          defaultValue={user?.recNombreReus}
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => handleInputChange('recNombreReus', e.target.value)}
        />
        <TextField
          label="Email"
          defaultValue={user?.apjCorreoApgm}
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => handleInputChange('apjCorreoApgm', e.target.value)}
        />
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};
