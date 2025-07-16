import React from "react";
import criarWhatsappLink from "../../../WhatsappTextCreator";

export default function SingleClassSection({ disciplinesFromNous, disciplinesPartners }) {
  return (
    <section className="plans-section">
      <h2>Aulas Avulsas</h2>
      <p className="info-box">
        Aulas avulsas são ideais para momentos pontuais e não oferecem desconto.
        Já as aulas experimentais têm valor promocional e, ao contratar um plano,
        esse valor é abatido da primeira fatura.
      </p>

      <h3 className="subsection-title">Nous Nova</h3>
      <div className="catalog-container">
        {disciplinesFromNous.map((discipline) => (
          <SingleClassCard key={discipline.label} discipline={discipline} isNous />
        ))}
      </div>

      <h3 className="subsection-title">Parceiros</h3>
      <div className="catalog-container">
        {disciplinesPartners.map((discipline) => (
          <SingleClassCard key={discipline.label} discipline={discipline} isNous={false} />
        ))}
      </div>
    </section>
  );
}

function SingleClassCard({ discipline, isNous }) {
  const experimentalPrice = isNous
    ? (discipline.basePrice * 0.5).toFixed(2).replace(".", ",")
    : discipline.basePrice.toFixed(2).replace(".", ",");

  const avulsaPrice = discipline.basePrice.toFixed(2).replace(".", ",");

  return (
    <div className="card">
      <h3 className="card-title">{discipline.label}</h3>
      <div className="singleClass-buttons">
        <span>
          <p>
            Experimental: <strong>R$ {experimentalPrice}</strong>
          </p>
          <a
            href={criarWhatsappLink(
              [`${discipline.label}|experimental`],
              false,
              { [discipline.label]: 1 }, discipline.contactURL
            )}
            className="btn-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aula Experimental
          </a>
        </span>
        <span>
          <p>
            Avulsa: <strong>R$ {avulsaPrice}</strong>
          </p>
          <a
            href={criarWhatsappLink(
              [`${discipline.label}|avulsa`],
              false,
              { [discipline.label]: 1 }, discipline.contactURL
            )}
            className="btn-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reservar Avulsa
          </a>
        </span>
      </div>
    </div>
  );
}
