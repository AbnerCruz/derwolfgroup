import { Link } from "react-router-dom";
import PriceCalculator from "../../../../PriceCalculator";
import "../../../../styles/courses/math/math.css";

function SolarSystemLayout({ title, subtitle, introTitle, introText, planets, totalDiscount, checkoutURL }) {
  const totalPrice = planets.reduce((sum, planet) => (planet.disponivel ? sum + (planet.price - (planet.price*(planet.discount/100))) : sum), 0);

  return (
    <div className="HomePageGlobalDiv">
      <div className="NousNovaMathPage">
        {/* Título da Página */}
        <section id="title">
          <h1>{title} |</h1>
          <h3>{subtitle}</h3>
        </section>

        {/* Introdução */}
        <section>
          <h2>{introTitle}</h2>
          <p>{introText}</p>
        </section>

        {/* Planetas */}
        <section>
          <h2>Planetas deste Sistema</h2>
          <div className="planets">
            {planets.map(course => (
              <div className="planet-card" key={course.name}>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                {course.disponivel ? (
                  <Link to={course.id} className="planet-button" state={{ price: course.price }} target="blank">Saber Mais</Link>
                ) : (
                  <button className="planet-button disabled" disabled> Em breve</button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Área de Compra */}
        <section id="buy">
          {planets.some(course => course.disponivel) ? (
            <>
              <div id="discount">
                {totalDiscount !== 0 ? (
                  <>
                    <p id="_2">{PriceCalculator(totalPrice, 0)}</p>
                    <p id="_1">{PriceCalculator(totalPrice, totalDiscount)}</p>
                  </>
                ) : (
                  <p id="_1">{PriceCalculator(totalPrice, totalDiscount)}</p>
                )}
              </div>
              <a href={checkoutURL} className="card" target="blank">Comprar</a>
            </>
          ) : (
            <button className="planet-button disabled" disabled>Disponível em breve</button>
          )}
        </section>
      </div>
    </div>
  );
}

export default SolarSystemLayout;
