'use client';

import type { User } from '@/interface/index';
import { AddUserModal } from '@/components/dashboard/user/modals/AddUserModal';
import { GetAllUsers } from '@/services/index';
import { UsersFilters } from '@/components/dashboard/user/users-filters';
import { UsersTable } from '@/components/dashboard/user/users-table';
import { generateMetadata } from '@/utils/generateMetadata';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import React, { useEffect, useState } from 'react';

export const metaData = generateMetadata('Users');

export default function Page(): React.JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  // Carga y filtra la lista de usuarios
  const fetchData = async () => {
    try {
      const { users: fetchedUsers, total } = await GetAllUsers(page + 1);

      // Aplicar filtro
      const filteredUsers = fetchedUsers.filter(
        (user) =>
          user.recNombreReus.toLowerCase().includes(filter.toLowerCase()) ||
          user.apjCorreoApgm.toLowerCase().includes(filter.toLowerCase())
      );

      // Aplicar paginación
      const paginatedUsers = filteredUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setUsers(paginatedUsers); // Usuarios visibles en la página actual
      setTotalUsers(filteredUsers.length); // Total después del filtro
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  // Actualiza los datos al cambiar filtros, página o filas por página
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, filter]);

  // Maneja los cambios de filtro
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setPage(0); // Reinicia la página al aplicar un filtro
  };

  // Maneja el cambio de página
  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Maneja el cambio en el tamaño de las filas por página
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reinicia la página al cambiar el tamaño
  };

  // Abre el modal para añadir usuarios
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  // Cierra el modal para añadir usuarios
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  // Refresca la lista de usuarios después de añadir uno
  const handleUserAdded = async () => {
    await fetchData();
    handleCloseAddModal();
  };

  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Usuarios</Typography>
        </Stack>
        <div>
          <Button
            onClick={handleOpenAddModal}
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Añadir
          </Button>
        </div>
      </Stack>

      {/* Filtros */}
      <UsersFilters onFilterChange={handleFilterChange} />

      {/* Tabla de usuarios */}
      <UsersTable
        count={totalUsers}
        page={page}
        rows={users}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onRefresh={fetchData} // Refrescar lista al editar o eliminar usuarios
      />

      {/* Modal para añadir un usuario */}
      <AddUserModal
        open={openAddModal}
        onClose={handleCloseAddModal}
        onUserAdded={handleUserAdded}
      />
    </Stack>
  );
}
