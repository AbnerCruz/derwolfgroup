import "../styles/teachers.css";
import { Link } from "react-router-dom";
export const teachersArray = [
    {
        name: "Abner Cruz",
        image: "/teachers/AbnerCruz.png",
        disciplines: ["Matemática"],
        instagram: "https://www.instagram.com/nous.prof_abner/"
    },
    {
        name: "Renata Nóbrega",
        image: "/teachers/RenataNobrega.png",
        disciplines: ["Música","Piano", "Teclado", "Violino", "Violão"],
        instagram: "https://www.instagram.com/musicistare/"
    },
];

export function TeacherCard({ teacher, showDisciplines = false }) {
  return (
    <div className="teacherCard">
        <Link to={teacher.instagram} target="blank">
            <div id="imageContainer">
                <img src={teacher.image} alt={teacher.name} style={{marginRight: "15px"}}/>
                <h3>{teacher.name}</h3>
            </div>
            {showDisciplines && (
                <p>Disciplinas: {teacher.disciplines.join(", ")}</p>
            )}
        </Link>
    </div>
  );
}


function Teachers() {
  return (
    <div className="HomePageGlobalDiv">
      <div className="NousNovaTeachers">
        <h2>Professores</h2>
        <div className="teachersGrid">
          {teachersArray.map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} showDisciplines={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teachers;