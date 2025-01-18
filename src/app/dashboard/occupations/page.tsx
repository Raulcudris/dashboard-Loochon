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

export const metaData = generateMetadata('Occupations');

export default function Page(): React.JSX.Element {
  const [rows, setRows] = useState<Occupations[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filter, setFilter] = useState<string>('');

  const fetchData = async () => {
    try {
      const { occupations: fetchedOccupations } = await GetAllOccupations(page + 1, rowsPerPage);
  
      // Aplicar filtro
      const filteredOccupations = fetchedOccupations.filter(
        (occupation) =>
          occupation.recTitleworkRcwk.toLowerCase().includes(filter.toLowerCase()) ||
          occupation.recDescrworkRcwk.toLowerCase().includes(filter.toLowerCase()) ||
          occupation.recKeylocationRcwk.toLowerCase().includes(filter.toLowerCase())
      );
  
      // Aplicar paginación
      const paginatedOccupations = filteredOccupations.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
  
      setRows(paginatedOccupations); // Ocupaciones visibles en la página actual
      setCount(filteredOccupations.length); // Total después del filtro
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

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Ocupaciones</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
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
      />
    </Stack>
  );
}
