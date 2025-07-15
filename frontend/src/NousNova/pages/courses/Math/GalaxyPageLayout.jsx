import { useParams, Link } from "react-router-dom";
import lessonsData from "../../lessons/LessonsData";
import { galaxyData } from "./GalaxyData";
import "../../../../styles/components/card.css";
import "../../../../styles/components/catalog.css";
import "../../../../styles/components/button.css";
import "../../../../styles/pages/nousNovaPages/courses-page.css";

function GalaxyPageLayout() {
  const { subject } = useParams(); // Ex: "matematica"
  const lesson = lessonsData[subject]; // Dados da disciplina
  const systems = galaxyData[subject] || []; // Lista de sistemas solares

  if (!lesson) {
    return (
      <div className="CoursesPageGlobalDiv">
        <div className="NousNovaCourses">
          <section id="title">
            <h1>Disciplina não encontrada</h1>
            <p>Por favor, volte e escolha uma disciplina válida.</p>
            <Link to="/nousnova/courses" className="btn">Voltar para Cursos</Link>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="CoursesPageGlobalDiv">
      <div className="NousNovaCourses">

        {/* Título e frase */}
        <section id="title">
          <h1>{lesson.discipline} |</h1>
          <h3>{lesson.quote || lesson.subtitle}</h3>
        </section>

        {/* Introdução */}
        <section className="course-section">
          <h2>Por que estudar {lesson.discipline}?</h2>
          <p>{lesson.description}</p>
        </section>

        {/* Sistemas Solares */}
        <section className="course-section">
          <h2>Sistemas Solares</h2>
          <div className="solar-systems-container" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {systems.length > 0 ? (
              systems.map((system) => (
                <Link
                  key={system.id}
                  to={`/nousnova/courses/${subject}/${system.id}`}
                  className="btn btn-dark"
                  style={{ flex: "1 1 250px", padding: "1rem", textAlign: "center" }}
                >
                  {system.title}
                </Link>
              ))
            ) : (
              <p>Não há sistemas solares disponíveis para esta disciplina.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default GalaxyPageLayout;
