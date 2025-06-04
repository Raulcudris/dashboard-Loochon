// src/hooks/use-category.ts

import { useState } from 'react';
import {
  createCategory,
  editCategory,
  changeCategoryStatus,
  deleteCategory,
} from '@/services';
import { NewCategory, EditCategory } from '@/interface';

export const useCategories = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<EditCategory | null>(null);

  const openEditModal = (category: EditCategory) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category: EditCategory) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (category: EditCategory) => openEditModal(category);
  const handleDeleteClick = (category: EditCategory) => openDeleteModal(category);

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const createNewCategory = async (category: NewCategory) => {
    setLoading(true);
    setError(null);
    try {
      await createCategory(category);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al crear la categoría:', err);
      setError('Error al crear la categoría. Inténtelo de nuevo.');
      setLoading(false);
      return false;
    }
  };

  const editCategoryData = async (category: EditCategory) => {
    setLoading(true);
    setError(null);
    try {
      await editCategory(category);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al editar la categoría:', err);
      setError('Error al editar la categoría. Inténtelo de nuevo.');
      setLoading(false);
      return false;
    }
  };

  const deactivateCategory = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await changeCategoryStatus(id, '2');
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al inactivar la categoría:', err);
      setError('Error al inactivar la categoría.');
      setLoading(false);
      return false;
    }
  };

  const activateCategory = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await changeCategoryStatus(id, '1');
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al activar la categoría:', err);
      setError('Error al activar la categoría.');
      setLoading(false);
      return false;
    }
  };

  const permanentlyDeleteCategory = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(id);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error al eliminar la categoría:', err);
      setError('Error al eliminar la categoría.');
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    error,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedCategory,
    openEditModal,
    openDeleteModal,
    handleEditClick,
    handleDeleteClick,
    handleCloseModals,
    createNewCategory,
    editCategoryData,
    deactivateCategory,
    activateCategory,
    permanentlyDeleteCategory,
  };
};
