import { alpha, useTheme } from '@mui/material';

export function getToggleButtonStyles() {
  const theme = useTheme();

  return {
    backgroundColor: alpha(theme.palette.background.paper, 0.98),
    backdropFilter: 'blur(10px)',
    borderRadius: 3,
    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
    boxShadow: `4px 0 24px rgba(0, 0, 0, 0.04)`,
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
  };
}
