import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/interface/index';
import { GetAllUsers } from '@/services/index';

export function useUser() {
  // Estados para la lista de usuarios, paginación y filtros
  const [users, setUsers] = React.useState<User[]>([]);
  const [filter, setFilter] = React.useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para los modales
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Función para cargar los usuarios
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

  // Cargar datos al cambiar página, filas por página o filtro
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Función para manejar cambios en el filtro
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
    setPage(0);
  }, []);

  // Función para manejar cambios de página
  const handlePageChange = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  // Función para manejar cambios en las filas por página
  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  // Función para manejar el clic en "Editar"
  const handleEditClick = useCallback((user: User) => {
    setSelectedUser(user); // Guardar el usuario seleccionado
    setOpenEditModal(true); // Abrir el modal de edición
  }, []);

  // Función para manejar el clic en "Eliminar"
  const handleDeleteClick = useCallback((user: User) => {
    setSelectedUser(user); // Guardar el usuario seleccionado
    setOpenDeleteModal(true); // Abrir el modal de eliminación
  }, []);

  // Función para cerrar todos los modales
  const handleCloseModals = useCallback(() => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setSelectedUser(null); // Limpiar el usuario seleccionado
  }, []);

  return {
    // Estados y funciones para la lista de usuarios
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

    // Estados y funciones para los modales
    openEditModal,
    openDeleteModal,
    selectedUser,
    handleEditClick,
    handleDeleteClick,
    handleCloseModals,
  };
}