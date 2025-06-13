import "../../../styles/courses/math/math.css";
import { Link } from "react-router-dom";

function MathPage() {
  return (
    <div className="HomePageGlobalDiv">
      <div className="NousNovaMathPage">

        {/* Título e Frase */}
        <section id="title">
          <h1>Matemática |</h1>
          <h3>A linguagem do universo, a arte do raciocínio.</h3>
        </section>

        {/* Introdução ao curso */}
        <section>
          <h2>Por que estudar Matemática?</h2>
          <p>
            A Matemática não é apenas números — é estrutura, lógica e pensamento.
            Ela está em cada descoberta científica, em cada avanço tecnológico.
            Compreendê-la é abrir as portas do universo.
          </p>
        </section>

        {/* Estrutura do curso */}
        <section>
          <h2>Como o curso está organizado</h2>
          <p>
            Nossa matemática é uma grande galáxia.
            Cada estrela principal — como Aritmética, Álgebra, Geometria e Cálculo — brilha iluminando um sistema próprio.
          </p>
          <p>
            Ao redor de cada uma dessss estrelas orbitam cursos completos, nossos “sistemas solares”, e dentro deles, os “planetas” representam os temas específicos que você irá explorar.
            É uma jornada pelo universo do conhecimento, onde cada descoberta acende uma nova luz no céu de sua criatividade.
          </p>
        </section>

        {/* Metodologia */}
        <section>
          <h2>Metodologia Nous Nova</h2>
          <p>
            Nada de fórmulas prontas e decoreba.
            Aqui, você vai investigar, explorar, errar e descobrir.
            O aprendizado é ativo, investigativo e interdisciplinar — você aprende como um cientista aprende.
            Inspiramo-nos no método de Feynman: entender de verdade é ser capaz de explicar com simplicidade.
            Mais do que memorizar, você irá compreender profundamente, dominando os conceitos de dentro para fora.
          </p>
        </section>

        {/* Para quem é o curso */}
        <section>
          <h2>Este curso é para você?</h2>
          <p>
            Se você quer compreender de verdade a Matemática — não apenas para passar na prova, mas ver o mundo com olhos matemáticos —
            este curso é para você.
          </p>
        </section>

        {/* Para quem é o curso */}
        <section id="explore">
        <h2>Explorar Sistemas</h2>
        <ul className="explore-list">
            <li><Link to="/nousNova/courses/math/matematica-para-concursos" className="explore-card">Matemática Para Provas & Concursos</Link></li>
        </ul>
        </section>

      </div>
    </div>
  );
}

export default MathPage;

