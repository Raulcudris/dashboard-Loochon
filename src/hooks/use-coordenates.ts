// src/hooks/useCoordenates.ts

import { useState } from 'react';
import { createCity, editCity, changeCityStatus, deleteCity } from '@/services';
import { NewCoordenate, EditCoordenate } from '@/interface';

export const useCoordenates = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedCoordenates, setSelectedCoordenates] = useState<EditCoordenate | null>(null);

  const openEditModal = (coordenate: EditCoordenate) => {
    setSelectedCoordenates(coordenate);
    setIsEditModalOpen(true);
  };

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

  const createCoordenate = async (coordenate: NewCoordenate) => {
    setLoading(true);
    setError(null);
    try {
      await createCity(coordenate);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al crear la coordenada:', err);
      setError('Error al crear la coordenada. Inténtelo de nuevo.');
      setLoading(false);
      return false;
    }
  };

  const editCoordenate = async (coordenate: EditCoordenate) => {
    setLoading(true);
    setError(null);
    try {
      await editCity(coordenate);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al editar la coordenada:', err);
      setError('Error al editar la coordenada. Inténtelo de nuevo.');
      setLoading(false);
      return false;
    }
  };

  const changeStatusCoordenate = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await changeCityStatus(id, "2");
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al inactivar la coordenada:', err);
      setError('Error al inactivar la coordenada.');
      setLoading(false);
      return false;
    }
  };

  const activateCoordenate = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await changeCityStatus(id, "1");
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al activar la coordenada:', err);
      setError('Error al activar la coordenada.');
      setLoading(false);
      return false;
    }
  };

  const permanentlyDeleteCoordenate = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCity(id);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al eliminar permanentemente la coordenada:', err);
      setError('Error al eliminar permanentemente la coordenada.');
      setLoading(false);
      return false;
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
