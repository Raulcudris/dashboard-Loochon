'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import React, { useEffect, useState } from 'react';
import { CoordenatesFilters } from '@/components/dashboard/coordenates/coordenates-filters';
import { CoordenatesTable } from '@/components/dashboard/coordenates/coordenates-table';
import { generateMetadata } from '@/utils/generateMetadata';
import { GetAllCity } from '@/services/index';
import { NewCoordenate } from '@/interface/index';
import { AddCoordenatesModal } from '@/components/dashboard/coordenates/modals/AddCoordenatesModal';

export const metaData = generateMetadata('coordenates');

export default function Page(): React.JSX.Element {
  const [coordenates, setCoordenates] = useState<NewCoordenate[]>([]); // Lista de coordenadas
  const [filter, setFilter] = useState<string>(''); // Filtro aplicado
  const [page, setPage] = useState<number>(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Filas por página
  const [totalCoordenates, setTotalCoordenates] = useState<number>(0); // Total de coordenadas
  const [openAddModal, setOpenAddModal] = useState<boolean>(false); // Controla el modal de añadir

  // Función para cargar los datos de las coordenadas con filtros y paginación
  const fetchData = async () => {
    try {
      const { coordenates: fetchedCoordenates, total } = await GetAllCity(
        page + 1,
        rowsPerPage,
        '170',
        filter
      );
      setCoordenates(fetchedCoordenates); // Asignar los datos obtenidos
      setTotalCoordenates(total); // Total de registros
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
    }
  };

  // Actualizar los datos cuando cambien los filtros, la página o las filas por página
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, filter]);

  // Manejar los cambios en el filtro
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setPage(0); // Reiniciar a la primera página al cambiar el filtro
  };

  // Manejar los cambios de página
  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Manejar los cambios en el tamaño de las filas por página
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reiniciar a la primera página al cambiar el tamaño
  };

  // Abre el modal para añadir usuarios
   const handleOpenAddModal = () => {
      setOpenAddModal(true);
  };
  
  // Cierra el modal para añadir usuarios
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  // Recargar los datos
  const handleRefresh = () => {
    fetchData();
  };

  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Ciudades y Municipios</Typography>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={handleOpenAddModal}          >
            Añadir
          </Button>
        </div>
      </Stack>
      {/* Filtros */}
      <CoordenatesFilters onFilterChange={handleFilterChange} />
      {/* Tabla de coordenadas */}
      <CoordenatesTable
        rows={coordenates}
        count={totalCoordenates}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onRefresh={handleRefresh}
      />
       {/* Modal para añadir un usuario */}
      <AddCoordenatesModal
        open = { openAddModal }
        onClose={handleCloseAddModal}
        onCoordenateAdded={ handleRefresh}
      />
    </Stack>
  );
}
