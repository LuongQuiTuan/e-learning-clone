'use client';

import { useLayoutStore } from '@/lib/stores/layoutStore';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';
import { Box, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { closedContentMixin, openedContentMixin } from '@/utils/drawerMixins';

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  ...(open && {
    ...openedContentMixin(theme),
  }),
  ...(!open && {
    ...closedContentMixin(theme),
  }),
}));
interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { sidebarOpen } = useLayoutStore();

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <AppHeader />
      <Main open={sidebarOpen}>
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
}
