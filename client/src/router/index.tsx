import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Cart,
  Checkout,
  Home,
  Login,
  ProductDetail,
  Shop,
  Signup,
} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/product',
        children: [
          { index: true, element: <Shop /> },
          { path: '/:id', element: <ProductDetail /> },
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
