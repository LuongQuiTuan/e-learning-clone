'use client';

import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import { AddCircleOutline, Menu as MenuIcon } from '@mui/icons-material';
import { useLayoutStore } from '@/lib/stores/layoutStore';
import { styled } from '@mui/material/styles';
import { getPageTitle } from '@/lib/pageUtils';
import { usePathname, useRouter } from 'next/navigation';
import { closedContentMixin, openedContentMixin } from '@/utils/drawerMixins';

const ResponsiveAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    ...openedContentMixin(theme),
  }),
  ...(!open && {
    ...closedContentMixin(theme),
  }),
}));

export default function AppHeader() {
  const { toggleSidebar, sidebarOpen } = useLayoutStore();
  const pathname = usePathname();
  const currentPageTitle = getPageTitle(pathname);
  const router = useRouter();

  const handleNewCourse = () => {
    router.push('/courses/new');
  };

  const renderPageAction = () => {
    switch (pathname) {
      case '/courses':
        return (
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleNewCourse}
            sx={{
              backgroundColor: 'secondary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
            }}
          >
            New Course
          </Button>
        );
      default:
        return null;
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

        {renderPageAction()}
      </Toolbar>
    </ResponsiveAppBar>
  );
}
