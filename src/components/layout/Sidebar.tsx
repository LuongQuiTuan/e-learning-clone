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
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import { styled, Theme, CSSObject } from '@mui/material/styles';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const MiniDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const menuItems = [
  { text: 'Dashboard', icon: <HomeFilledIcon />, path: '/' },
  { text: 'Courses', icon: <AutoStoriesIcon />, path: '/courses' },
  { text: 'Users', icon: <PersonIcon />, path: '/users' },
];

export default function Sidebar() {
  const { sidebarOpen } = useLayoutStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <MiniDrawer variant="permanent" open={sidebarOpen}>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!sidebarOpen ? item.text : ''} placement="right">
              <ListItemButton
                selected={pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: 2.5,
                  mx: sidebarOpen ? 1 : 0,
                  borderRadius: sidebarOpen ? 2 : 0,
                  mb: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: sidebarOpen ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </MiniDrawer>
  );
}
