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
import { Coordenate } from '@/interface/index';

export const metaData = generateMetadata('coordenates');

export default function Page(): React.JSX.Element {
  const [rows, setRows] = useState<Coordenate[]>([]); // Lista de coordenadas a mostrar en la tabla
  const [count, setCount] = useState<number>(0); // Total de coordenadas (para paginación)
  const [page, setPage] = useState<number>(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Filas por página
  const [filter, setFilter] = useState<string>(''); // Filtro aplicado

    // Carga y filtra la lista de servicios
  const fetchData = async () => {
    try {
      const { coordenates, total } = await GetAllCity(page + 1, rowsPerPage, '170', filter);
      setRows(coordenates); // Asignar los datos obtenidos
      setCount(total); // Total de registros
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
    }
  };

  // Actualiza los datos al cambiar filtros, página o filas por página
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, filter]);

  // Maneja los cambios de filtro
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setPage(0); // Reinicia la página al aplicar un filtro
  };

  // Maneja el cambio de página
  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Maneja el cambio en el tamaño de las filas por página
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reinicia la página al cambiar el tamaño
  };

  // Forzar la recarga de datos
  const handleRefresh = () => {
    fetchData();
  };

  return (
    <Stack spacing={3}>
      {/* Encabezado */}
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Ciudades y municipios</Typography>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Añadir
          </Button>
        </div>
      </Stack>
      {/* Filtros */}
      <CoordenatesFilters onFilterChange={handleFilterChange}  />     
      {/* Tabla de coordenadas */}
      <CoordenatesTable
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
