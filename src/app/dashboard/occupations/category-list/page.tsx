'use client'; 

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import React, { useEffect, useState, useCallback } from 'react';
import { GetAllOccupations } from '@/services/index';
import { Occupations } from '@/interface/index';
import { OccupationsFilters } from '@/components/dashboard/ocupations/list-ocupations/occupations-filters';
import { OccupationsTable } from '@/components/dashboard/ocupations/list-ocupations/occupations-table';
import { AddOccupationsModal } from '@/components/dashboard/ocupations/list-ocupations/modals/AddOccupationsModal';

export default function Page(): React.JSX.Element {
  const [rows, setRows] = useState<Occupations[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filter, setFilter] = useState<string>('');

  // Estados para modales
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [, setOpenEditModal] = useState<boolean>(false);
  const [, setOpenDeleteModal] = useState<boolean>(false);
  const [, setSelectedOccupation] = useState<Occupations | null>(null);


  const fetchData = useCallback(async () => {
    try {
      const { occupations: fetchedOccupations } = await GetAllOccupations(page + 1);

      // Aplicar filtro y paginación
      const filteredOccupations = fetchedOccupations.filter((occupation) => {
        const title = occupation.recTitleworkRcws?.toLowerCase() || '';
        const clave = occupation.recIdentifikeyRcws?.toLowerCase() || '';
        const description = occupation.recDescrworkRcws?.toLowerCase() || '';
        const location = occupation.recKeylocationRcws?.toLowerCase() || '';
        const categoria = occupation.recIdentifikeyRcwk?.toLowerCase() || '';
        return (
          title.includes(filter.toLowerCase()) ||
          description.includes(filter.toLowerCase()) ||
          location.includes(filter.toLowerCase()) ||
          clave.includes(filter.toLowerCase()) ||
          categoria.includes(filter.toLowerCase())
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
  }, [page, rowsPerPage, filter]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Categorías ocupacionales</Typography>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => setOpenAddModal(true)}
          >
            Añadir
          </Button>
        </div>
      </Stack>

      <OccupationsFilters onFilterChange={(newFilter) => {
        setFilter(newFilter);
        setPage(0);
      }} />

      <OccupationsTable
        rows={rows}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        onRefresh={fetchData}
        onEdit={(occupation) => {
          setSelectedOccupation(occupation);
          setOpenEditModal(true);
        }}
        onDelete={(occupation) => {
          setSelectedOccupation(occupation);
          setOpenDeleteModal(true);
        }}
      />

      <AddOccupationsModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onOccupationAdded={fetchData}
      />
    </Stack>
  );
}
