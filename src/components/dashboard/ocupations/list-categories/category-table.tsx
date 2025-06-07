'use client';

import React from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { CategoryTableProps, Category } from '@/interface/occupations/categoryInterface';
import { useCategories } from '@/hooks/use-category';
import { EditCategoryModal } from './modals/EditCategoryModal';
import { DeleteCategoryModal } from './modals/DeleteCategoryModal';
import { ToggleCategoryModal } from './modals/ToggleCategoryModal';

export function CategoryTable({
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
}: CategoryTableProps): React.JSX.Element {
  const {
    isEditModalOpen,
    isDeleteModalOpen,
    selectedCategory,
    handleEditClick,
    handleDeleteClick,
    handleCloseModals,
  } = useCategories();

  const [isToggleModalOpen, setIsToggleModalOpen] = React.useState(false);
  const [toggleTarget, setToggleTarget] = React.useState<Category | null>(null);

  const estadoMap: Record<string, { label: string; color: string }> = {
    '1': { label: 'Activo', color: 'green' },
    '2': { label: 'Inactivo', color: 'orange' },
    '3': { label: 'Eliminada', color: 'red' },
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Codigo</TableCell>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Palabra Clave</TableCell>
              <TableCell align="center">Imagen</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => {
                const status = estadoMap[String(row.recStatusregiRcwk)] || { label: 'Desconocido', color: 'gray' };

                return (
                  <TableRow key={row.recIdentifikeyRcwk} hover>
                    <TableCell align="center">{row.recIdentifikeyRcwk}</TableCell>
                    <TableCell align="center">{row.recTitleworkRcwk}</TableCell>
                    <TableCell align="center">{row.recDescrworkRcwk}</TableCell>
                    <TableCell align="center">{row.recKeylocationRcwk}</TableCell>
                    <TableCell align="center">
                      {row.recImageviewRcwk ? (
                        <img src={row.recImageviewRcwk} alt="icon" width={40} />
                      ) : (
                        'Sin imagen'
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          color: status.color,
                          fontWeight: 'bold',
                        }}
                      >
                        {status.label}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleEditClick(row)}
                          disabled={status.label === 'Inactivo'}
                        >
                          Modificar
                        </Button>

                        <Button
                          variant="outlined"
                          color={status.label === 'Activo' ? 'error' : 'success'}
                          onClick={() => {
                            setToggleTarget(row);
                            setIsToggleModalOpen(true);
                          }}
                        >
                          {status.label === 'Activo' ? 'Inactivar' : 'Activar'}
                        </Button>

                        {status.label === 'Inactivo' && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteClick(row)}
                          >
                            Eliminar
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2">No hay categorías registradas.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      <Divider />

      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Filas por página"
        rowsPerPageOptions={[5, 10, 25, 35 ,50]}
      />

      {selectedCategory && (
        <EditCategoryModal
          open={isEditModalOpen}
          onClose={handleCloseModals}
          category={selectedCategory}
          onSave={onRefresh}
        />
      )}

      {selectedCategory && (
        <DeleteCategoryModal
          open={isDeleteModalOpen}
          onClose={handleCloseModals}
          category={selectedCategory}
          onDeleteSuccess={onRefresh}
        />
      )}

      {toggleTarget && (
        <ToggleCategoryModal
          open={isToggleModalOpen}
          onClose={() => {
            setToggleTarget(null);
            setIsToggleModalOpen(false);
          }}
          categoryId={toggleTarget.recPrimarykeyRcwk}
          categoryName={toggleTarget.recTitleworkRcwk}
          isActive={toggleTarget.recStatusregiRcwk === '1'}
          onToggleSuccess={() => {
            onRefresh();
            setToggleTarget(null);
            setIsToggleModalOpen(false);
          }}
        />
      )}
    </Card>
  );
}
