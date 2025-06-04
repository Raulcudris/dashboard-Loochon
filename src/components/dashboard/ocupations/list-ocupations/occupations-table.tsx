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

import { OccupationsTableProps, Occupations } from '@/interface';
import { useOccupations } from '@/hooks/use-occupations';
import { EditOccupationsModal } from './modals/EditOccupationsModal';
import { DeleteOccupationsModal } from './modals/DeleteOccupationsModal';
import { ToggleOccupationsModal } from './modals/ToggleOccupationsModal';

export function OccupationsTable({
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
}: OccupationsTableProps): React.JSX.Element {
  const {
    openEditModal,
    openDeleteModal,
    selectedOccupation,
    handleEditClick,
    handleDeleteClick,
    handleCloseModals,
  } = useOccupations();

  const [isToggleModalOpen, setIsToggleModalOpen] = React.useState(false);
  const [toggleTarget, setToggleTarget] = React.useState<Occupations | null>(null);

  const estadoMap: Record<string, { label: string; color: string }> = {
    '1': { label: 'Activo', color: 'green' },
    '2': { label: 'Inactivo', color: 'orange' },
    '3': { label: 'Eliminada', color: 'red' },
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Clave</TableCell>
              <TableCell align="center">Categoría</TableCell>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Orden</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => {
                const status = estadoMap[row.recStatusregiRcws] ?? {
                  label: 'Desconocido',
                  color: 'gray',
                };

                const isEliminada = status.label === 'Eliminada';
                const isActivo = row.recStatusregiRcws === '1';
                const isInactivo = row.recStatusregiRcws === '2';

                return (
                  <TableRow key={row.recIdentifikeyRcws} hover>
                    <TableCell align="center">{row.recIdentifikeyRcws}</TableCell>
                    <TableCell align="center">{row.recIdentifikeyRcwk}</TableCell>
                    <TableCell align="center">{row.recTitleworkRcws}</TableCell>
                    <TableCell align="center">{row.recDescrworkRcws}</TableCell>
                    <TableCell align="center">{row.recOrdviewkeyRcws}</TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{ color: status.color, fontWeight: 'bold' }}
                      >
                        {status.label}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleEditClick(row)}
                          disabled={isEliminada}
                        >
                          Modificar
                        </Button>

                        <Button
                          variant="outlined"
                          color={isActivo ? 'error' : 'success'}
                          onClick={() => {
                            setToggleTarget(row);
                            setIsToggleModalOpen(true);
                          }}
                          disabled={isEliminada}
                        >
                          {isActivo ? 'Inactivar' : 'Activar'}
                        </Button>

                        {isInactivo && (
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
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2">No hay ocupaciones registradas.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      <Divider />

      {/* Paginación */}
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Filas por página"
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Modales */}
      {selectedOccupation && (
        <>
          <EditOccupationsModal
            open={openEditModal}
            onClose={handleCloseModals}
            occupation={selectedOccupation}
            onSave={onRefresh}
          />
          <DeleteOccupationsModal
            open={openDeleteModal}
            onClose={handleCloseModals}
            occupation={selectedOccupation}
            onDeleteSuccess={onRefresh}
          />
        </>
      )}

      {toggleTarget && (
        <ToggleOccupationsModal
          open={isToggleModalOpen}
          onClose={() => {
            setToggleTarget(null);
            setIsToggleModalOpen(false);
          }}
          occupationId={toggleTarget.recPrimarykeyRcws}
          occupationTitle={toggleTarget.recTitleworkRcws}
          isActive={toggleTarget.recStatusregiRcws === '1'}
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
