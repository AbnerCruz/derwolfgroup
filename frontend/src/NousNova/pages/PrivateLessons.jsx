import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import lessonsData from "./lessons/LessonsData";
import "../../styles/pages/nousNovaPages/private-lessons.css";
import "../../styles/components/catalog.css";
import "../../styles/components/button.css";

function PrivateLessons() {
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

  if (loading) return <p>Carregando disciplinas...</p>;
  if (error) return <p>Erro: {error}</p>;

  // Cria um map de disciplinas com professores
  const disciplinesWithTeachers = new Set();
  teachers.forEach((teacher) => {
    try {
      const list = Array.isArray(teacher.disciplines)
        ? teacher.disciplines
        : JSON.parse(teacher.disciplines);
      list.forEach((d) => disciplinesWithTeachers.add(d));
    } catch {
      // ignora erro de parse
    }
  });

  return (
    <div className="NousNovaLessons">
      <section className="lessons-title">
        <h1>Aulas Particulares</h1>
        <p>
          Personalizadas, investigativas e feitas para você. Escolha a disciplina e comece sua jornada.
        </p>
      </section>

      <section className="catalog-container">
        {Object.entries(lessonsData).map(([key, lesson]) => {
          const hasTeacher = disciplinesWithTeachers.has(lesson.discipline);
          return hasTeacher ? (
            <Link
              key={key}
              to={`/nousnova/private-lessons/${key}`}
              className="catalog-item catalog-card"
            >
              <div className="catalog-card-content">
                <h2 className="catalog-title">{lesson.discipline}</h2>
                <p className="catalog-description">{lesson.description}</p>
              </div>
            </Link>
          ) : 
          <div key={key} className="catalog-item catalog-card disabled">
            <div className="catalog-card-content">
              <h2 className="catalog-title">{lesson.discipline}</h2>
              <p className="catalog-description">Nenhum professor disponível no momento.</p>
            </div>
          </div>;
        })}
      </section>

      <section className="cta-section">
        <h2>Quem Somos?</h2>
        <Link to="/nousnova/about">
          <button className="btn btn-dark">Conheça a filosofia da Nous Nova</button>
        </Link>
      </section>
    </div>
  );
}

export default PrivateLessons;
