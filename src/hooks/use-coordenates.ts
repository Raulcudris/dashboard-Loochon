import { useState } from 'react';
import { createCity, editCity, changeCityStatus } from '@/services'; // Importa tus servicios
import { NewCoordenate, EditCoordenate } from '@/interface'; // Importa tus interfaces

export const useCoordenates = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Estado para manejar la apertura/cierre de los modales
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  // Estado para almacenar la coordenada seleccionada
  const [selectedCoordenates, setSelectedCoordenates] = useState<EditCoordenate | null>(null);

  // Función para abrir el modal de edición
  const openEditModal = (coordenate: EditCoordenate) => {
    setSelectedCoordenates(coordenate);
    setIsEditModalOpen(true);
  };

  // Función para abrir el modal de eliminación
  const openDeleteModal = (coordenate: EditCoordenate) => {
    setSelectedCoordenates(coordenate);
    setIsDeleteModalOpen(true);
  };

  // Función para manejar el clic en "Editar"
  const handleEditClick = (coordenate: EditCoordenate) => {
    openEditModal(coordenate);
  };

  // Función para manejar el clic en "Eliminar"
  const handleDeleteClick = (coordenate: EditCoordenate) => {
    openDeleteModal(coordenate);
  };

  // Función para cerrar todos los modales
  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedCoordenates(null); // Limpiar la coordenada seleccionada
  };

  // Función para crear una nueva coordenada
  const createCoordenate = async (coordenate: NewCoordenate) => {
    setLoading(true);
    setError(null);
    try {
      await createCity(coordenate);
      setLoading(false);
      return true; // Indica que la creación fue exitosa
    } catch (err) {
      console.error('Error al crear la coordenada:', err);
      setError('Error al crear la coordenada. Inténtelo de nuevo.');
      setLoading(false);
      return false; // Indica que hubo un error
    }
  };

  // Función para editar una coordenada existente
  const editCoordenate = async (coordenate: EditCoordenate) => {
    setLoading(true);
    setError(null);
    try {
      await editCity(coordenate);
      setLoading(false);
      return true; // Indica que la edición fue exitosa
    } catch (err) {
      console.error('Error al editar la coordenada:', err);
      setError('Error al editar la coordenada. Inténtelo de nuevo.');
      setLoading(false);
      return false; // Indica que hubo un error
    }
  };

  // Función para eliminar una coordenada (cambiar su estado)
  const deleteCoordenate = async (coordenateId:number ) => {
    setLoading(true);
    setError(null);
    try {
      await changeCityStatus(coordenateId, "2");
      setLoading(false);
      return true; // Indica que la eliminación fue exitosa
    } catch (err) {
      console.error('Error al eliminar la coordenada:', err);
      setError('Error al eliminar la coordenada. Inténtelo de nuevo.');
      setLoading(false);
      return false; // Indica que hubo un error
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
    deleteCoordenate,
  };
};