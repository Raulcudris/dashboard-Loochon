'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import React, { useEffect, useState, useCallback } from 'react';
import { getAllCategories } from '@/services/occupations/categoryService';
import { CategoryFilters } from '@/components/dashboard/ocupations/list-categories/category-filters';
import { CategoryTable } from '@/components/dashboard/ocupations/list-categories/category-table';
import { AddCategoryModal } from '@/components/dashboard/ocupations/list-categories/modals/AddCategoryModal';
import { Category } from '@/interface';

export default function Page(): React.JSX.Element {
  const [rows, setRows] = useState<Category[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [filter, setFilter] = useState<string>('');

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
      try {
        const { categories: fetchedCategories } = await getAllCategories(page + 1);
  
        // Aplicar filtro y paginación
        const filteredOccupations = fetchedCategories.filter((category) => {
          const title = category.recTitleworkRcwk?.toLowerCase() || '';
          const description = category.recDescrworkRcwk?.toLowerCase() || '';
          const categoria = category.recIdentifikeyRcwk?.toLowerCase() || '';
          return (
            title.includes(filter.toLowerCase()) ||
            description.includes(filter.toLowerCase()) ||
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

      <CategoryFilters
        onFilterChange={(newFilter) => {
          setFilter(newFilter);
          setPage(0);
        }}
      />

      <CategoryTable
        rows={rows}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        onRefresh={fetchData}
      />

      <AddCategoryModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onCategoryAdded={fetchData}
      />
    </Stack>
  );
}
