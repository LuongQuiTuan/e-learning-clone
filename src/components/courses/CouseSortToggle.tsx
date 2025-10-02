import { getToggleButtonStyles } from '@/styles/toggleButtonStyles';
import { Theme, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
  onViewModeChange?: (mode: 'grid' | 'table') => void;
  viewMode?: 'grid' | 'table';
}

export default function CourseSortToggle({
  sortBy,
  sortOrder,
  onChange,
  isMobile,
  viewMode,
  onViewModeChange,
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
          value={viewMode}
          exclusive
          onChange={(_, newView) => newView && onViewModeChange?.(newView)}
          size="small"
          sx={getToggleButtonStyles()}
        >
          <ToggleButton value="grid" aria-label="grid view">
            <IconGridDots size={18} />
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view">
            <IconList size={18} />
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
}
