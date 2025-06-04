'use client';

import { OutlinedInput, InputAdornment, Select, MenuItem, Stack, Box } from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import React from 'react';

interface OccupationsFiltersProps {
  onFilterChange: (filter: string) => void;
  onStatusChange: (status: 'ALL' | '1' | '2') => void;
  currentStatus: 'ALL' | '1' | '2';
}

export const OccupationsFilters: React.FC<OccupationsFiltersProps> = ({
  onFilterChange,
  onStatusChange,
  currentStatus
}) => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
      {/* Input con expansión automática para empujar el Select hacia la derecha */}
      <Box sx={{ flexGrow: 1, maxWidth: 550, width: '100%' }}>
        <OutlinedInput
          onChange={(e) => onFilterChange(e.target.value)}
          fullWidth
          placeholder="Buscar ocupación"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
        />
      </Box>

      {/* Select a la derecha */}
      <Select
        value={currentStatus}
        onChange={(e) => onStatusChange(e.target.value as 'ALL' | '1' | '2')}
        sx={{ width: 200 }}
      >
        <MenuItem value="ALL">Todas</MenuItem>
        <MenuItem value="1">Activas</MenuItem>
        <MenuItem value="2">Inactivas</MenuItem>
      </Select>
    </Stack>
  );
};
