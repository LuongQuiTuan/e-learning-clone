import { getToggleButtonStyles } from '@/styles/toggleButtonStyles';
import { alpha, Theme, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import {
  IconArrowDown,
  IconArrowUp,
  IconCalendar,
  IconGridDots,
  IconList,
  IconSortAscending,
  IconSortDescending,
} from '@tabler/icons-react';

type SortBy = 'name' | 'date';
type SortOrder = 'asc' | 'desc';
interface CourseSortToggleProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onChange: (event: React.MouseEvent<HTMLElement>, value: SortBy | null) => void;
  isMobile: boolean;
  theme: Theme;
}

export default function CourseSortToggle({
  sortBy,
  sortOrder,
  onChange,
  isMobile,
  theme,
}: CourseSortToggleProps) {
  return (
    <>
      <ToggleButtonGroup
        size="small"
        value={sortBy}
        exclusive
        onChange={onChange}
        sx={getToggleButtonStyles()}
      >
        <ToggleButton value="name" aria-label="sort by name">
          {sortBy === 'name' && sortOrder === 'asc' ? (
            <IconSortAscending size={18} style={{ marginRight: 6 }} />
          ) : (
            <IconSortDescending size={18} style={{ marginRight: 6 }} />
          )}
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '(A-Z)' : '(Z-A)')}
        </ToggleButton>

        {/* Date Button - Shows up/down arrow based on order */}
        <ToggleButton value="date" aria-label="sort by date">
          <IconCalendar size={18} style={{ marginRight: 6 }} />
          Date {sortBy === 'date' && (sortOrder === 'desc' ? '(Newest)' : '(Oldest)')}
          {sortBy === 'date' &&
            (sortOrder === 'desc' ? (
              <IconArrowDown size={16} style={{ marginLeft: 4 }} />
            ) : (
              <IconArrowUp size={16} style={{ marginLeft: 4 }} />
            ))}
        </ToggleButton>
      </ToggleButtonGroup>
      {!isMobile && (
        <ToggleButtonGroup
          value={sortBy}
          exclusive
          onChange={onChange}
          aria-label="view mode"
          size="small"
          sx={{
            backgroundColor: alpha(theme.palette.background.paper, 0.98),
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            boxShadow: '4px 0 24px rgba(0, 0, 0, 0.04)',
            p: 0.5,
            '& .MuiToggleButton-root': {
              border: 'none',
              borderRadius: 2,
              mx: 0.25,
              minHeight: 40,
              backgroundColor: 'transparent',
              color: theme.palette.text.secondary,
              transition: theme.transitions.create(
                ['background-color', 'transform', 'box-shadow', 'color'],
                {
                  duration: theme.transitions.duration.short,
                  easing: theme.transitions.easing.easeInOut,
                },
              ),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.06),
                color: theme.palette.text.primary,
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
              },
              '&.Mui-selected': {
                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                color: theme.palette.primary.main,
                boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  transform: 'translateY(-1px)',
                  boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
                },
              },
            },
          }}
        >
          <ToggleButton value="grid" aria-label="grid view">
            <IconGridDots size={20} />
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view">
            <IconList size={20} />
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
}
