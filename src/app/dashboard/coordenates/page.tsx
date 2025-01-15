'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import React, { useEffect, useState } from 'react';
import { config } from '@/config/config';
import { CoordenatesFilters } from '@/components/dashboard/coordenates/coordenates-filters';
import { CoordenatesTable } from '@/components/dashboard/coordenates/coordenates-table';
import { generateMetadata } from '@/utils/generateMetadata';

export const metaData = generateMetadata('Coordenates');

export default function Page(): React.JSX.Element {
  const [rows, setRows] = useState<any[]>([]); // Ajusta el tipo según tu estructura de datos
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    // Simulación de datos; reemplázala con tu lógica de llamada al backend
    const data = Array.from({ length: 50 }, (_, index) => ({
      field1: `Value1-${index + 1}`,
      field2: `Value2-${index + 1}`,
      field3: `Value3-${index + 1}`,
      field4: `Value4-${index + 1}`,
      field5: `Value5-${index + 1}`,
      field6: `Value6-${index + 1}`,
      field7: `Value7-${index + 1}`,
      field8: `Value8-${index + 1}`,
      field9: `Value9-${index + 1}`,
    }));
    setRows(data.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
    setCount(data.length);
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

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
          <Typography variant="h4">Coordenadas</Typography>
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
      <CoordenatesFilters />
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
