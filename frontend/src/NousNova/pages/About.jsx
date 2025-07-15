import "../../styles/pages//nousNovaPages/about.css";
import "../../styles/components/button.css";
import "../../styles/components/card.css";
import "../../styles/components/catalog.css";
import lessonsData from "./lessons/LessonsData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import depoimentos from "../Depoimentos";

export function TeacherPreviewCard({ teacher }) {
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
        <p className="catalog-description">
          {Array.isArray(teacher.disciplines)
            ? teacher.disciplines.join(", ")
            : ""}
        </p>
      </Link>
    </div>
  );
}

function shuffleArray(array) {
  const arr = array.slice(); // copia para não alterar original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ExpandableItem({ title, description, expanded, onToggle }) {
  return (
    <div
      className={`expandable-card ${expanded ? "expanded" : ""}`}
      onClick={onToggle}
    >
      <h4>{title}</h4>
      <p className="expandable-description">{description}</p>
    </div>
  );
}

const valores = [
  { title: "Autonomia", description: "Cada aluno segue seu ritmo, seu estilo, seu tempo." },
  { title: "Vínculo Humano", description: "O saber nasce no encontro entre pessoas reais." },
  { title: "Profundidade", description: "Não nos satisfazemos com o raso, aqui, aprender é regra." },
  { title: "Exploração", description: "O conhecimento se conquista com coragem e liberdade." },
];

function AboutNousNova({ depoimentosTo = "school" }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/teachers`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar professores.");
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

  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  // Filtra, embaralha e seleciona até 4 depoimentos conforme o parâmetro depoimentosTo
  const filteredDepoimentos = depoimentos.filter((dep) => dep.to === depoimentosTo);
  const shuffledDepoimentos = shuffleArray(filteredDepoimentos);
  const selectedDepoimentos = shuffledDepoimentos.slice(0, 4);

  return (
    <div className="AboutNousNova">
      {/* 1. Hero + Vídeo */}
      <section className="hero-section">
        <div id="header">
          <h1>Nous Nova</h1>
          <p>
            Nossa escola é feita para quem não aceita decorar sem entender. Aqui,
            o saber é profundo, prático e personalizado.
          </p>
        </div>
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // troque pelo link certo
            title="Vídeo Institucional"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* 2. Jornada do Estudante */}
      <section className="student-journey">
        <h2>Despertamos mentes livres.</h2>
        <div className="journey-steps">
          {[
            {
              icon: "🌱",
              title: "Insatisfação",
              text: "Você já percebeu que o ensino tradicional não funciona para você, tudo é rápido, superficial, sem sentido.",
            },
            {
              icon: "🧭",
              title: "Jornada",
              text: "Seu aprendizado é seu território. Você escolhe mentores que compreendem suas necessidades, disciplinas que despertam interesse e constrói uma trilha de estudos própria, a autonomia é nosso pilar.",
            },
            {
              icon: "🚀",
              title: "Disciplina",
              text: "Aqui, aprender é ação. Você cultiva disciplina e aplica o que aprende em provas, debates, no trabalho ou na vida, a evolução é real, o esforço rende frutos visíveis, que nutrem sua motivação e ampliam sua visão de mundo.",
            },
            {
              icon: "🌌",
              title: "Transformação",
              text: "O resultado não se limita a notas ou certificados. É uma transformação profunda, intelectual, emocional e prática. Você conquista um novo olhar sobre si mesmo e o mundo. O saber deixa de ser obrigação para ser poder, prazer e liberdade.",
            },
          ].map(({ icon, title, text }, i) => (
            <article key={i} className="step">
              <div className="step-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Valores Expandíveis */}
      <section className="valores-expandiveis">
        <h2>No que acreditamos</h2>
        <div className="valores-catalogo">
          {valores.map((item, i) => (
            <ExpandableItem
              key={i}
              title={item.title}
              description={item.description}
              expanded={expandedIndex === i}
              onToggle={() => toggleExpand(i)}
            />
          ))}
        </div>
      </section>

      {/* 4. Universo Interativo */}
      <section className="mapa-do-universo">
        <h2>Explore o universo do saber</h2>
        <p>Cada galáxia representa uma disciplina. Clique para explorar.</p>
        <img
          src="/images/universo-nousnova.png"
          alt="Mapa das disciplinas"
          useMap="#disciplina-map"
        />
        <map name="disciplina-map">
          {Object.entries(lessonsData).map(([key, lesson]) => (
            <area
              key={key}
              shape="circle"
              coords={lesson.coord || "0,0,0"}
              href={`/nousnova/private-lessons/${key}`}
              alt={lesson.discipline}
            />
          ))}
        </map>

        {/* Lista textual fallback */}
        <div className="discipline-links" aria-label="Lista de disciplinas">
          {Object.entries(lessonsData).map(([key, lesson]) => (
            <div key={key} className="discipline-link">
              <a href={`/nousnova/private-lessons/${key}`} className="btn">
                {lesson.discipline}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Catálogo de Professores */}
      <section className="equipe-nos">
        <h2>Conheça nossa equipe</h2>

        {loading ? (
          <p>Carregando professores...</p>
        ) : error ? (
          <p>Erro: {error}</p>
        ) : (
          <div className="catalog-container">
            {teachers.map((teacher) => (
              <TeacherPreviewCard key={teacher.name} teacher={teacher} />
            ))}
          </div>
        )}
        <div>
          <Link to="/nousnova/teachers" className="btn-dark">
            Ver todos os professores
          </Link>
        </div>
      </section>

      {/* 6. Depoimentos (Carrossel) */}
      {selectedDepoimentos.length > 0 && (
        <section className="depoimentos-nos">
          <h2>O que dizem sobre nós</h2>
          <div className="carousel-wrapper">
            {selectedDepoimentos.map((dep, index) => (
              <div className="carousel-item" key={index}>
                <p>{dep.texto}</p>
                <strong> — {dep.autor}</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. CTA Final */}
      <section className="cta-final cta-reforçada">
        <h2>Você não está sozinho. E não precisa continuar estudando no escuro.</h2>
        <p>
          A Nous Nova nasceu pra quem já se cansou de estudar por obrigação, de
          fingir que entendeu, de se sentir burro por não acompanhar a escola
          ou as apostilas. Aqui, você aprende de verdade, no seu tempo, com quem
          te escuta, com quem acredita no seu potencial mesmo quando você duvida
          dele.
        </p>
        <p>
          É um outro jeito de aprender. Mais profundo, mais humano, mais
          transformador. E pode começar agora.
        </p>
        <a href="/nousnova/private-lessons" className="btn btn-destaque">
          Quero começar essa jornada
        </a>
      </section>
    </div>
  );
}

export default AboutNousNova;
