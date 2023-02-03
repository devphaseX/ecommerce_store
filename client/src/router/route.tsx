import { Navigate, RouteObject } from 'react-router-dom';
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

type LinkPath = Record<
  string,
  { path: string; name: string; children?: LinkPath } | { path: `$${'self'}` }
>;

const path = {
  home: { name: 'home', path: '/' },
  '/': { name: 'home', path: '/' },
  cart: { name: 'cart', path: '/cart' },
  login: { name: 'login', path: '/login' },
  signup: { name: 'signup', path: '/signup' },
  product: {
    name: 'product',
    path: '/product',
    children: { ':id': { path: '$self' } },
  },
  checkout: { name: 'checkout', path: '/cart' },
} satisfies LinkPath;

const routeObject = {
  element: <Layout />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/home', element: <Navigate to="/" /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    {
      path: '/product',
      children: [
        { index: true, element: <Shop /> },
        { path: ':id', element: <ProductDetail /> },
      ],
    },
    { path: '/cart', element: <Cart /> },
    {
      element: <AuthGrantRoute />,
      children: [{ path: '/checkout', element: <Checkout /> }],
    },
  ],
} satisfies RouteObject;

export { routeObject, path as pathLink };
