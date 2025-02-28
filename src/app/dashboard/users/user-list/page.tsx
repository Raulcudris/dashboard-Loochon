// components/dashboard/user/UsersPage.tsx
'use client';

import { Stack, Typography, Button } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { UsersFilters } from '@/components/dashboard/user/users-filters';
import { UsersTable } from '@/components/dashboard/user/users-table';
import { AddUserModal } from '@/components/dashboard/user/modals/AddUserModal';
import { useUsers } from '@/hooks/use-user';
import { useState } from 'react';

export default function UsersPage(): React.JSX.Element {
  const {
    users,
    totalUsers,
    page,
    rowsPerPage,
    loading,
    error,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    refreshData,
  } = useUsers();

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleUserAdded = async () => {
    await refreshData();
    handleCloseAddModal();
  };

  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Listado de Usuarios</Typography>
          {error && <Typography color="error">{error}</Typography>}
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
        rows={users}
        count={totalUsers}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onRefresh={refreshData}
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