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
  const [statusFilter, setStatusFilter] = useState<'ALL' | '1' | '2'>('ALL');
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
      try {
        const rawFilter =
         statusFilter === 'ALL'
           ? filter.trim()
           : filter.trim()
            ? `${filter.trim()}|${statusFilter}`
            : `|${statusFilter}`;

        const { categories: fetchedCategories, total } = await getAllCategories(
        page + 1,
        rowsPerPage,
        "SEARCH",
        rawFilter,      // 🔁 Aquí pasamos el filtro combinado
        "ALL"           // 🔁 Ya no usamos el filtro de estado separado
        );
        setRows(fetchedCategories);
        setCount(total); // total de backend
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    }, [page, rowsPerPage, filter, statusFilter]);

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
        onStatusChange={(newStatus) => {
          setStatusFilter(newStatus);
          setPage(0);
        }}
        currentStatus={statusFilter}
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
