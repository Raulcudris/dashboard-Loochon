import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import * as React from 'react';

interface UsersFiltersProps {
  onFilterChange: (filter: string) => void;
}

export function UsersFilters({ onFilterChange }: UsersFiltersProps): React.JSX.Element {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;
    onFilterChange(filter);
  };

   return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        onChange={handleInputChange}
        fullWidth
        placeholder="Search user"
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
