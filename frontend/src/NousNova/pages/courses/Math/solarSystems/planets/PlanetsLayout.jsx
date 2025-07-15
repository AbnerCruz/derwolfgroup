import { useParams } from "react-router-dom";
import PriceCalculator from "../../../../../PriceCalculator";
import { galaxyData } from "../../GalaxyData";
import "../../../../../../styles/components/card.css";
import "../../../../../../styles/components/button.css";
import "../../../../../../styles/components/catalog.css";
import "../../../../../../styles/pages/nousNovaPages/courses-page.css";

import depoimentos from "../../../../../Depoimentos"; // ajuste o caminho conforme seu projeto

function shuffleArray(array) {
  const arr = array.slice(); // cópia para não alterar o original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function PlanetsLayout() {
  const { subject, systemId, planetId } = useParams();

  const systems = galaxyData[subject] || [];
  let planet = null;

  for (const system of systems) {
    if (system.id === systemId) {
      planet = system.planets.find((p) => p.id === planetId);
      break;
    }
  }

  if (!planet) {
    return (
      <div className="CoursesPageGlobalDiv">
        <div className="NousNovaPlanetsLayout">
          <h2>Curso não encontrado.</h2>
        </div>
      </div>
    );
  }

  // Filtra depoimentos do tipo "course", embaralha e seleciona até 4
  const filteredDepoimentos = depoimentos.filter((dep) => dep.to === "course");
  const shuffledDepoimentos = shuffleArray(filteredDepoimentos);
  const selectedDepoimentos = shuffledDepoimentos.slice(0, 4);

  return (
    <div className="CoursesPageGlobalDiv">
      <div className="NousNovaPlanetsLayout">

        <section id="title" className="section-card highlight">
          <h1>{planet.name} |</h1>
          <h3>{planet.motivation}</h3>
          <img src={planet.imageURL} alt={`Imagem do curso ${planet.name}`} className="course-image"/>
        </section>

        <section className="section-card">
          <header className="section-header">
            <h2>{planet.problemTitle}</h2>
          </header>
          <p>{planet.problemContent}</p>
        </section>

        <section className="section-card">
          <header className="section-header">
            <h2>{planet.solutionTitle}</h2>
          </header>
          <p>{planet.solutionContent}</p>
        </section>

        <section className="section-card">
          <header className="section-header">
            <h2>{planet.courseContentsTitle}</h2>
          </header>
          <ul className="content-list">
            {planet.courseContentsContent.map((item, index) => (
              <li key={index}>{item.content}</li>
            ))}
          </ul>
        </section>

        <section className="section-card video-section">
          <h2>{planet.freeVideoDemonstrationTitle}</h2>
          <div className="youtube-video">
            <iframe
              src={planet.freeVideoDemonstrationURL}
              title="Prévia do curso"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {selectedDepoimentos.length > 0 && (
          <section className="section-card testimonials-section">
            <h2>{planet.socialProofTitle || "O que dizem sobre este curso"}</h2>
            <div className="testimonials-carousel">
              {selectedDepoimentos.map((dep, i) => (
                <figure key={i} className="testimonial-item">
                  {dep.image && <img src={dep.image} alt={`Depoimento de ${dep.autor}`} className="testimonial-img"/>}
                  <blockquote>"{dep.texto}"</blockquote>
                  <figcaption>— {dep.autor}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="section-card guarantee-section">
          <h2>Garantia Nous Nova</h2>
          <p>Se em até 7 dias você sentir que o curso não é para você, devolvemos 100% do valor. Simples assim, sem burocracia.</p>
        </section>

        <section className="section-card cta-section">
          <h2>{planet.callToActionTitle}</h2>
          
          {planet.discount > 0 ? (
            <p>
              De <del className="price-old">{PriceCalculator(planet.price, 0)}</del> por apenas{" "}
              <strong className="price-discounted">{PriceCalculator(planet.price, planet.discount)}</strong>, 
              você terá acesso completo ao material. <span className="price-discounted">-{planet.discount}%</span>
            </p>
          ) : (
            <p>
              Por apenas <strong>{PriceCalculator(planet.price, 0)}</strong> você terá acesso completo ao material.
            </p>
          )}
          
          <a 
            href={planet.checkOutURL} 
            className="btn btn-primary" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Comprar Agora
          </a>
        </section>


        <section className="section-card faq-section">
          <h2>{planet.FAQTitle}</h2>
          <ul className="faq-list">
            {planet.FAQContent.map((item, idx) => (
              <li key={idx}>
                <button className="faq-question">{item.question}</button>
                <div className="faq-answer">{item.answer}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>

  );
}

export default PlanetsLayout;
