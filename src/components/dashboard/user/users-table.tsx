'use client';

import { useSelection } from '@/hooks/use-selection';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { UsersTableProps, EditUser, NewUser } from './interface/userInterface';
import { DeleteUserModal } from './modal/DeleteUserModal';
import { EditUserModal } from './modal/EditUserModal';
import { editUser, changeUserStatus } from './services/userService';

export function UsersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 5,
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
}: UsersTableProps & { onRefresh: () => void }): React.JSX.Element {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<EditUser | null>(null);

  const rowIds = React.useMemo(() => rows.map((user) => user.recIdeunikeyReus.toString()), [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const estadoMap: Record<number, { label: string; color: string }> = {
    1: { label: 'Activo', color: 'green' },
    2: { label: 'Inactivo', color: 'orange' },
    3: { label: 'Eliminada', color: 'red' },
  };

  const handleOpenEditModal = (user: EditUser) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (user: EditUser) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleCloseModals = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  };

  const handleSaveUser = async (updatedUser: NewUser) => {
    try {
      await editUser(updatedUser);
      alert("Usuario actualizado con éxito.");
      handleCloseModals();
      onRefresh(); // Refrescar la lista de usuarios después de actualizar
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un problema al actualizar el usuario.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await changeUserStatus(userId);
      alert('Usuario eliminado con éxito.');
      handleCloseModals();
      onRefresh(); // Refrescar la lista de usuarios después de eliminar
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      alert('Hubo un problema al eliminar el usuario.');
    }
  };

  return (
    <div>
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" align="center">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        selectAll();
                      } else {
                        deselectAll();
                      }
                    }}
                  />
                </TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Dirección</TableCell>
                <TableCell align="center">Ciudad</TableCell>
                <TableCell align="center">Departamento</TableCell>
                <TableCell align="center">Teléfono</TableCell>
                <TableCell align="center">Fecha de nacimiento</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const isSelected = selected?.has(row.recIdeunikeyReus.toString());
                return (
                  <TableRow hover key={row.recIdeunikeyReus} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            selectOne(row.recIdeunikeyReus.toString());
                          } else {
                            deselectOne(row.recIdeunikeyReus.toString());
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <Avatar src={row.recImgvisReus} />
                        <Typography variant="subtitle2">{`${row.recNombreReus} ${row.recApelidReus}`}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">{row.apjCorreoApgm}</TableCell>
                    <TableCell align="center">{row.recDirresReus}</TableCell>
                    <TableCell align="center">{row.city?.sisNombreSimu || 'N/A'}</TableCell>
                    <TableCell align="center">{row.city?.sisNombreSidp || 'N/A'}</TableCell>
                    <TableCell align="center">{row.recTelefoReus}</TableCell>
                    <TableCell>{dayjs(row.recFecnacReus).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          color: estadoMap[row.recEstregReus]?.color || 'gray',
                          fontWeight: 'bold',
                        }}
                      >
                        {estadoMap[row.recEstregReus]?.label || 'Desconocido'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={() => handleOpenEditModal(row)}>
                          Modificar
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenDeleteModal(row)}
                          disabled={estadoMap[row.recEstregReus]?.label === 'Eliminada'}
                        >
                          Eliminar
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Divider />
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange || (() => {})}
          onRowsPerPageChange={onRowsPerPageChange || (() => {})}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      {/* Modales */}
      <EditUserModal
        open={openEditModal}
        onClose={handleCloseModals}
        user={selectedUser}
        onSave={handleSaveUser}
      />
      <DeleteUserModal
        open={openDeleteModal}
        onClose={handleCloseModals}
        user={selectedUser}
        onConfirm={() => handleDeleteUser(selectedUser?.recIdeunikeyReus!)}
      />
    </div>
  );
}