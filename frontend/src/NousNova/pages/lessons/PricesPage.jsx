import { useState, useMemo } from "react";
import criarWhatsappLink from "../../WhatsappTextCreator";
import lessonsData from "../lessons/LessonsData";
import PriceCalculator from "../../PriceCalculator";
import PlanSelectionSection from "./components/PlanSelectionSection";
import SingleClassSection from "./components/SingleClassSection";
import PartnerSection from "./components/PartnerSection";
import "../../../styles/pages/nousNovaPages/prices.css";
import { PLANS_BY_GROUP, getMaxMonthlyLessons } from "./components/PlansData";

export default function PricesPage() {
  const [selectedTexts, setSelectedTexts] = useState(new Set());
  const [currentPlan, setCurrentPlan] = useState(null);
  const [groupLesson, setGroupLesson] = useState(false);
  const [distribution, setDistribution] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedTab, setSelectedTab] = useState("avulsas");

  const disciplines = useMemo(
    () =>
      Object.entries(lessonsData)
        .filter(([_, d]) => d.callToAction?.button?.to?.includes("prices"))
        .map(([key, d]) => ({
          key,
          label: d.discipline,
          basePrice: d.price ?? 50,
          fromNous: d.fromNous ?? true,
          contactURL: d.contactURL,
        })),
    []
  );

  const disciplinesFromNous = disciplines.filter((d) => d.fromNous);
  const disciplinesPartners = disciplines.filter((d) => !d.fromNous);
  const selectedArray = Array.from(selectedTexts);

  const whatsappLink = useMemo(
    () => criarWhatsappLink(selectedArray, groupLesson, distribution),
    [selectedArray, groupLesson, distribution]
  );

  const maxMonthlyLessons = currentPlan ? getMaxMonthlyLessons(currentPlan) : 0;

  const totaisPlanos = useMemo(() => {
    const totals = {};
    Object.values(PLANS_BY_GROUP).forEach((group) => {
      group.options.forEach((plan) => {
        const total = selectedArray.reduce((sum, text) => {
          const [disciplineLabel, planId] = text.split("|");
          if (planId !== plan.id) return sum;

          const discipline = disciplinesFromNous.find((d) => d.label === disciplineLabel);
          if (!discipline) return sum;

          const discount = discipline.fromNous ? plan.discount + (groupLesson ? 5 : 0) : 0;
          const pricePerHour = PriceCalculator(discipline.basePrice, discount, true);
          const qtd = distribution[disciplineLabel] || 0;

          return sum + pricePerHour * qtd;
        }, 0);

        totals[plan.id] = total;
      });
    });
    return totals;
  }, [selectedArray, distribution, groupLesson, disciplinesFromNous, currentPlan]);

  const totaisPlanosSemDesconto = useMemo(() => {
    const totals = {};
    Object.values(PLANS_BY_GROUP).forEach((group) => {
      group.options.forEach((plan) => {
        const total = selectedArray.reduce((sum, text) => {
          const [disciplineLabel, planId] = text.split("|");
          if (planId !== plan.id) return sum;

          const discipline = disciplinesFromNous.find((d) => d.label === disciplineLabel);
          if (!discipline) return sum;

          const qtd = distribution[disciplineLabel] || 0;

          return sum + discipline.basePrice * qtd;
        }, 0);

        totals[plan.id] = total;
      });
    });
    return totals;
  }, [selectedArray, distribution, disciplinesFromNous]);

  const showErrorMessage = (planId, message) => {
  setErrorMessages({ [planId]: message });
  setTimeout(() => {
    setErrorMessages((prev) => {
      const copy = { ...prev };
      delete copy[planId];
      return copy;
    });
  }, 5000);
};




  return (
    <div className="PricesPage">
      <header className="prices-header">
        <h1>Consultar Valores</h1>
        <h3>Encontre planos acessíveis, disciplinas personalizadas e liberdade para montar sua grade de estudos.</h3>
        <div className="tab-selector">
          <button
            onClick={() => setSelectedTab("avulsas")}
            className={selectedTab === "avulsas" ? "active" : ""}
          >
            Aulas Avulsas
          </button>
          <button
            onClick={() => setSelectedTab("planos")}
            className={selectedTab === "planos" ? "active" : ""}
          >
            Planos Nous Nova
          </button>
          <button
            onClick={() => setSelectedTab("parceiros")}
            className={selectedTab === "parceiros" ? "active" : ""}
          >
            Planos Parceiros
          </button>
        </div>
      </header>

      {selectedTab === "avulsas" && (
        <SingleClassSection
          disciplinesFromNous={disciplinesFromNous}
          disciplinesPartners={disciplinesPartners}
        />
      )}

      {selectedTab === "planos" && (
        <PlanSelectionSection
          PLANS_BY_GROUP={PLANS_BY_GROUP}
          disciplinesFromNous={disciplinesFromNous}
          selectedTexts={selectedTexts}
          setSelectedTexts={setSelectedTexts}
          currentPlan={currentPlan}
          setCurrentPlan={setCurrentPlan}
          groupLesson={groupLesson}
          setGroupLesson={setGroupLesson}
          distribution={distribution}
          setDistribution={setDistribution}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
          showErrorMessage={showErrorMessage}
          whatsappLink={whatsappLink}
          maxMonthlyLessons={maxMonthlyLessons}
          totaisPlanos={totaisPlanos}
          totaisPlanosSemDesconto={totaisPlanosSemDesconto}
        />
      )}

      {selectedTab === "parceiros" && <PartnerSection disciplinesPartners={disciplinesPartners} />}
    </div>
  );
}
