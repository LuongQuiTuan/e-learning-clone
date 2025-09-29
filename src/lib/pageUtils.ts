export const getPageTitle = (pathname: string): string => {
  const pathMap: Record<string, string> = {
    '/': 'Dashboard',
    '/courses': 'Courses',
    '/users': 'Users',
    '/courses/new': 'Create new course',
  };
  return pathMap[pathname] || 'Page Not Found';
};
