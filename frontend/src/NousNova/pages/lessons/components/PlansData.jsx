// Arquivo: PlanData.jsx

export const PLANS_BY_GROUP = {
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

export function getMaxMonthlyLessons(planId) {
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
