'use client';

import type { User } from '@/components/dashboard/user/interface/userInterface';
import { GetAllUsers } from '@/components/dashboard/user/services/userService';
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
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const loadUsers = async () => {
      const { users: getallUsers, total } = await GetAllUsers(page + 1); // Ajuste para la paginación de 1-based index del API
      const filteredUsers = getallUsers.filter((user) =>
        user.recNombreReus.toLowerCase().includes(filter.toLowerCase()) ||
        user.apjCorreoApgm.toLowerCase().includes(filter.toLowerCase())
      );
      setUsers(filteredUsers);
      setTotalUsers(total);
    };
    loadUsers();
  }, [page, rowsPerPage, filter]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setPage(0); // Reiniciar la paginación al aplicar un nuevo filtro
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reiniciar la paginación al cambiar la cantidad de filas
  };


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Usuarios</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
                  variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <UsersFilters onFilterChange={handleFilterChange} />
      <UsersTable
        count={totalUsers}
        page={page}
        rows={users}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Stack>
  );
}
