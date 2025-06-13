import { Outlet } from 'react-router-dom';
import NousNovaNavBar from "../NousNova/components/Navbar";
import NousNovaFooter from "../NousNova/components/Footer";

function NousNovaLayout() {
  return (
    <>
      <NousNovaNavBar />
        <Outlet />
      <NousNovaFooter />
    </>
  );
}

export default NousNovaLayout;