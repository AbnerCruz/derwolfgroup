import { useParams } from "react-router-dom";
import lessonsData from "./LessonsData"; // mesmo caminho do anterior
import LessonPageLayout from "./LessonsPageLayout"; // seu componente de layout detalhado

export default function PrivateLessonsWrapper() {
  const { subject } = useParams();

  const lesson = lessonsData[subject];

  if (!lesson) return <p>Disciplina não encontrada.</p>;

  return <LessonPageLayout {...lesson} subject={subject} />;
}
