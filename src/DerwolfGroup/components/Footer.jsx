import "../styles/footer.css";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="DerwolfGroup">
      <footer>
        <div id="footer-content">
          <div>
            <h3>Grupo Derwolf</h3>
            <p>Texto que descreve o Grupo Derwolf</p>
          </div>

          <div id="social-media">
            <h4>Redes Sociais</h4>
            <ul>
              <li><a href="https://www.youtube.com/@derwolffisicaplus" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://www.instagram.com/derwolf.educacao" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.facebook.com/derwolf.educacao" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div id="copyright">
          <p>© 2025 Grupo Derwolf. | Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
