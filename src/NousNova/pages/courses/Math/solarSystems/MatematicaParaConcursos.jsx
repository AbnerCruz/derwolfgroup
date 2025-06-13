// src/pages/matematica/provas-e-concursos/index.jsx

import "../../../../styles/courses/math/math.css";
import SolarSystemLayout from "./SolarSystemLayout";
import { planetsList } from "./planets/PlanetsList"
const discount = 10; //Define Fully Courses Discount here

const planetObject = planetsList.find(item => item.planets_MatematicaParaConcursos !== undefined);
const planets = planetObject ? planetObject.planets_MatematicaParaConcursos : [];

function MatematicaParaConcursos() {
  return (
    <SolarSystemLayout
      title="Provas e Concursos"
      subtitle="O sistema solar dos aprovados"
      introTitle="Bem-vindo ao Sistema das Provas e Concursos"
      introText={`Você está prestes a iniciar uma jornada pelos fundamentos da matemática cobrados nos principais concursos e provas do país. Aqui, cada capítulo é um planeta — e cada conceito, um passo em direção ao domínio total da matéria. Com aulas diretas, conteúdos claros e foco em aprovação, este curso é seu guia confiável rumo ao sucesso. Vamos juntos transformar a matemática em aliada. Que o conhecimento te conduza!`}
      planets={planets}
      totalDiscount={discount}
      checkoutURL="" // Put the link here
    />
  );
}

export default MatematicaParaConcursos;
