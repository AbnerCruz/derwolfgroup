import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/derwolfGroupPages/home.css";

function HomePage() {
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/mensagem`)
      .then((res) => res.json())
      .then((data) => setMensagem(data.texto))
      .catch((err) => {
        console.error("Erro ao buscar mensagem do backend:", err);
        setMensagem("Erro ao conectar com o servidor");
      });
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">Grupo Derwolf</h1>
        <p className="hero-subtitle">
          A criatividade em ação.
        </p>
      </section>

      {/* QUEM SOMOS */}
      <section className="section">
        <h2>Quem Somos</h2>
        <p>
          O Grupo Derwolf é a manifestação prática de uma mente criadora.
          Cada projeto é um ramo de uma árvore viva, cujo tronco representa uma única identidade:
          inovação, liberdade e utilidade real.
        </p>
      </section>

      {/* FUNDADOR */}
      <section className="section">
        <h2>Fundador</h2>
        <p>
          Derwolf é o nome de um projeto de vida. O grupo nasce como extensão da minha mente.
          Não é empresa, nem ONG, nem coletivo. É identidade. É arquitetura de ideias.
        </p>
      </section>

      {/* PROJETOS */}
      <section className="section">
        <h2>Projetos em Andamento</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Nous Nova</h3>
            <p>Escola independente com foco em autonomia, profundidade e vínculo humano.</p>
            <Link to="/nousNova">Nous Nova</Link>
          </div>
          <div className="project-card">
            <h3>Derwolf Books</h3>
            <p>Estante virtual para publicar produções textuais de autoria própria.</p>
            <Link to="/derwolfbooks">Derwolf Books</Link>
          </div>
        </div>

        <h2>Projetos Idealizados</h2>
        <div className="project-grid">
          {[
            ["Galeria Visual", "Publicação de ilustrações, artes e fotografias autorais."],
            ["Game Lab", "Desenvolvimento independente de jogos criativos e simbólicos."],
            ["Dev Studio", "Criação de sistemas, sites e aplicações web fullstack."],
            ["Projeto Rural", "Iniciativa agropecuária experimental baseada em autossuficiência."],
          ].map(([titulo, descricao]) => (
            <div key={titulo} className="project-card">
              <h3>{titulo}</h3>
              <p>{descricao}</p>
              <span className="project-status">Em planejamento</span>
            </div>
          ))}
        </div>
      </section>

      {/* MENSAGEM BACKEND */}
      <section className="section backend-message">
        <h2>Mensagem do Servidor</h2>
        <p>{mensagem || "Carregando..."}</p>
      </section>
    </div>
  );
}

export default HomePage;
