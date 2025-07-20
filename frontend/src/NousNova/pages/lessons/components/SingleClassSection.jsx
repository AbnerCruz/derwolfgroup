import React, { useState } from "react";
import criarWhatsappLink from "../../../WhatsappTextCreator";
import "../../../../styles/pages/nousNovaPages/single-class.css";

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",");
}

export default function SingleClassSection({ disciplinesFromNous, disciplinesPartners }) {
  const [selectedDisciplines, setSelectedDisciplines] = useState({});

  const toggleDiscipline = (label) => {
    setSelectedDisciplines((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const getSelected = () =>
    Object.entries(selectedDisciplines)
      .filter(([_, checked]) => checked)
      .map(([label]) => label);

  const createLink = (type, isNous) => {
    const selected = getSelected();
    if (selected.length === 0) return null;

    const quantityObj = selected.reduce((acc, label) => {
      acc[label] = 1;
      return acc;
    }, {});

    return criarWhatsappLink(
      selected.map(d => `${d}|${type}`),
      false,
      quantityObj,
      isNous ? disciplinesFromNous[0]?.contactURL : disciplinesPartners[0]?.contactURL
    );
  };

  const DisciplineGroup = ({ title, disciplines, isNous, experimentalLink, avulsaLink }) => {
    return (
      <>
        <h3 className="subsection-title">{title}</h3>
        <div className="catalog-container">
          {disciplines.map(({ label, basePrice }) => (
            <label key={label} className="discipline-checkbox">
              <input
                type="checkbox"
                checked={!!selectedDisciplines[label]}
                onChange={() => toggleDiscipline(label)}
              />
              <span className="discipline-label">{label}</span>
              <span className="price-label">
                {isNous ? `Experimental: R$ ${formatPrice(basePrice * 0.5)} | ` : ""}
                Avulsa: R$ {formatPrice(basePrice)}
              </span>
            </label>
          ))}
        </div>
        <div className="actions-container">
          <div className="action-buttons-group">
            <a
              href={experimentalLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-dark${experimentalLink ? "" : " disabled"}`}
              aria-disabled={!experimentalLink}
            >
              Experimental
            </a>
            <a
              href={avulsaLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-dark${avulsaLink ? "" : " disabled"}`}
              aria-disabled={!avulsaLink}
            >
              Avulsa
            </a>
          </div>
        </div>
      </>
    );
  };

  return (
    <section className="plans-section">
      <h2>Aulas Avulsas</h2>
      <p className="info-box">
        Aulas avulsas são ideais para momentos pontuais e não oferecem desconto.
        Já as aulas experimentais têm valor promocional e, ao contratar um plano,
        esse valor é abatido da primeira fatura.
      </p>

      <DisciplineGroup
        title="Nous Nova"
        disciplines={disciplinesFromNous}
        isNous={true}
        experimentalLink={createLink("experimental", true)}
        avulsaLink={createLink("avulsa", true)}
      />
      <DisciplineGroup
        title="Parceiros"
        disciplines={disciplinesPartners}
        isNous={false}
        experimentalLink={createLink("experimental", false)}
        avulsaLink={createLink("avulsa", false)}
      />
    </section>
  );
}
