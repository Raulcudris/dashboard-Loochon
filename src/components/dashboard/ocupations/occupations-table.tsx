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
import { OccupationsTableProps } from '@/interface';
import { EditOccupationsModal } from './modals/EditOcupationsModal';
import { DeleteOccupationsModal } from './modals/DeleteOcupationsModal';

export function OccupationsTable({
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
  onEdit, // Función para editar
  onDelete, // Función para eliminar
}: OccupationsTableProps & {
  onRefresh: () => void;
  onEdit: (row: any) => void; // Función para manejar la edición
  onDelete: (row: any) => void; // Función para manejar la eliminación
}): React.JSX.Element {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [selectedOccupation, setSelectedOccupation] = React.useState<any>(null);

  const estadoMap: Record<string, { label: string; color: string }> = {
    1: { label: 'Activo', color: 'green' },
    2: { label: 'Inactivo', color: 'orange' },
    3: { label: 'Eliminada', color: 'red' },
  };

  const handleEditClick = (occupation: any) => {
    setSelectedOccupation(occupation);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (occupation: any) => {
    setSelectedOccupation(occupation);
    setOpenDeleteModal(true);
  };

  const handleCloseModals = () => {
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setSelectedOccupation(null);
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Clave</TableCell>
              <TableCell align="center">Categoría</TableCell>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Orden de visualización</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell align="center">{row.recIdentifikeyRcws}</TableCell>
                  <TableCell align="center">{row.recIdentifikeyRcwk}</TableCell>
                  <TableCell align="center">{row.recTitleworkRcws}</TableCell>
                  <TableCell align="center">{row.recDescrworkRcws}</TableCell>
                  <TableCell align="center">{row.recOrdviewkeyRcws}</TableCell>
                  <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{
                        color: estadoMap[row.recStatusregiRcws]?.color || 'gray', fontWeight: 'bold',}}>
                          {estadoMap[row.recStatusregiRcws]?.label || 'Desconocido'}
                       </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(row)} // Llama a la función de edición
                      >
                        Modificar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(row)} // Llama a la función de eliminación
                      >
                        Eliminar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
        labelRowsPerPage="Filas por página"
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Modal de edición */}
      {selectedOccupation && (
        <EditOccupationsModal
          open={openEditModal}
          onClose={handleCloseModals}
          occupation={selectedOccupation}
          onOccupationUpdated={onRefresh}
        />
      )}

      {/* Modal de eliminación */}
      {selectedOccupation && (
        <DeleteOccupationsModal
          open={openDeleteModal}
          onClose={handleCloseModals}
          occupation={selectedOccupation}
          onDeleteSuccess={onRefresh}
        />
      )}
    </Card>
  );
}
