import { Outlet } from 'react-router-dom';
import DerwolfGroupNavbar from '../DerwolfGroup/components/Navbar';
import DerwolfGroupFooter from '../DerwolfGroup/components/Footer';

function DerwolfGroupLayout() {
  return (
    <>
      <DerwolfGroupNavbar />
        <Outlet />
      <DerwolfGroupFooter />
    </>
  );
}

export default DerwolfGroupLayout;