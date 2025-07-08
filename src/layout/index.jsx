import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer richColors position="top-right" />
    </div>
  );
};

export default Layout;
