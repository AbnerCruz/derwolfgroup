import "../styles/about.css";
import {Link} from "react-router-dom"

function Sobre() {
  return (
    <div className="HomePageGlobalDiv">
      <div className="NousNovaAbout">
        {/* Título Principal e Frase de Impacto */}
        <section id="title">
          <h1>Nous Nova |</h1>
          <p style={{textAlign:"center"}}>O conhecimento é prazer, é poder, é liberdade.</p>
        </section> 
        <section>
          <h2>Quem somos</h2>
          <p>
            A Nous Nova é mais do que uma escola — é um universo educacional onde o conhecimento é prazer, liberdade e transformação. Nasceu do desejo de romper com o ensino tradicional e criar um espaço vivo, humano e significativo, onde aprender é um ato de autonomia, coragem e beleza.
          </p>
        </section>

        <section>
          <h2>Missão</h2>
          <p>
            Oferecer uma educação profunda, crítica e prazerosa, que forme indivíduos livres, conscientes e apaixonados pelo saber. Nosso compromisso é com a verdade, com o pensamento autêntico e com a formação integral do ser humano.
          </p>
        </section>

        <section>
          <h2>Visão</h2>
          <p>
            Ser um farol educacional que inspira a liberdade intelectual e a paixão pelo conhecimento. Queremos formar mentes vivas que questionam, investigam e transformam o mundo — e a si mesmas — por meio do aprendizado.
          </p>
        </section>

        <section>
          <h2>Valores</h2>
          <ul>
            <li style={{listStyleType: "disc"}}>Conhecimento pelo prazer</li>
            <li style={{listStyleType: "disc"}}>Autonomia e autodidatismo</li>
            <li style={{listStyleType: "disc"}}>Investigação como método</li>
            <li style={{listStyleType: "disc"}}>Profundidade em vez de superficialidade</li>
            <li style={{listStyleType: "disc"}}>Liberdade para pensar e criar</li>
            <li style={{listStyleType: "disc"}}>Educação como experiência vital e estética</li>
            <li style={{listStyleType: "disc"}}>Mentoria humanizada</li>
            <li style={{listStyleType: "disc"}}>Interdisciplinaridade</li>
            <li style={{listStyleType: "disc"}}>Inclusão, escuta e colaboração</li>
            <li style={{listStyleType: "disc"}}>Compromisso com a verdade e a ciência</li>
          </ul>
        </section>

        <section>
          <h2>O que acreditamos</h2>
          <p>
            Acreditamos que o saber não é uma prisão, mas um voo. Que o aluno é protagonista de sua jornada. Que o erro é etapa, não falha. Que o professor é mentor, não autoridade. E que o conhecimento é um cosmos a ser explorado — com coragem, prazer e profundidade.
          </p>
        </section>

        <section>
          <h2>Comunidade Nous Nova</h2>
          <p>
            Nossa escola é um espaço para mentes inquietas e criativas. Aqui, alunos, mentores e sonhadores se encontram para aprender juntos, construir juntos e transformar juntos. Somos uma comunidade viva, que aprende com liberdade e ensina com alma.
          </p>
        </section>

        <section>
          <h2>Manifesto Nous Nova</h2>
          <p>
            Baixe o manifesto completo da Nous Nova e mergulhe profundamente na filosofia que nos guia.
          </p>
          <a href="/Manifesto.pdf" download="Manifesto_Nous_Nova.pdf" className="planet-button">Baixar Manifesto</a>
        </section>
        {/* Bloco 8 — Chamada para Ação (CTA) */}
        <section id="button">
          <Link to="/nousNova/private-lessons">
            <button className="card">Aulas Particulares</button>
          </Link>
          <Link to="/nousNova/courses">
            <button className="card">Ver cursos</button>
          </Link>
        </section> 
      </div>
    </div>

  );
}

export default Sobre;
