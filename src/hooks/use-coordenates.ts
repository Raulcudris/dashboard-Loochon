// src/hooks/use-coordenates.ts

import { useState } from 'react';
import {
  createCity,
  editCity,
  changeCityStatus,
  deleteCity,
} from '@/services';
import {
  NewCoordenate,
  EditCoordenate,
} from '@/interface';

export const useCoordenates = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedCoordenates, setSelectedCoordenates] = useState<EditCoordenate | null>(null);

  // Abrir modal de edición
  const openEditModal = (coordenate: EditCoordenate) => {
    setSelectedCoordenates(coordenate);
    setIsEditModalOpen(true);
  };

  // Abrir modal de eliminación
  const openDeleteModal = (coordenate: EditCoordenate) => {
    setSelectedCoordenates(coordenate);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (coordenate: EditCoordenate) => openEditModal(coordenate);
  const handleDeleteClick = (coordenate: EditCoordenate) => openDeleteModal(coordenate);

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedCoordenates(null);
  };

  // Crear nueva coordenada
  const createCoordenate = async (coordenate: NewCoordenate) => {
    setLoading(true);
    setError(null);
    try {
      await createCity(coordenate);
      return true;
    } catch (err) {
      console.error('Error al crear la coordenada:', err);
      setError('Error al crear la coordenada. Inténtalo de nuevo.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Editar coordenada existente
  const editCoordenate = async (coordenate: EditCoordenate) => {
    setLoading(true);
    setError(null);
    try {
      await editCity(coordenate);
      return true;
    } catch (err) {
      console.error('Error al editar la coordenada:', err);
      setError('Error al editar la coordenada. Inténtalo de nuevo.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado a inactivo
  const changeStatusCoordenate = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await changeCityStatus(id, '2');
      return true;
    } catch (err) {
      console.error('Error al inactivar la coordenada:', err);
      setError('Error al inactivar la coordenada.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Activar coordenada
  const activateCoordenate = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await changeCityStatus(id, '1');
      return true;
    } catch (err) {
      console.error('Error al activar la coordenada:', err);
      setError('Error al activar la coordenada.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar definitivamente
  const permanentlyDeleteCoordenate = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCity(id);
      return true;
    } catch (err) {
      console.error('Error al eliminar permanentemente la coordenada:', err);
      setError('Error al eliminar permanentemente la coordenada.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedCoordenates,
    openEditModal,
    openDeleteModal,
    handleEditClick,
    handleDeleteClick,
    handleCloseModals,
    createCoordenate,
    editCoordenate,
    changeStatusCoordenate,
    activateCoordenate,
    permanentlyDeleteCoordenate,
  };
};
