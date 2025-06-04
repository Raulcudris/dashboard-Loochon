import { Grid, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { editUser } from '../../../../services/user/userService';
import { defaultNewUser, EditUser, NewUser } from '@/interface/user/userInterface';
import { BaseModal } from './BaseModal'; // Importar BaseModal

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

  const handleSave = async (showSnackbar: (message: string, severity: 'success' | 'error') => void) => {
    if (updatedUser) {
      try {
        const userToSave: NewUser = {
          ...defaultNewUser,
          ...updatedUser,
          recNomusuReus: `${updatedUser.recNombreReus || ''} ${updatedUser.recApelidReus || ''}`.trim(),
        };
        await editUser(userToSave);
        showSnackbar('Usuario actualizado con éxito.', 'success');
        onSave(); // Refrescar la lista de usuarios
        onClose(); // Cerrar el modal
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        showSnackbar('Hubo un error al actualizar el usuario. Por favor, inténtelo de nuevo.', 'error');
      }
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Modificar Usuario">
      {({ showSnackbar }) => (
        <>
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