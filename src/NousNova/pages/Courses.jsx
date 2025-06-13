import "../styles/courses/courses.css";
import { Link } from "react-router-dom";

function Courses() {
  return (
    <div className="CoursesPageGlobalDiv">
      <div className="NousNovaCourses">
        {/* Título */}
        <section id="title">
          <h1>Nous Nova | Cursos</h1>
          <h3>Explore o universo do conhecimento</h3>
        </section>

        {/* Introdução */}
        <section>
          <p>
            Nosso catálogo de cursos é organizado como um universo educacional: galáxias, sistemas e planetas.
            Cada disciplina é uma galáxia. Dentro dela, você encontra sistemas solares que representam
            os grandes temas. E em cada planeta, você mergulha em um curso específico.
          </p>
        </section>
        <h3>Galáxias</h3>
        {/* Galáxias */}
        <section className="galaxy-grid">
          {/* Galáxia Matemática */}
          <div className="galaxy-card">
            <h2>Matemática</h2>
            <p>“A matemática é a linguagem com a qual Deus escreveu o universo.”</p>
            <p>Galileu Galilei</p>
            <Link to="/nousNova/courses/math"><button className="card">Explorar</button></Link>
          </div>
        </section>

        {/* CTA final */}
        <section id="cta">
          <p>Quer embarcar nessa jornada cósmica de aprendizado?</p>
          <Link to="/nousNova">
            <button className="card">Voltar para Início</button>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Courses;
