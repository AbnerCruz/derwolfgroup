import { useParams } from "react-router-dom";
import "../../../../../styles/courses/math/planetsLayout.css";
import PriceCalculator from "../../../../../PriceCalculator";
import {planetsList} from "./PlanetsList"


function PlanetPage() {
  const { id } = useParams();
  const planetGroup = planetsList[0];

  let planet = null;

  for (const key in planetGroup) {
    if (Array.isArray(planetGroup[key])) {
      planet = planetGroup[key].find(p => p.id === id);
      if (planet) break;
    }
  }

  if(!planet){
    return <p>Curso não encontrado.</p>
  }

  return(
    <div className="HomePageGlobalDiv">
      <div className="NousNovaPlanetsLayout">
        {/* Header */}
        <section id="title">
          <h1>{planet.name} |</h1>
          <h3>{planet.motivation}</h3>
        </section>

        {/* Visitor Problem */}
        <section>
          <h2>{planet.problemTitle}</h2>
          <p>{planet.problemContent}</p>
        </section>

        {/* Solution */}
        <section>
          <h2>{planet.solutionTitle}</h2>
          <p>{planet.solutionContent}</p>
        </section>

        {/* Course Contents */}
        <section>
          <h2>{planet.courseContentsTitle}</h2>
          <ul>{planet.courseContentsContent.map((item,index)=>(<li key={index}>{item.content}</li>))}</ul>
        </section>

        {/* Free Video Demonstration */}
        <section className="demo-preview">
          <h2>{planet.freeVideoDemonstrationTitle}</h2>
          <p>{planet.freeVideoDemonstrationContent}</p>
          <div className="youtube-video">
            <iframe width="100%" height="315" src={planet.freeVideoDemonstrationURL} title="Prévia do curso" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
          </div>
        </section>

        {/* Social Proof */}
        <section>
          <h2>{planet.socialProofTitle}</h2>
          <ul>{planet.socialProofContent.map((item,index)=>(<li key={index}><img src={item.image} alt="image not found"/></li>))}</ul>
        </section>

        {/* Guarantee */}
        <section>
          <h2>Garantia Nous Nova</h2>
          <p>
            Se em até 7 dias você sentir que o curso não é para você, devolvemos 100% do valor. Simples assim, sem burocracia.
          </p>
        </section>

        {/* Call to Action */}
        <section>
          <h2>{planet.callToActionTitle}</h2>
          <p>Por apenas <strong>{PriceCalculator(planet.price,planet.discount)}</strong> você terá acesso completo ao material, com videoaulas e atividades.</p>
          <a href={planet.checkOutURL} className="planet-button" target="blank">Comprar</a>
        </section>

        {/* FAQ */}
        <section>
          <h2>{planet.FAQTitle}</h2>
          <ul>{planet.FAQContent.map((item,index)=>(<li key={index}><p>{item.question}</p> - <span>{item.answer}</span></li>))}</ul>
        </section>
      </div>
    </div>
  )
}

export default PlanetPage;