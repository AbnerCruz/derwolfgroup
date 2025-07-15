import { Link } from "react-router-dom";
import "../../styles/components/card.css";
import "../../styles/components/button.css";
import "../../styles/components/catalog.css";
import "../../styles/pages/nousNovaPages/courses.css"
import lessonsData from "./lessons/LessonsData";

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
            Nosso catálogo de cursos é organizado como um universo educacional:
            galáxias, sistemas e planetas. Cada disciplina é uma galáxia. Dentro
            dela, você encontra sistemas solares que representam os grandes temas.
            E em cada planeta, você mergulha em um curso específico.
          </p>
        </section>



        {/* Galáxias */}
        <h3>Galáxias</h3>
        <section className="catalog-container">
          {Object.entries(lessonsData).map(([key, lesson]) => {
            // Pula qualquer modelo ou entrada sem título
            if (!lesson.title || key === "model") return null;

            return (
              <Link to={`/nousNova/courses/${key}`} key={key} className="card-link">
                <div className="card catalog-item">
                  <h3 className="catalog-title">{lesson.discipline}</h3>
                  {lesson.quote && (
                    <p className="catalog-description">– {lesson.quote}</p>
                  )}
                  <button className="btn-dark">Explorar</button>
                </div>
              </Link>
            );
          })}
        </section>

        {/* CTA Aulas Particulares */}
        <section className="cta">
          <h3>Prefere aulas individuais com foco total em você?</h3>
          <p>Conheça nossas aulas particulares com professores especializados e atenção personalizada. Escolha sua disciplina e comece agora mesmo.</p>
          <Link to="/nousNova/private-lessons">
            <button className="btn">Ver Aulas Particulares</button>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Courses;
