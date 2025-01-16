'use client';

import React from 'react';
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

interface CoordenatesTableProps {
  rows: any[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
}

export function CoordenatesTable({
  rows,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: CoordenatesTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" align="center"></TableCell>
              <TableCell align="center">Field1</TableCell>
              <TableCell align="center">Field2</TableCell>
              <TableCell align="center">Field3</TableCell>
              <TableCell align="center">Field4</TableCell>
              <TableCell align="center">Field5</TableCell>
              <TableCell align="center">Field6</TableCell>
              <TableCell align="center">Field7</TableCell>
              <TableCell align="center">Field8</TableCell>
              <TableCell align="center">Field9</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell padding="checkbox"></TableCell>
                <TableCell align="center">{row.field1}</TableCell>
                <TableCell align="center">{row.field2}</TableCell>
                <TableCell align="center">{row.field3}</TableCell>
                <TableCell align="center">{row.field4}</TableCell>
                <TableCell align="center">{row.field5}</TableCell>
                <TableCell align="center">{row.field6}</TableCell>
                <TableCell align="center">{row.field7}</TableCell>
                <TableCell align="center">{row.field8}</TableCell>
                <TableCell align="center">{row.field9}</TableCell>
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
        labelRowsPerPage="Ciudades por páginas"
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
