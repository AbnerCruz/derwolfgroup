import { Link } from 'react-router-dom'; // Para navegar entre as páginas
import "../styles/navbar.css";

function Navbar() {
  return (
    <div className="NousNova">
      <nav>
        <ul>
          <li><Link to="/nousNova">Home</Link></li>
          <li><Link to="/nousNova/private-lessons">Aulas Particulares</Link></li>
          <li><Link to="/nousNova/teachers">Professores</Link></li>
          <li><Link to="/nousNova/courses">Cursos</Link></li>
          <li><Link to="/nousNova/about">Sobre</Link></li>
          <li><a href="https://wa.me/5518996181770?text=" target="blank">Contato</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
