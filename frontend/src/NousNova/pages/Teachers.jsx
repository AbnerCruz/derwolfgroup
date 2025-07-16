import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/pages/nousNovaPages/teachers.css"; // estilo geral da página
import "../../styles/components/catalog.css"; // layout estilo catálogo
import "../../styles/components/card.css";    // estilo dos cards

export function TeacherCard({ teacher, showDisciplines = false, availability = [] }) {
  const disciplinesArray = (() => {
    try {
      return Array.isArray(teacher.disciplines)
        ? teacher.disciplines
        : JSON.parse(teacher.disciplines);
    } catch {
      return [];
    }
  })();

  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  return (
    <div className="catalog-item catalog-card">
      <Link
        to={teacher.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="catalog-card-content"
      >
        <img
          src={`${process.env.REACT_APP_API_URL}${teacher.image}`}
          alt={teacher.name}
          className="catalog-image"
        />
        <h3 className="catalog-title">{teacher.name}</h3>
        {showDisciplines && (
          <p className="catalog-description">
            Disciplinas: {disciplinesArray.join(", ")}
          </p>
        )}

        {availability.length > 0 && (
          <div className="catalog-availability">
            <strong>Horários</strong>
            <ul>
              {availability.map((slot, idx) => (
                <li key={idx}>
                  {weekdays[slot.weekday]}: {slot.startTime} - {slot.endTime}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Link>
    </div>
  );
}

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [availabilities, setAvailabilities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/teachers`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao buscar professores");
        return res.json();
      })
      .then((data) => {
        setTeachers(data);
        setLoading(false);

        data.forEach((teacher) =>{
          fetch(`${process.env.REACT_APP_API_URL}/teacher/${teacher.id}/availability`)
          .then((res)=> res.json())
          .then((slots) => {setAvailabilities(prev=>({...prev, [teacher.id] : slots}))})
        })
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando professores...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="NousNovaTeachers">
      <h1 className="teachers-title">Professores</h1>

      <section className="catalog-container">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.name} teacher={teacher} showDisciplines={true} availability={availabilities[teacher.id] || []} />
        ))}
      </section>


    </div>
  );
}

export default Teachers;
