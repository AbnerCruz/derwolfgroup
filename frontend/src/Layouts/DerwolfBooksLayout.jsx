import { Outlet } from 'react-router-dom';
import BooksNav from "../DerwolfBooks/components/Navbar";
import BooksFooter from "../DerwolfBooks/components/Footer";

function DerwolfBooksLayout() {
  return (
    <>
      <BooksNav />
        <Outlet />
      <BooksFooter />
    </>
  );
}

export default DerwolfBooksLayout;