import { Link } from 'react-router-dom'; // Para navegar entre as páginas

function Navbar() {
  return (
    <div className="NousNova">
      <nav>
        <ul>
          <li><Link to="/derwolfbooks">Home</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
