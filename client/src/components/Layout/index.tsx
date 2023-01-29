import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

const Layout = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateRows: 'min-content 1fr min-content',
      gridAutoFlow: 'row',
      minHeight: '100vh',
    }}
  >
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export { Layout };
