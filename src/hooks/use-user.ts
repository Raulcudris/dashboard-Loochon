import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/interface/index';
import { GetAllUsers } from '@/services/index';

import type { UserContextValue } from '@/contexts/user-context';
import { UserContext } from '@/contexts/user-context';

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export function useUsers() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [filter, setFilter] = React.useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
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
      setUsers(paginatedUsers);
      setTotalUsers(filteredUsers.length);
    } catch (err) {
      setError('Error al cargar usuarios. Inténtalo de nuevo más tarde.');
      console.error('Error al cargar usuarios:', err);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
    setPage(0);
  }, []);

  const handlePageChange = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  return {
    users,
    totalUsers,
    page,
    rowsPerPage,
    loading,
    error,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    refreshData: fetchData,
  };
}

