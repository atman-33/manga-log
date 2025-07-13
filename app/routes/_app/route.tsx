import { Outlet } from 'react-router';
import { Header } from '~/routes/_app/components/header';

const AppLayout = () => {
  return (
    <>
				<Header />
        <Outlet />
    </>

  )
}

export default AppLayout