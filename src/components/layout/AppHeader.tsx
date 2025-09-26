'use client';

import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useLayoutStore } from '@/lib/stores/layoutStore';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { getPageTitle } from '@/lib/pageUtils';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `calc(${theme.spacing(7)} + 1px)`,
  width: `calc(100% - ${theme.spacing(7)} - 1px)`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: `calc(${theme.spacing(8)} + 1px)`,
    width: `calc(100% - ${theme.spacing(8)} - 1px)`,
  },
});

const ResponsiveAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    ...openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
  }),
}));

export default function AppHeader() {
  const { toggleSidebar, sidebarOpen } = useLayoutStore();
  const pathname = usePathname();
  const currentPageTitle = getPageTitle(pathname);

  const handleNewCourse = () => {
    // Logic to handle creating a new course
    console.log('New Course button clicked');
  };
  const renderPageActions = () => {
    switch (pathname) {
      case '/courses':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleNewCourse}
              sx={{ backgroundColor: 'white', color: 'black' }}
            >
              New courses
            </Button>
          </Box>
        );
      case '/users':
        return <Box sx={{ display: 'flex', gap: 1 }}></Box>;
    }
  };
  return (
    <ResponsiveAppBar position="fixed" open={sidebarOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {currentPageTitle}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {renderPageActions()}
      </Toolbar>
    </ResponsiveAppBar>
  );
}
