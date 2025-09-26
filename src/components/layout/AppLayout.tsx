'use client';

import { useLayoutStore } from '@/lib/stores/layoutStore';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';
import { Box, Toolbar } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';

const drawerWidth = 240;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { sidebarOpen } = useLayoutStore();

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <AppHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
          ml: { sm: sidebarOpen ? `${drawerWidth}px` : 0 },

          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
