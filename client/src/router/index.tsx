import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import {
  Cart,
  Checkout,
  Home,
  Login,
  ProductDetail,
  Shop,
  Signup,
} from '../pages';
import { Layout } from '../components/Layout';
import { AuthGrantRoute } from './restricted/AuthGrantRoute';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/home', element: <Navigate to="/" /> },
      {
        element: <AuthGrantRoute />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/signup', element: <Signup /> },
        ],
      },
      {
        path: '/product',
        children: [
          { index: true, element: <Shop /> },
          { path: ':id', element: <ProductDetail /> },
        ],
      },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
    ],
  },
]);

const PageRouter = () => {
  return <RouterProvider router={router} />;
};

export { PageRouter };
