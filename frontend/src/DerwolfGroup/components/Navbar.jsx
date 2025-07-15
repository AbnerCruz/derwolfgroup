import { Link } from 'react-router-dom'; // Para navegar entre as páginas
import "../../styles/layout/navbar.css";

function Navbar() {
  return (
    <div className="DerwolfGroup">
      <nav>
        <ul>
          <Link to="/">
            <img src="/DerwolfLogo.png" alt="Grupo Derwolf" className="navbar-logo right" />
          </Link>
          <li><Link to="/nousNova">Nous Nova</Link></li>
          <li><Link to="/derwolfbooks">Derwolf Books</Link></li>
          <li><Link to="/">Derwolf Entertainment</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
