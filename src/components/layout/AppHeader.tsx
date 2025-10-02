'use client';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { AddCircleOutline, Menu as MenuIcon } from '@mui/icons-material';
import { useLayoutStore } from '@/lib/stores/layoutStore';
import { styled } from '@mui/material/styles';
import { getPageTitle } from '@/lib/pageUtils';
import { usePathname, useRouter } from 'next/navigation';
import { closedContentMixin, openedContentMixin } from '@/utils/drawerMixins';
import { useIsMobile } from '@/hooks/useMobile';

const ResponsiveAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})<{ open: boolean; isMobile: boolean }>(({ theme, open, isMobile }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(12px)',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: `0 1px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  color: theme.palette.text.primary,

  ...(!isMobile &&
    open && {
      ...openedContentMixin(theme),
    }),
  ...(!isMobile &&
    !open && {
      ...closedContentMixin(theme),
    }),

  ...(isMobile && {
    width: '100%',
    marginLeft: 0,
    transition: 'none',
  }),
}));

export default function AppHeader() {
  const { toggleSidebar, sidebarOpen } = useLayoutStore();
  const pathname = usePathname();
  const currentPageTitle = getPageTitle(pathname);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useIsMobile();

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
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 2.5,
              py: 1,
              fontSize: '0.875rem',
              letterSpacing: 0.25,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,

              transition: theme.transitions.create(
                ['background-color', 'transform', 'box-shadow'],
                {
                  duration: theme.transitions.duration.short,
                  easing: theme.transitions.easing.easeInOut,
                },
              ),

              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              },

              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            New Course
          </Button>
        );
      case '/courses/new':
        return (
          <Button
            variant="outlined"
            onClick={() => router.push('/courses')}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 2.5,
              py: 1,
              fontSize: '0.875rem',
              letterSpacing: 0.25,
              borderColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),

              transition: theme.transitions.create(
                ['background-color', 'border-color', 'transform', 'box-shadow'],
                {
                  duration: theme.transitions.duration.short,
                  easing: theme.transitions.easing.easeInOut,
                },
              ),

              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
              },

              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            Back to Courses
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <ResponsiveAppBar position="fixed" open={sidebarOpen} elevation={0} isMobile={isMobile}>
      <Toolbar sx={{ py: 1 }}>
        {!isMobile && (
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={toggleSidebar}
            sx={{
              mr: 3,

              borderRadius: 1.5,
              p: 1,

              transition: theme.transitions.create(
                ['background-color', 'transform', 'box-shadow'],
                {
                  duration: theme.transitions.duration.short,
                  easing: theme.transitions.easing.easeInOut,
                },
              ),

              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
              },

              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: '1.25rem',
            letterSpacing: -0.025,
            color: theme.palette.text.primary,
            textShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.1)}`,
          }}
        >
          {currentPageTitle}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {renderPageAction()}
      </Toolbar>
    </ResponsiveAppBar>
  );
}
