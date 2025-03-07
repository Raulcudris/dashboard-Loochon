import React from 'react';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import dayjs from 'dayjs';
import { EditUserModal } from './modals/EditUserModal';
import { DeleteUserModal } from './modals/DeleteUserModal';
import { UsersTableProps } from '@/interface';
import { useUser } from '@/hooks'; 

export function UsersTable({
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
}: UsersTableProps & { onRefresh: () => void }): React.JSX.Element {
  // Usar el hook useUser para manejar modales y usuarios seleccionados
  const {
    openEditModal,
    openDeleteModal,
    selectedUser,
    handleEditClick,
    handleDeleteClick,
    handleCloseModals,
  } = useUser();

  // Mapeo de estados para mostrar el estado del usuario con colores y etiquetas
  const estadoMap: Record<number, { label: string; color: string }> = {
    1: { label: 'Activo', color: 'green' },
    2: { label: 'Inactivo', color: 'orange' },
    3: { label: 'Eliminada', color: 'red' },
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
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
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.recIdeunikeyReus} hover>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar src={row.recImgvisReus} />
                      <Typography variant="subtitle2">
                        {`${row.recNombreReus} ${row.recApelidReus}`}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">{row.apjCorreoApgm}</TableCell>
                  <TableCell align="center">{row.recDirresReus}</TableCell>
                  <TableCell align="center">{row.city?.sisNombreSimu || 'N/A'}</TableCell>
                  <TableCell align="center">{row.city?.sisNombreSidp || 'N/A'}</TableCell>
                  <TableCell align="center">{row.recTelefoReus}</TableCell>
                  <TableCell align="center">
                    {dayjs(row.recFecnacReus).format('DD/MM/YYYY')}
                  </TableCell>
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
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(row)}
                      >
                        Modificar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(row)}
                        disabled={estadoMap[row.recEstregReus]?.label === 'Eliminada'}
                      >
                        Inactivar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={15} align="center">
                  <Typography variant="body2">No hay datos disponibles.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        labelRowsPerPage="Usuarios por páginas"
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Modales */}
      <EditUserModal
        open={openEditModal}
        onClose={handleCloseModals}
        user={selectedUser}
        onSave={() => {
          onRefresh(); // Refrescar la lista de usuarios
          handleCloseModals(); // Cerrar el modal
        }}
      />
      <DeleteUserModal
        open={openDeleteModal}
        onClose={handleCloseModals}
        user={selectedUser}
        onConfirm={() => {
          onRefresh(); // Refrescar la lista de usuarios
          handleCloseModals(); // Cerrar el modal
        }}
      />
    </Card>
  );
}