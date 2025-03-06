'use client'; 

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react';
import React, { useEffect, useState, useCallback } from 'react';
import { CoordenatesFilters } from '@/components/dashboard/coordenates/coordenates-filters';
import { CoordenatesTable } from '@/components/dashboard/coordenates/coordenates-table';
import { GetAllCity } from '@/services/index';
import { NewCoordenate } from '@/interface/index';
import { AddCoordenatesModal } from '@/components/dashboard/coordenates/modals/AddCoordenatesModal';

export default function Page(): React.JSX.Element {
  const [coordenates, setCoordenates] = useState<NewCoordenate[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalCoordenates, setTotalCoordenates] = useState<number>(0);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);


  const fetchData = useCallback(async () => {
    try {
      const { coordenates: fetchedCoordenates, total } = await GetAllCity(
        page + 1,
        rowsPerPage,
        '170',
        filter
      );
      setCoordenates(fetchedCoordenates);
      setTotalCoordenates(total);
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
    }
  }, [page, rowsPerPage, filter]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Gestión de Ciudades y Municipios por Coordenadas</Typography>
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

      {/* Filtros */}
      <CoordenatesFilters onFilterChange={setFilter} />

      {/* Tabla */}
      <CoordenatesTable
        rows={coordenates}
        count={totalCoordenates}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        onRefresh={fetchData}
      />

      {/* Modal */}
      <AddCoordenatesModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onCoordenateAdded={fetchData}
      />
    </Stack>
  );
}
