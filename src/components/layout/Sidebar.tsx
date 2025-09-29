'use client';

import { useLayoutStore } from '@/lib/stores/layoutStore';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { openedMixin, closedMixin } from '@/utils/drawerMixins';
import { IconBook2, IconHome, IconUser } from '@tabler/icons-react';

const drawerWidth = 200;

const SoftMiniDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      backgroundColor: alpha(theme.palette.background.paper, 0.98),
      backdropFilter: 'blur(10px)',
      borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
      boxShadow: '4px 0 24px rgba(0, 0, 0, 0.04)',
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      backgroundColor: alpha(theme.palette.background.paper, 0.98),
      backdropFilter: 'blur(10px)',
      borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
      boxShadow: '4px 0 24px rgba(0, 0, 0, 0.04)',
    },
  }),
}));

const menuItems = [
  { text: 'Dashboard', icon: <IconHome />, path: '/' },
  { text: 'Courses', icon: <IconBook2 />, path: '/courses' },
  { text: 'Users', icon: <IconUser />, path: '/users' },
];

export default function Sidebar() {
  const { sidebarOpen } = useLayoutStore();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <SoftMiniDrawer variant="permanent" open={sidebarOpen}>
      <Toolbar />
      <Divider
        sx={{
          borderColor: alpha(theme.palette.divider, 0.06),
          mx: 1,
        }}
      />

      <List sx={{ px: sidebarOpen ? 1 : 0.5, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              display: 'block',
              mb: 1,
            }}
          >
            <Tooltip title={!sidebarOpen ? item.text : ''} placement="right">
              <ListItemButton
                selected={pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: sidebarOpen ? 1.5 : 1,
                  mx: 1,
                  borderRadius: 3,
                  backgroundColor: 'transparent',
                  color: theme.palette.text.secondary,

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

                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                  },

                  transition: theme.transitions.create(
                    ['background-color', 'transform', 'box-shadow', 'color'],
                    {
                      duration: theme.transitions.duration.short,
                      easing: theme.transitions.easing.easeInOut,
                    },
                  ),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mx: sidebarOpen ? 1.5 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                    '& svg': {
                      fontSize: '1.25rem',
                      stroke: 'currentColor',
                      strokeWidth: 1.5,
                    },

                    transition: theme.transitions.create(['color'], {
                      duration: theme.transitions.duration.short,
                    }),
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: sidebarOpen ? 1 : 0, //

                    '& .MuiTypography-root': {
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      letterSpacing: 0.25,
                    },

                    transition: theme.transitions.create(['opacity'], {
                      duration: theme.transitions.duration.shorter,
                      easing: theme.transitions.easing.easeInOut,
                    }),
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </SoftMiniDrawer>
  );
}
