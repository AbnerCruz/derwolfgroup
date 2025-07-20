import React from "react";
import PriceCalculator from "../../../PriceCalculator";

export default function DisciplineSelector({
  plan,
  disciplines,
  selectedTexts,
  setSelectedTexts,
  currentPlan,
  setCurrentPlan,
  groupLesson,
  distribution,
  setDistribution,
  maxMonthlyLessons,
  totaisPlanos,
  totaisPlanosSemDesconto,
  whatsappLink,
  showErrorMessage,
  errorMessage,
  agendar,
}) {
  const selectedArray = Array.from(selectedTexts);

  const handleCheckboxChange = (e) => {
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

    setSelectedTexts((prev) => {
      const copy = new Set(prev);
      if (checked) {
        if (currentQuantity === 0 && totalLessons >= maxMonthlyLessons) return prev;
        copy.add(value);
        setDistribution((dist) => {
          if ((dist[discipline] ?? 0) > 0) return dist;
          return { ...dist, [discipline]: 1 };
        });
      } else {
        copy.delete(value);
        setDistribution((dist) => {
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

    setDistribution((prev) => {
      const newDist = { ...prev };
      if (number > 0) {
        newDist[discipline] = number;
      } else {
        delete newDist[discipline];
      }
      return newDist;
    });

    setSelectedTexts((prev) => {
      const newSelected = new Set(prev);
      if (number === 0) {
        for (const text of prev) {
          const [discKey] = text.split("|");
          if (discKey === discipline) newSelected.delete(text);
        }
      }
      return newSelected;
    });
  };

  return (
    <div className="prices-card">
      <h4>
        {plan.num} Aulas Por Mês: <span className="discount-badge">- {plan.discount}%</span>
      </h4>

      {disciplines.map((discipline) => {
        const value = `${discipline.key}|${plan.id}`;
        const isChecked = selectedTexts.has(value);

        const discount = plan.discount;
        const finalDiscount = discipline.fromNous ? discount + (groupLesson ? 5 : 0) : 0;
        const pricePerHour = PriceCalculator(discipline.basePrice, finalDiscount, true);

        return (
          <label key={value} className="discipline-checkbox">
            <input
              type="checkbox"
              value={value}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {isChecked && (
              <input
                type="number"
                min="0"
                max={maxMonthlyLessons}
                placeholder="Aulas/mês"
                value={distribution[discipline.key] ?? ""}
                onChange={(e) => handleDistributionChange(discipline.key, e.target.value)}
                className="aula-distribution-input"
              />
            )}
            <div className="discipline-content">
              <span className="discipline-label">{discipline.label}</span>
              <span className="price-per-hour">
                R$ {pricePerHour.toFixed(2).replace(".", ",")}/h
              </span>
            </div>
          </label>
        );
      })}

      <div className="total-mensal-box">
        <strong className="total-amount">
          R$ {(totaisPlanos[plan.id] || 0).toFixed(2).replace(".", ",")}
        </strong>
      </div>
      <div className="total-mensal-box">
        <strong
          className="total-amount"
          style={{
            color: "var(--vermelho-alaranjado)",
            fontSize: "1.2rem",
            textDecoration: "line-through",
          }}
        >
          R${(totaisPlanosSemDesconto[plan.id] || 0).toFixed(2).replace(".", ",")}
        </strong>
      </div>

    <button
      className="btn-dark"
      onClick={(e) => {
        e.preventDefault();
        const button = e.currentTarget;
        const totalDistribuidas = Object.values(distribution).reduce((a, b) => a + b, 0);
        const hasDisciplines = selectedArray.some((t) => t.includes(plan.id));

        let errorMessage = null;

        if (!hasDisciplines) {
          errorMessage = "Selecione pelo menos uma disciplina.";
        } else if (totalDistribuidas < maxMonthlyLessons) {
          errorMessage = `Distribua todas as ${maxMonthlyLessons} aulas antes de prosseguir.`;
        } else if (totalDistribuidas > maxMonthlyLessons) {
          errorMessage = `Você distribuiu ${totalDistribuidas} aulas, mas o limite é ${maxMonthlyLessons}. Ajuste antes de prosseguir.`;
        }

        if (errorMessage) {
          button.classList.add("flash-error");
          showErrorMessage(plan.id, errorMessage);
          setTimeout(() => button.classList.remove("flash-error"), 500);
        } else {
          agendar(); // ✅ Redireciona com os dados para a página de agendamento
        }
      }}
    >
      Agendar Aulas
    </button>


    {errorMessage && (
  <div className="error-box animate-error">
        {errorMessage}
    </div>
    )}


    </div>
  );
}
