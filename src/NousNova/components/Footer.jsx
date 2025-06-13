import "../styles/footer.css";
function Footer() {
  return (
    <div  className="NousNova">
      <footer>
        <div id="footer-content">
          <div>
            <h3>Nous Nova</h3>
            <p>Educação e entretenimento unidos por uma visão inovadora.</p>
          </div>

          <div id="social-media">
            <h4>Redes Sociais</h4>
            <ul>
              <li><a href="https://www.youtube.com/@derwolffisicaplus" target="_blank" rel="noopener noreferrer"><img src="/YoutubeIcon.png" id="icon" />YouTube</a></li>
              <li><a href="https://www.instagram.com/nous.nova/" target="_blank" rel="noopener noreferrer"><img src="/InstagramIcon.png" id="icon" />Instagram</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61574434002651" target="_blank" rel="noopener noreferrer"><img src="/FacebookIcon.png" id="icon" />Facebook</a></li>
            </ul>
          </div>
        </div>
        <div id="copyright">
          <p style={{fontSize:"1rem"}}>© 2025 Grupo Derwolf. | Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
