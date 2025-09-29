export const getPageTitle = (pathname: string): string => {
  const pathMap: Record<string, string> = {
    '/': 'Dashboard',
    '/courses': 'Courses',
    '/users': 'Users',
    '/courses/new': 'Create new course',
  };

  if (pathMap[pathname]) {
    return pathMap[pathname];
  }

  if (pathname.startsWith('/courses/') && pathname.endsWith('/edit')) {
    return 'Edit course';
  }
  return 'Page Not Found';
};
