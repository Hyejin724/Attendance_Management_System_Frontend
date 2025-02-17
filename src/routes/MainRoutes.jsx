import { lazy } from 'react';
import PrivateRoute from './PrivateRoute';

import Loadable from '../components/Loadable.jsx';
import MainLayout from '../layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(
  lazy(() => import('../pages/dashboard/index.jsx')),
);
const Search = Loadable(lazy(() => import('../pages/search')));
const SearchResults = Loadable(lazy(() => import('../pages/search/result')));
const AdminManage = Loadable(lazy(() => import('../pages/admin/manage')));
const PlayerCreate = Loadable(
  lazy(() => import('../pages/admin/playercreate')),
);

const MainRoutes = {
  path: '/',
  element: (
    // <PrivateRoute>
    <MainLayout />
    // </PrivateRoute>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'search',
      element: <Search />,
    },
    {
      path: 'search/result',
      element: <SearchResults />,
    },
    {
      path: 'admin/manage',
      element: <AdminManage />,
    },
    {
      path: 'admin/create',
      element: <PlayerCreate />,
    },
  ],
};

export default MainRoutes;
