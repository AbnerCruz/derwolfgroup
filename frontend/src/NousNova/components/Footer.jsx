import "../../styles/layout/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div id="footer-content">
        <div>
          <h3>Nous Nova</h3>
          <p>Educação e entretenimento unidos por uma visão inovadora.</p>
        </div>

        <div id="social-media">
          <h4>Redes Sociais</h4>
          <ul>
            <li>
              <a
                href="https://www.youtube.com/@derwolffisicaplus"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/YoutubeIcon.png" id="icon" alt="YouTube" />
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/nous.nova/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/InstagramIcon.png" id="icon" alt="Instagram" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61574434002651"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/FacebookIcon.png" id="icon" alt="Facebook" />
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div id="copyright">
        <Link to="/">
          <img src="/DerwolfLogo.png" alt="Grupo Derwolf" className="navbar-logo right" />
          <p>© 2025 Grupo Derwolf. | Todos os direitos reservados.</p>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
