import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { routeObject } from './route';

const router = createBrowserRouter([routeObject]);

const PageRouter = () => {
  return <RouterProvider router={router} />;
};

export { PageRouter };
