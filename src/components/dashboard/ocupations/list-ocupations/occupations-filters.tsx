import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import React from 'react';

interface OccupationsFiltersProps {
  onFilterChange: (filter: string) => void;
}

export function OccupationsFilters({ onFilterChange }: OccupationsFiltersProps): React.JSX.Element {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        onChange={handleInputChange}
        fullWidth
        placeholder="Buscar ocupación o servicio"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px' }}
      />
    </Card>
  );
}
