import "../../styles/layout/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="navbar-container">
        <Link to="/nousnova">
          <img src="/LogoPerfilTransparente.png" alt="Nous Nova" className="navbar-logo right" />
        </Link>

        <ul className="navbar-links">
          <li><Link to="/nousnova">Home</Link></li>
          <li><Link to="/nousnova/private-lessons">Aulas Particulares</Link></li>
          <li><Link to="/nousnova/teachers">Professores</Link></li>
          <li><Link to="/nousnova/courses">Cursos</Link></li>
          <li><Link to="/nousnova/about">Sobre</Link></li>
          <li>
            <a href="https://wa.me/5518996181770?text=" target="_blank" rel="noopener noreferrer">
              Contato
            </a>
          </li>
        </ul>        
      </div>
    </nav>
  );
}

export default Navbar;
