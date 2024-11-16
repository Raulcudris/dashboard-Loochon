'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import * as React from 'react';

import { useSelection } from '@/hooks/use-selection';
import { UsersTableProps } from './interface/userInterface';
import { deleteUser } from './services/userService';

export function UsersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 5,
  onPageChange,
  onRowsPerPageChange,
}: UsersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => rows.map((user) => user.recIdeunikeyReus.toString()), [rows]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;


  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      console.log(`Usuario con ID ${userId} eliminado`);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <>
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        selectAll();
                      } else {
                        deselectAll();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Localización</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Fecha de nacimiento</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const isSelected = selected?.has(row.recIdeunikeyReus.toString());

                return (
                  <TableRow hover key={row.recIdeunikeyReus} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            selectOne(row.recIdeunikeyReus.toString());
                          } else {
                            deselectOne(row.recIdeunikeyReus.toString());
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <Avatar src={row.recImgvisReus} />
                        <Typography variant="subtitle2">{`${row.recNombreReus} ${row.recApelidReus}`}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.apjCorreoApgm}</TableCell>
                    <TableCell>{row.recDirresReus}</TableCell>
                    <TableCell>{row.recTelefoReus}</TableCell>
                    <TableCell>{dayjs(row.recFecnacReus).format('MMM D, YYYY')}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined">
                          Modificar
                        </Button>
                        <Button variant="outlined" color="error" >
                          Eliminar
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Divider />
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange || (() => {})}
          onRowsPerPageChange={onRowsPerPageChange || (() => {})}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
}
