import { useState } from 'react';
import { Occupations } from '@/interface'; 

export function useOccupations() {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedOccupation, setSelectedOccupation] = useState<Occupations | null>(null); 

  const handleEditClick = (occupation: Occupations) => {
    setSelectedOccupation(occupation);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (occupation: Occupations) => { 
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
