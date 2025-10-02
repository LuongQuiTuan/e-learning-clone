import { IconButton, InputAdornment, TextField } from '@mui/material';
import { IconSearch, IconX } from '@tabler/icons-react';

interface CourseSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function CourseSearchBar({ value, onChange, onClear }: CourseSearchBarProps) {
  return (
    <TextField
      placeholder="Search courses..."
      variant="outlined"
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        minWidth: 400,
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={onClear}>
                <IconX size={18} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
