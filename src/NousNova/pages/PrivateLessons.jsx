import "../styles/privateLessons.css";
import { Link } from "react-router-dom";

function PrivateLessons() {
  return (
    <div className="HomePageGlobalDiv">
      <div className="NousNovaLessons">

        <section id="title">
          <h1>Aulas Particulares Nous Nova</h1>
          <p>
            Descubra um novo jeito de aprender com aulas investigativas, personalizadas e centradas em você.
          </p>
        </section>

        <section className="info-section">
          <h2>Como funciona?</h2>
          <p>
            Nossas aulas são planejadas para atender suas necessidades individuais. Atendemos online e presencialmente (Presidente Prudente-SP), com foco em reforço, aprofundamento ou preparação para provas.
          </p>
        </section>

        <section className="galaxy-grid">
          <Link to="/nousNova/private-lessons/math">
            <div className="card">
              <h2>Matemática</h2>
              <p>“Nada pode ser amado ou odiado antes que seja compreendido.”</p>
              <p>Leonardo da Vinci</p>
            </div>
          </Link>

          <Link to="/nousNova/private-lessons/physics">
            <div className="card">
              <h2>Física</h2>
              <p>“A física é o alicerce de todas as ciências naturais.”</p>
              <p>James Clerk Maxwell</p>
            </div>
          </Link>

          <Link to="/nousNova/private-lessons/music">
            <div className="card">
              <h2>Música</h2>
              <p>“Onde as palavras falham, a música fala.”</p>
              <p>Hans Christian Andersen</p>
            </div>
          </Link>
        </section>

        <section className="cta-section">
          <h2>Pronto para começar?</h2>
        </section>

      </div>
    </div>
  );
}

export default PrivateLessons;
