import { useParams, Link } from "react-router-dom";
import { galaxyData } from "../GalaxyData";
import "../../../../../styles/components/card.css";
import "../../../../../styles/components/catalog.css";
import "../../../../../styles/components/button.css";
import "../../../../../styles/pages/nousNovaPages/courses-page.css";
import PriceCalculator from "../../../../PriceCalculator"; // ajuste conforme necessário

function SolarSystemPageLayout() {
  const { subject, systemId } = useParams();

  const systems = galaxyData[subject] || [];
  const system = systems.find((sys) => sys.id === systemId);

  if (!system) {
    return <div>Sistema não encontrado</div>;
  }

  const totalPrice = system.planets.reduce(
    (sum, planet) =>
      planet.disponivel ? sum + planet.price * (1 - planet.discount / 100) : sum,
    0
  );

  return (
    <div className="CoursesPageGlobalDiv">
      <div className="NousNovaCourses">
        {/* Título */}
        <section id="title">
          <h1>{system.title} |</h1>
          <h3>{system.subtitle}</h3>
        </section>

        {/* Introdução */}
        <section className="course-section">
          <h2>{system.introTitle}</h2>
          <p>{system.introText}</p>
        </section>

        {/* Planetas */}
        <section className="course-section">
          <h2>Planetas deste Sistema</h2>
          <div className="catalog-container planets">
            {system.planets.map((course) => {
              const hasDiscount = course.discount && course.discount > 0;
              const priceOriginal = PriceCalculator(course.price, 0);
              const priceDiscounted = PriceCalculator(course.price, course.discount || 0);

              return (
                <div className="card catalog-item planet-card" key={course.id}>
                  <h3 className="catalog-title">{course.name}</h3>
                  <p className="catalog-description">{course.description}</p>

                  {/* Preços */}
                  <div className="planet-price">
                    {hasDiscount ? (
                      <>
                        <span className="price-old">{priceOriginal}</span>
                        <span className="price-discounted">{priceDiscounted}</span>
                      </>
                    ) : (
                      <span className="price-discounted">{priceOriginal}</span>
                    )}
                  </div>

                  {course.disponivel ? (
                    <Link
                      to={`/nousnova/courses/${subject}/${system.id}/${course.id}`}
                      className="btn-dark"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Saber Mais
                    </Link>
                  ) : (
                    <button className="btn-dark disabled" disabled>
                      Em breve
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>


        {/* Preço e botão comprar */}
        <section id="buy" className="course-section">
          {system.planets.some((course) => course.disponivel) ? (
            <>
              <div id="discount" className="price-summary">
                <p className="price-label">Todos por</p>
                {system.totalDiscount !== 0 ? (
                  <>
                    <p className="price-discounted">{PriceCalculator(totalPrice, system.totalDiscount)}</p>
                    <p className="price-old">{PriceCalculator(totalPrice, 0)}</p>
                  </>
                ) : (
                  <p className="price-discounted">{PriceCalculator(totalPrice, 0)}</p>
                )}
              </div>
              <a
                href={system.checkoutURL}
                className="card btn-dark btn-buy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprar
              </a>
            </>
          ) : (
            <button className="btn-dark disabled" disabled>
              Disponível em breve
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

export default SolarSystemPageLayout;
