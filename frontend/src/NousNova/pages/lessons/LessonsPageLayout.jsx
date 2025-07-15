import { useEffect, useState } from "react";
import { TeacherCard } from "../Teachers";
import { Link } from "react-router-dom";
import "../../../styles/pages/nousNovaPages/lessons-page-layout.css";
import "../../../styles/components/button.css";
import "../../../styles/components/card.css";

// Função para embaralhar um array (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function LessonPageLayout({
  subject,
  title,
  subtitle,
  sections,
  discipline,
  extraContent = null,
  callToAction,
  courses,
}) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/teachers`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar professores");
        return res.json();
      })
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando professores...</p>;
  if (error) return <p>Erro: {error}</p>;

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.disciplines.includes(discipline)
  );

  // Sorteia e limita a 3 cursos
  const displayedCourses = courses && courses.length > 0 ? shuffleArray(courses).slice(0, 3) : [];

  return (
    <div className="NousNovaLessons">
      <section className="lesson-page-title">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
        {extraContent}
      </section>

      {sections.map((section, index) => (
        <section className="lesson-section" key={index}>
          <h2>{section.title}</h2>
          {Array.isArray(section.content) ? (
            <ul>
              {section.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{section.content}</p>
          )}
        </section>
      ))}

      {courses && courses.length > 0 ? (
        <section className="lesson-section">
          <h2>Cursos Disponíveis</h2>
          <div className="catalog-container">
            {displayedCourses.map((course) => (
              <div className="catalog-item" key={course.id}>
                <h3 className="catalog-title">{course.title}</h3>
                <p className="catalog-description">{course.subtitle}</p>
                <Link
                  to={`/nousnova/courses/${subject}/${course.id}`}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Saiba Mais
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to={`/nousnova/courses/${subject}`} className="btn btn-secondary">
              Ver todos os cursos
            </Link>
          </div>
        </section>
      ) : (
        <section className="lesson-section">
          <h2>Cursos Disponíveis</h2>
          <p>Nenhum curso disponível no momento.</p>
        </section>
      )}

      <section className="lesson-section">
        <h2>Aula Particular vs Reforço Escolar</h2>
        <p>Oferecemos dois formatos de ensino individualizado:</p>
        <ul>
          <li>
            <strong>Aula Particular:</strong> foco em objetivos de longo prazo como ENEM, vestibulares, concursos ou aprendizado por interesse. Conteúdo personalizado e acompanhado por um mentor.
          </li>
          <li>
            <strong>Reforço Escolar:</strong> revisão do conteúdo da escola, resolução de dúvidas e apoio com atividades escolares.
          </li>
        </ul>
        <p>Escolha a modalidade que melhor atende suas intenções.</p>
      </section>

      <section className="lesson-section">
        <h2>Nossos Professores de {discipline}</h2>
        <div className="catalog-container">
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.name} teacher={teacher} />
          ))}
        </div>
      </section>

      <section className="lesson-payment-section">
        <h2>Pagamento e Agendamento</h2>
        {filteredTeachers.length > 0 ? (
          <>
            <p>{callToAction.description}</p>
            {callToAction.button &&
              (callToAction.button.external ? (
                <a
                  href={callToAction.button.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  {callToAction.button.label}
                </a>
              ) : (
                <Link to={callToAction.button.to} className="btn">
                  {callToAction.button.label}
                </Link>
              ))}
          </>
        ) : (
          <>
            <p>Nenhum professor disponível para esta disciplina no momento.</p>
            <Link to={`/nousnova/private-lessons`} className="btn">
              Outras disciplinas
            </Link>
          </>
        )}
      </section>
    </div>
  );
}

export default LessonPageLayout;
