'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import React, { useEffect, useState } from 'react';
import { generateMetadata } from '@/utils/generateMetadata';
import { GetAllOccupations } from '@/services/index';
import { Occupations } from '@/interface/index';
import { OccupationsFilters } from '@/components/dashboard/ocupations/occupations-filters';
import { OccupationsTable } from '@/components/dashboard/ocupations/occupations-table';
import { AddOccupationsModal } from '@/components/dashboard/ocupations/modals/AddOcupationsModal';
import { EditOccupationsModal } from '@/components/dashboard/ocupations/modals/EditOcupationsModal';
import { DeleteOccupationsModal } from '@/components/dashboard/ocupations/modals/DeleteOcupationsModal';

export const metaData = generateMetadata('Occupations');

export default function Page(): React.JSX.Element {
  const [rows, setRows] = useState<Occupations[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filter, setFilter] = useState<string>('');

  // Estados para modales
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedOccupation, setSelectedOccupation] = useState<Occupations | null>(null);

  // Función para obtener datos
  const fetchData = async () => {
    try {
      const { occupations: fetchedOccupations } = await GetAllOccupations(page + 1);

      // Aplicar filtro y paginación
      const filteredOccupations = fetchedOccupations.filter((occupation) => {
        const title = occupation.recTitleworkRcws?.toLowerCase() || '';
        const description = occupation.recDescrworkRcws?.toLowerCase() || '';
        const location = occupation.recKeylocationRcws?.toLowerCase() || '';
        return (
          title.includes(filter.toLowerCase()) ||
          description.includes(filter.toLowerCase()) ||
          location.includes(filter.toLowerCase())
        );
      });

      const paginatedOccupations = filteredOccupations.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setRows(paginatedOccupations);
      setCount(filteredOccupations.length);
    } catch (error) {
      console.error('Error al cargar ocupaciones:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, filter]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setPage(0);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleAdd = () => {
    setOpenAddModal(true);
  };

  const handleEdit = (occupation: Occupations) => {
    setSelectedOccupation(occupation);
    setOpenEditModal(true);
  };

  const handleDelete = (occupation: Occupations) => {
    setSelectedOccupation(occupation);
    setOpenDeleteModal(true);
  };

  const handleCloseModals = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setSelectedOccupation(null);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Ocupaciones</Typography>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={handleAdd}
          >
            Añadir
          </Button>
        </div>
      </Stack>
      <OccupationsFilters onFilterChange={handleFilterChange} />
      <OccupationsTable
        rows={rows}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onRefresh={handleRefresh}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddOccupationsModal
        open={openAddModal}
        onClose={handleCloseModals}
        onOccupationAdded={handleRefresh}
      />      
    </Stack>
  );
}
