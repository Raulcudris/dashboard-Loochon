'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { CoordenatesTableProps } from '@/interface';

export function CoordenatesTable({
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
}: CoordenatesTableProps & { onRefresh: () => void }): React.JSX.Element {

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" align="center"></TableCell>
              <TableCell align="center">sisCodproSipr</TableCell>
              <TableCell align="center">sisCodmunSimu</TableCell>
              <TableCell align="center">sisIdedptSidp</TableCell>
              <TableCell align="center">sisCodpaiSipa</TableCell>
              <TableCell align="center">sisNombreSipr</TableCell>
              <TableCell align="center">sisCodposSipr</TableCell>
              <TableCell align="center">sisProclaSipr</TableCell>
              <TableCell align="center">sisGeolatSipr</TableCell>
              <TableCell align="center">sisGeolonSipr</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
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
              </TableRow>
            ))}
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
        labelRowsPerPage="Usuarios por páginas"
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
