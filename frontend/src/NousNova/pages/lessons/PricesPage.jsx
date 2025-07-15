import { useState, useMemo } from "react";
import PriceCalculator from "../../PriceCalculator";
import criarWhatsappLink from "../../WhatsappTextCreator";
import lessonsData from "../lessons/LessonsData";
import "../../../styles/pages/nousNovaPages/prices.css";

const PLANS_BY_GROUP = {
  anual: {
    label: "Plano Anual",
    benefits: [
      "✅ Horários Flexíveis",
      "✅ Grupo de dúvidas (WhatsApp)",
      "✅ Reposição de Aulas",
      "✅ Plano de Estudos Personalizado",
      "✅ Simulados e Avaliações Mensais",
      "✅ Garantia de 30 dias",
    ],
    options: [
      { id: "anual1x", label: "4 aulas por mês", discount: 30 },
      { id: "anual2x", label: "8 aulas por mês", discount: 35 },
      { id: "anual3x", label: "12 aulas por mês", discount: 40 },
    ],
    recommended: true,
  },
  semestral: {
    label: "Plano Semestral",
    benefits: [
      "✅ Horários Flexíveis",
      "✅ Grupo de dúvidas (WhatsApp)",
      "✅ Reposição de Aulas",
      "✅ Garantia de 30 dias",
      "❌ Plano de Estudos Personalizado",
      "❌ Simulados e Avaliações Mensais",
    ],
    options: [
      { id: "semestral1x", label: "4 aulas por mês", discount: 20 },
      { id: "semestral2x", label: "8 aulas por mês", discount: 25 },
      { id: "semestral3x", label: "12 aulas por mês", discount: 30 },
    ],
  },
  mensal: {
    label: "Plano Mensal",
    benefits: [
      "✅ Horários Flexíveis",
      "✅ Grupo de dúvidas (WhatsApp)",
      "✅ Garantia de 7 dias",
      "❌ Reposição de Aulas",
      "❌ Plano de Estudos Personalizado",
      "❌ Simulados e Avaliações Mensais",
    ],
    options: [
      { id: "mensal1x", label: "4 aulas por mês", discount: 5 },
      { id: "mensal2x", label: "8 aulas por mês", discount: 10 },
      { id: "mensal3x", label: "12 aulas por mês", discount: 15 },
    ],
  },
};

function getMaxMonthlyLessons(planId) {
  for (const group of Object.values(PLANS_BY_GROUP)) {
    for (const option of group.options) {
      if (option.id === planId) {
        const match = option.label.match(/\d+/);
        return match ? Number(match[0]) : 0;
      }
    }
  }
  return 0;
}

export default function PricesPage() {
  const [selectedTexts, setSelectedTexts] = useState(new Set());
  const [currentPlan, setCurrentPlan] = useState(null);
  const [groupLesson, setGroupLesson] = useState(false);
  const [distribution, setDistribution] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  const showErrorMessage = (planId, message) => {
    setErrorMessages((prev) => ({ ...prev, [planId]: message }));
    setTimeout(() => setErrorMessages((prev) => {
      const copy = { ...prev };
      delete copy[planId];
      return copy;
    }), 5000);
  };

  const disciplines = useMemo(() =>
    Object.entries(lessonsData)
      .filter(([_, d]) => d.callToAction?.button?.to?.includes("prices"))
      .map(([key, d]) => ({
        key,
        label: d.discipline,
        basePrice: d.price ?? 50,
      })), []
  );

  const maxMonthlyLessons = currentPlan ? getMaxMonthlyLessons(currentPlan) : 0;
  const selectedArray = Array.from(selectedTexts);

  const whatsappLink = useMemo(
    () => criarWhatsappLink(selectedArray, groupLesson, distribution),
    [selectedArray, groupLesson, distribution]
  );

  const totaisPlanos = useMemo(() => {
  const totals = {};
  Object.values(PLANS_BY_GROUP).forEach(group => {
    group.options.forEach(plan => {
      const total = selectedArray.reduce((sum, text) => {
        const [disciplineLabel, planId] = text.split("|");
        if (planId !== plan.id) return sum;

        const discipline = disciplines.find(d => d.label === disciplineLabel);
        if (!discipline) return sum;

        const planGroup = Object.values(PLANS_BY_GROUP).find(g =>
          g.options.some(o => o.id === planId)
        );
        if (!planGroup) return sum;

        const planObj = planGroup.options.find(o => o.id === planId);
        const discount = planObj.discount + (groupLesson ? 5 : 0);
        const qtd = distribution[disciplineLabel] || 0;
        const pricePerHour = PriceCalculator(discipline.basePrice, discount, true);

        return sum + pricePerHour * qtd;
      }, 0);

      totals[plan.id] = total;
    });
  });
  return totals;
}, [selectedArray, distribution, groupLesson, disciplines]);

const totaisPlanosSemDesconto = useMemo(() => {
  const totals = {};
  Object.values(PLANS_BY_GROUP).forEach(group => {
    group.options.forEach(plan => {
      const total = selectedArray.reduce((sum, text) => {
        const [disciplineLabel, planId] = text.split("|");
        if (planId !== plan.id) return sum;

        const discipline = disciplines.find(d => d.label === disciplineLabel);
        if (!discipline) return sum;

        const qtd = distribution[disciplineLabel] || 0;
        return sum + discipline.basePrice * qtd;
      }, 0);
      totals[plan.id] = total;
    });
  });
  return totals;
}, [selectedArray, distribution, disciplines]);


  return (
    <div className="PricesPage">
      <header className="prices-header">
        <h1>Consultar Valores</h1>
        <h3>Escolha suas disciplinas e descubra como podemos ajudar você a dominar o conhecimento.</h3>
      </header>

      <section className="plans-section" id="subscriptions">
        <h2>Planos de Estudo</h2>
        <label className="group-checkbox">
          <input
            type="checkbox"
            checked={groupLesson}
            onChange={e => setGroupLesson(e.target.checked)}
          />
          Aula em grupo (ganhe 5% de desconto)
        </label>

        <div className="plan-groups">
          {Object.entries(PLANS_BY_GROUP).map(([groupKey, group]) => (
            <div className="plan-group" key={groupKey}>
              <h3 className="plan-title">
                {group.label}
                {group.recommended && <span className="recommended">★ Recomendado</span>}
              </h3>
              <ul className="benefits">
                {group.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>

              {group.options.map((plan) => {
                const isPlanSelected = selectedArray.some(t => t.includes(plan.id));

                const handleCheckboxChange = e => {
                  const { value, checked } = e.target;
                  const [discipline, planId] = value.split("|");
                  const currentQuantity = distribution[discipline] ?? 0;
                  const totalLessons = Object.values(distribution).reduce((acc, val) => acc + val, 0);

                  if (planId !== currentPlan) {
                    if (checked) {
                      setCurrentPlan(planId);
                      setSelectedTexts(new Set([value]));
                      setDistribution({ [discipline]: 1 });
                    } else {
                      setCurrentPlan(null);
                      setSelectedTexts(new Set());
                      setDistribution({});
                    }
                    return;
                  }

                  setSelectedTexts(prev => {
                    const copy = new Set(prev);
                    if (checked) {
                      if (currentQuantity === 0 && totalLessons >= maxMonthlyLessons) {
                        return prev;
                      }
                      copy.add(value);
                      setDistribution(dist => {
                        if ((dist[discipline] ?? 0) > 0) return dist;
                        return { ...dist, [discipline]: 1 };
                      });
                    } else {
                      copy.delete(value);
                      setDistribution(dist => {
                        const newDist = { ...dist };
                        delete newDist[discipline];
                        return newDist;
                      });
                    }
                    return copy;
                  });
                };

                const handleDistributionChange = (discipline, inputValue) => {
                  let number = parseInt(inputValue);
                  if (isNaN(number) || number < 0) number = 0;

                  const totalOtherLessons = Object.entries(distribution)
                    .filter(([d]) => d !== discipline)
                    .reduce((acc, [, val]) => acc + val, 0);

                  if (totalOtherLessons + number > maxMonthlyLessons) {
                    number = maxMonthlyLessons - totalOtherLessons;
                  }

                  setDistribution(prev => {
                    const newDist = { ...prev };
                    if (number > 0) {
                      newDist[discipline] = number;
                    } else {
                      delete newDist[discipline];
                    }
                    return newDist;
                  });

                  setSelectedTexts(prev => {
                    const newSelected = new Set(prev);
                    if (number === 0) {
                      for (const text of prev) {
                        const [discLabel] = text.split("|");
                        if (discLabel === discipline) newSelected.delete(text);
                      }
                    }
                    return newSelected;
                  });
                };

                const DisciplineCheckbox = ({ discipline }) => {
                  const value = `${discipline.label}|${plan.id}`;
                  const isChecked = selectedTexts.has(value);
                  const discount =
                    PLANS_BY_GROUP[Object.keys(PLANS_BY_GROUP).find(key =>
                      PLANS_BY_GROUP[key].options.some(o => o.id === plan.id)
                    )]?.options.find(o => o.id === plan.id)?.discount || 0;
                  const pricePerHour = PriceCalculator(discipline.basePrice, discount + (groupLesson ? 5 : 0), true);

                  return (
                    <label className="discipline-checkbox">
                      <input
                        type="checkbox"
                        value={value}
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                      />
                      <span className="discipline-label">{discipline.label}</span>
                      {isChecked && (
                        <input
                          type="number"
                          min="0"
                          max={maxMonthlyLessons}
                          placeholder="Aulas/mês"
                          value={distribution[discipline.label] ?? ""}
                          onChange={e => handleDistributionChange(discipline.label, e.target.value)}
                          className="aula-distribution-input"
                        />
                      )}
                      <span className="price-per-hour">
                        R$ {pricePerHour.toFixed(2).replace(".", ",")}/h
                      </span>
                    </label>
                  );
                };

                return (
                  <div className="catalog-card" key={plan.id}>
                    <h4>{plan.label}: {plan.discount}% off</h4>

                    {disciplines.map(d => <DisciplineCheckbox key={d.label} discipline={d} />)}

                    <div className="total-mensal-box">
                      <strong className="total-amount">
                        R$ {(totaisPlanos[plan.id] || 0).toFixed(2).replace(".", ",")}
                      </strong>
                    </div>
                    <div className="total-mensal-box">
                      <strong className="total-amount" style={{color:"var(--vermelho-alaranjado)", fontSize:"1.2rem", textDecoration:"line-through"}}>
                        R${(totaisPlanosSemDesconto[plan.id] || 0).toFixed(2).replace(".", ",")}
                      </strong>
                    </div>

                    <a
                      href={isPlanSelected ? whatsappLink : "#"}
                      className="btn-dark"
                      onClick={e => {
                        const totalDistribuidas = Object.values(distribution).reduce((acc, val) => acc + val, 0);
                        if (!isPlanSelected || totalDistribuidas !== maxMonthlyLessons) {
                          e.preventDefault();
                          const button = e.currentTarget;
                          button.classList.add("flash-error");

                          if (totalDistribuidas < maxMonthlyLessons) {
                            showErrorMessage(plan.id, `Distribua todas as ${maxMonthlyLessons} aulas antes de contratar.`);
                          } else if (totalDistribuidas > maxMonthlyLessons) {
                            showErrorMessage(plan.id, `Você distribuiu ${totalDistribuidas} aulas, mas o limite é ${maxMonthlyLessons}. Ajuste antes de prosseguir.`);
                          }

                          setTimeout(() => {
                            if (button) button.classList.remove("flash-error");
                          }, 500);
                        }
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contratar
                    </a>

                    {errorMessages[plan.id] && (
                      <div className="error-box animate-error">{errorMessages[plan.id]}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
