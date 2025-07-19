import { Outlet } from 'react-router';
import { Header } from '~/routes/_app/components/header';
import { Footer } from '~/components/layout/footer';

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;