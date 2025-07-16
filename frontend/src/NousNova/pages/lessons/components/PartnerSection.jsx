import React from "react";

export default function PartnerSection({ disciplinesPartners }) {
  return (
    <section className="plans-section" id="partners">
      <h2>Disciplinas de Parceiros</h2>
      <div className="catalog-container">
        {disciplinesPartners.map((d) => (
          <div key={d.label} className="prices-card">
            <h4>{d.label}</h4>
            <p className="price-per-hour">
              Preço por hora: R$ {d.basePrice.toFixed(2).replace(".", ",")}
            </p>
            <a
              href={d.contactURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
            >
              Contratar com parceiro
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
