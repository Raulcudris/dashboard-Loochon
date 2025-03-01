import { useState } from 'react';

export function useOccupations() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedOccupation, setSelectedOccupation] = useState<any>(null);

  const handleEditClick = (occupation: any) => {
    setSelectedOccupation(occupation);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (occupation: any) => {
    setSelectedOccupation(occupation);
    setOpenDeleteModal(true);
  };

  const handleCloseModals = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setSelectedOccupation(null);
  };

  return {
    openEditModal,
    openDeleteModal,
    selectedOccupation,
    handleEditClick,
    handleDeleteClick,
    handleCloseModals,
  };
}