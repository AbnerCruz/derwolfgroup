import { Link } from 'react-router-dom';
import { useState, useMemo } from "react";
import "../../styles/pages/nousNovaPages/home.css";
import "../../styles/components/card.css";
import "../../styles/components/button.css";

const questionsBase = [
  "Prefiro entender um conceito do que apenas decorar para a prova.",
  "Sinto que aprendo melhor quando posso dialogar e discutir com alguém.",
  "Acredito que estudar é minha obrigação, e um modo de crescer",
  "A melhor aprendizagem acontece quando tenho liberdade para explorar, com orientadores à disposição.",
  "Acho importante questionar o que me ensinam.",
  "A escola deve formar pensadores, não apenas aprovados.",
  "Já me senti sufocado por um ensino superficial ou mecânico.",
  "Quando estudo algo de verdade, gosto de ir a fundo, mesmo que demore.",
  "Me conecto melhor com professores que realmente se importam comigo.",
  "A busca pelo conhecimento exige disciplina e dedicação.",
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function CompatibilityQuiz() {
  const questions = useMemo(() => shuffleArray(questionsBase), []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (value) => {
    const updated = [...answers];
    updated[currentQuestion] = value;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const calculateScore = () => {
    const total = answers.reduce((sum, val) => sum + (val || 0), 0);
    return Math.round((total / (questions.length * 5)) * 100);
  };

  const getMessage = (score) => {
    if (score >= 85) return "Você pensa como a Nous Nova. Vamos aprender juntos!";
    if (score >= 60) return "Você tem muita sintonia com a Nous Nova. Vale a pena explorar!";
    if (score >= 40) return "Há pontos em comum — talvez possamos surpreender você!";
    return "Talvez você esteja buscando outro tipo de experiência. E tudo bem!";
  };

  return (
    <section className="quiz-container">
      <h3>🔍 Compatibilidade com a Nous Nova</h3>

      {!showResult ? (
        <>
          <p className="quiz-question">{questions[currentQuestion]}</p>

          <div className="quiz-options">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                onClick={() => handleSelect(val)}
                className={`btn ${answers[currentQuestion] === val ? "selected" : ""}`}
                type="button"
              >
                {["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"][val - 1]}
              </button>
            ))}
          </div>

          <div className="quiz-navigation">
            <button
              className="btn btn-outline"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              type="button"
            >
              Voltar
            </button>

            <button
              className="btn"
              onClick={handleNext}
              disabled={answers[currentQuestion] === null}
              type="button"
            >
              {currentQuestion === questions.length - 1 ? "Finalizar" : "Próximo"}
            </button>
          </div>

          <div className="quiz-progress" aria-label="Progresso do questionário">
            <div
              className="quiz-progress-bar"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
            <span>{currentQuestion + 1} / {questions.length}</span>
          </div>
        </>
      ) : (
        <div className="quiz-result">
          <h4>🎯 Compatibilidade: {calculateScore()}%</h4>
          <p>{getMessage(calculateScore())}</p>
          <a href="/nousnova/private-lessons" className="btn">Começar minha jornada</a>
        </div>
      )}
    </section>
  );
}


function NousNovaHomePage() {
  return (
    <div className="NousNovaHome">
      <div className="galaxy-grid">
        {/* Saudação filosófica */}
        <section id="welcome-section">
          <h2>Bem-vindo à Nous Nova</h2>
          <p>
            Somos uma escola independente que oferece aulas particulares, cursos completos e conteúdos gratuitos em todas as disciplinas. Com metodologia própria, professores qualificados e foco na autonomia do estudante, ensinamos com liberdade, profundidade e vínculo humano. Aqui, aprender é um projeto sério — e transformador.
          </p>
        </section>

        {/* Navegação */}
        <section id="navigation-cards">
          <Link to="/nousnova/about" className="card-link">
            <div className="card">
              <h3>🌱 Sobre a Nous Nova</h3>
              <p>Conheça nossa filosofia e história.</p>
              <strong>Explorar</strong>
            </div>
          </Link>
          <Link to="/nousnova/private-lessons" className="card-link">
            <div className="card">
              <h3>👨‍🏫 Aulas Particulares</h3>
              <p>Comece sua jornada personalizada.</p>
              <strong>Agendar</strong>
            </div>
          </Link>
          <Link to="/nousnova/courses" className="card-link">
            <div className="card">
              <h3>🌌 Universo de Cursos</h3>
              <p>Explore nossa galáxia do saber.</p>
              <strong>Descobrir</strong>
            </div>
          </Link>
        </section>

        {/* Chamada final */}
        <section id="quiz-section">
          <CompatibilityQuiz/>
        </section>
        <section id="closing-quote">
          <p style={{marginBottom:"20px"}}>O conhecimento é prazer, é poder, é liberdade.</p>
        </section>
      </div>
    </div>
  );
}

export default NousNovaHomePage;
