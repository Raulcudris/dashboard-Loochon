'use client';
import React, { useState } from 'react';
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
import { CoordenatesTableProps, EditCoordenate } from '@/interface';
import { EditCoordenatesModal } from './modals/EditCoordenatesModal';
import { DeleteCoordenatesModal } from './modals/DeleteCoordenatesModal';

export function CoordenatesTable({
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
}: CoordenatesTableProps & { onRefresh: () => void }): React.JSX.Element {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCoordenate, setSelectedCoordenate] = useState<EditCoordenate | null>(null);

  const estadoMap: Record<string, { label: string; color: string }> = {
    1: { label: 'Activo', color: 'green' },
    2: { label: 'Inactivo', color: 'orange' },
    3: { label: 'Eliminada', color: 'red' },
  };

  const handleOpenEditModal = (coordenate: EditCoordenate) => {
    setSelectedCoordenate(coordenate);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (coordenate: EditCoordenate) => {
    setSelectedCoordenate(coordenate);
    setOpenDeleteModal(true);
  };

  const handleCloseModals = () => {
    setSelectedCoordenate(null);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" align="center"></TableCell>
              <TableCell align="center">Código Provincia</TableCell>
              <TableCell align="center">Código Municipio</TableCell>
              <TableCell align="center">Código Departamento</TableCell>
              <TableCell align="center">Código País</TableCell>
              <TableCell align="center">Nombre de la Provincia</TableCell>
              <TableCell align="center">Código Postal</TableCell>
              <TableCell align="center">Indicador de Capital</TableCell>
              <TableCell align="center">Latitud Geográfica</TableCell>
              <TableCell align="center">Longitud Geográfica</TableCell>
              <TableCell align="center">Código Departamento</TableCell>
              <TableCell align="center">Nombre Departamento</TableCell>
              <TableCell align="center">Código Municipio</TableCell>
              <TableCell align="center">Nombre Municipio</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell align="center">{row.sisCodproSipr}</TableCell>
                  <TableCell align="center">{row.sisCodmunSimu}</TableCell>
                  <TableCell align="center">{row.sisIdedptSidp}</TableCell>
                  <TableCell align="center">{row.sisCodpaiSipa}</TableCell>
                  <TableCell align="center">{row.sisNombreSipr}</TableCell>
                  <TableCell align="center">{row.sisCodposSipr}</TableCell>
                  <TableCell align="center">{row.sisProclaSipr}</TableCell>
                  <TableCell align="center">{row.sisGeolatSipr}</TableCell>
                  <TableCell align="center">{row.sisGeolonSipr}</TableCell>
                  <TableCell align="center">{row.state?.sisCoddptSidp}</TableCell>
                  <TableCell align="center">{row.state?.sisNombreSidp}</TableCell>
                  <TableCell align="center">{row.city?.sisIdemunSimu}</TableCell>
                  <TableCell align="center">{row.city?.sisNombreSimu}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenEditModal(row)}
                      >
                        Modificar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpenDeleteModal(row)}
                        disabled={estadoMap[row.sisEstregSipr]?.label === 'Eliminada'}
                      >
                        Eliminar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={15} align="center">
                  <Typography variant="body2">No hay datos disponibles.</Typography>
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
        labelRowsPerPage="Ciudades y municipios por página"
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <EditCoordenatesModal
        open={openEditModal}
        onClose={handleCloseModals}
        coordenate={selectedCoordenate}
        onSave={onRefresh}
      />
      <DeleteCoordenatesModal
        open={openDeleteModal}
        onClose={handleCloseModals}
        coordenateId={selectedCoordenate?.sisCodproSipr || null}
        coordenateName={selectedCoordenate?.sisNombreSipr}
        onDeleteSuccess={onRefresh}
      />
    </Card>
  );
}
