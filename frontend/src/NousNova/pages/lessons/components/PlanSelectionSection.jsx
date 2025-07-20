import React, { useState } from "react";
import DisciplineSelector from "./DisciplineSelector";
import "../../../../styles/components/plan-selection-section.css";
import { getBenefitsByLevel } from "./PlansData";
import { useNavigate } from "react-router-dom";


function GroupHeader({ label, recommended }) {
  return (
    <h3 className="plan-title">
      {label}
      {recommended && <span className="recommended">★ Recomendado</span>}
    </h3>
  );
}

function BenefitsList({ benefits }) {
  return (
    <ul className="benefits">
      {benefits.map((benefit, i) => (
        <li key={i}>{benefit}</li>
      ))}
    </ul>
  );
}

function PlanGroup({
  group,
  disciplinesFromNous,
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
  errorMessages,
  goPrev,
  goNext,
  currentIndex,
  totalGroups,
  agendar,
}) {
  return (
    <div className="plan-group">
      <GroupHeader label={group.label} recommended={group.recommended} />


      <BenefitsList benefits={getBenefitsByLevel(group.level)} />
      <div className="plan-group-navigation">
        <button onClick={goPrev} aria-label="Grupo anterior">
          &lt; Anterior
        </button>
        <span className="plan-group-indicator">
          {group.label} ({currentIndex + 1} / {totalGroups})
        </span>
        <button onClick={goNext} aria-label="Próximo grupo">
          Próximo &gt;
        </button>
      </div>

      {group.options.map((plan) => (
        <DisciplineSelector
          key={plan.id}
          plan={plan}
          disciplines={disciplinesFromNous}
          selectedTexts={selectedTexts}
          setSelectedTexts={setSelectedTexts}
          currentPlan={currentPlan}
          setCurrentPlan={setCurrentPlan}
          groupLesson={groupLesson}
          distribution={distribution}
          setDistribution={setDistribution}
          maxMonthlyLessons={maxMonthlyLessons}
          totaisPlanos={totaisPlanos}
          totaisPlanosSemDesconto={totaisPlanosSemDesconto}
          whatsappLink={whatsappLink}
          showErrorMessage={showErrorMessage}
          errorMessage={errorMessages[plan.id]}
          agendar={agendar}
        />
      ))}
    </div>
  );
}


export default function PlanSelectionSection({
  disciplinesFromNous,
  PLANS_BY_GROUP,
  selectedTexts,
  setSelectedTexts,
  currentPlan,
  setCurrentPlan,
  groupLesson,
  setGroupLesson,
  distribution,
  setDistribution,
  totaisPlanos,
  totaisPlanosSemDesconto,
  whatsappLink,
  maxMonthlyLessons,
  errorMessages,
  showErrorMessage,
}) {
  const groupKeys = Object.keys(PLANS_BY_GROUP);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentGroup = PLANS_BY_GROUP[groupKeys[currentGroupIndex]];
  const navigate = useNavigate();
  
  function agendar(){
    const selectedData = {
      selectedPlan: currentPlan,
      selectedTexts: Array.from(selectedTexts), //disciplina|plano
      distribution, //distribuição das aulas entre as disciplinas
    }
    navigate("/nousnova/private-lessons/prices/scheduling", {state: selectedData})
  }
  
  function goPrev() {
    setCurrentGroupIndex((i) => (i === 0 ? groupKeys.length - 1 : i - 1));
  }

  function goNext() {
    setCurrentGroupIndex((i) => (i === groupKeys.length - 1 ? 0 : i + 1));
  }

  return (
    <section className="plans-section" id="subscriptions">
      <h2>Disciplinas Nous Nova</h2>

      {/* <label className="group-checkbox">
        <input
          type="checkbox"
          checked={groupLesson}
          onChange={(e) => setGroupLesson(e.target.checked)}
        />
        Aula em grupo (ganhe 5% de desconto)
      </label> */}

      <PlanGroup
        group={currentGroup}
        disciplinesFromNous={disciplinesFromNous}
        selectedTexts={selectedTexts}
        setSelectedTexts={setSelectedTexts}
        currentPlan={currentPlan}
        setCurrentPlan={setCurrentPlan}
        groupLesson={groupLesson}
        distribution={distribution}
        setDistribution={setDistribution}
        maxMonthlyLessons={maxMonthlyLessons}
        totaisPlanos={totaisPlanos}
        totaisPlanosSemDesconto={totaisPlanosSemDesconto}
        whatsappLink={whatsappLink}
        showErrorMessage={showErrorMessage}
        errorMessages={errorMessages}
        goPrev={goPrev}
        goNext={goNext}
        currentIndex={currentGroupIndex}
        totalGroups={groupKeys.length}
        agendar={agendar}
      />

    </section>
    
  );
}

