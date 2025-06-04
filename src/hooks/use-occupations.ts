// src/hooks/use-occupations.ts

import { useState } from 'react';
import {
  createOccupation,
  editOccupation,
  deleteOccupation,
  changeOccupationStatus,
} from '@/services/occupations/occupationsService';

import {
  EditOccupations,
  NewOccupations,
  Occupations,
} from '@/interface';

export const useOccupations = () => {
  // Estados de control
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedOccupation, setSelectedOccupation] = useState<Occupations | null>(null);

  // Abrir modal editar
  const handleEditClick = (occupation: Occupations) => {
    setSelectedOccupation(occupation);
    setOpenEditModal(true);
  };

  // Abrir modal eliminar
  const handleDeleteClick = (occupation: Occupations) => {
    setSelectedOccupation(occupation);
    setOpenDeleteModal(true);
  };

  // Cerrar modales
  const handleCloseModals = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setSelectedOccupation(null);
  };

  // Crear
  const createNewOccupation = async (occupation: NewOccupations) => {
    setLoading(true);
    setError(null);
    try {
      await createOccupation(occupation);
      return true;
    } catch (err) {
      console.error('Error al crear la ocupación:', err);
      setError('Error al crear la ocupación.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Editar
  const editOccupationData = async (occupation: EditOccupations) => {
    setLoading(true);
    setError(null);
    try {
      await editOccupation(occupation);
      return true;
    } catch (err) {
      console.error('Error al editar la ocupación:', err);
      setError('Error al editar la ocupación.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado (activar/inactivar)
  const toggleOccupationStatus = async (id: number, newStatus: '1' | '2') => {
    setLoading(true);
    setError(null);
    try {
      await changeOccupationStatus(id, newStatus);
      return true;
    } catch (err) {
      console.error('Error al cambiar estado de la ocupación:', err);
      setError('Error al cambiar el estado.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar
  const deleteOccupationPermanent = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteOccupation(id);
      return true;
    } catch (err) {
      console.error('Error al eliminar la ocupación:', err);
      setError('Error al eliminar la ocupación.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estados
    loading,
    error,
    selectedOccupation,

    // Modales
    openEditModal,
    openDeleteModal,
    handleEditClick,
    handleDeleteClick,
    handleCloseModals,

    // Acciones
    createNewOccupation,
    editOccupationData,
    toggleOccupationStatus,
    deleteOccupationPermanent,
  };
};
