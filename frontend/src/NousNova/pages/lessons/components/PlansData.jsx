// Arquivo: PlanData.jsx
export const BENEFITS = [
  //Nivel 1
  { id: 1, description: "Horários Flexíveis", level: 1, variation: false, type: 0},
  { id: 2, description: "Grupo de Dúvidas (WhatsApp)", level: 1, variation: false, type: 0},
  { id: 3, description: "Garantia de 7 Dias", level: 1, variation: true, type: 1},
  { id: 4, description: "Material Complementar", level: 1, variation: false, type: 0},
  //Nivel 2
  { id: 5, description: "Reposição de Aulas", level: 2, variation: false, type: 0},
  { id: 6, description: "Plano de Estudos Personalizado", level: 2, variation: false, type: 0},
  { id: 7, description: "Avaliação Mensal de Desempenho", level: 2, variation: false, type: 0},
  { id: 8, description: "Participação em eventos", level: 2, variation: false, type: 0},
  { id: 9, description: "Acesso Parcial a Cursos Nous Nova", level: 2, variation: true, type: 2},
  { id: 10, description: "Garantia de 30 Dias", level: 2, variation: true, type: 1},
  //Nivel 3
  { id: 11, description: "Mentoria Particular Contínua", level: 3, variation: false, type: 0},
  { id: 12, description: "Acesso Completo a Cursos Nous Nova", level: 3, variation: true, type: 2},
  { id: 13, description: "Aulas Sem Agrupamento", level: 3, variation: false, type: 0},
  { id: 14, description: "Garantia de 6 meses", level: 3, variation: true, type: 1},
];


export const PLANS_BY_GROUP = {
  anual: {
    label: "Plano Anual",
    level: 3,
    options: [
      { id: "anual1x", num:4, discount: 30 },
      { id: "anual2x", num:8, discount: 35 },
      { id: "anual3x", num:12, discount: 40 },
    ],
    recommended: true,
  },
  semestral: {
    label: "Plano Semestral",
    level: 2,
    options: [
      { id: "semestral1x", num:4, discount: 20 },
      { id: "semestral2x", num:8, discount: 25 },
      { id: "semestral3x", num:12, discount: 30 },
    ],
  },
  mensal: {
    label: "Plano Mensal",
    level: 1,
    options: [
      { id: "mensal1x", num:4, discount: 5 },
      { id: "mensal2x", num:8, discount: 10 },
      { id: "mensal3x", num:12, discount: 15 },
    ],
  },
};


export function getBenefitsByLevel(level) {
  const eligible = BENEFITS.filter(b => b.level <= level);
  const ineligible = BENEFITS.filter(b => b.level > level);

  const included = [];
  const excluded = [];

  const includedVariations = new Map();
  const excludedVariations = new Map();

  // Incluídos
  for (const b of eligible) {
    if (b.variation) {
      const existing = includedVariations.get(b.type);
      if (!existing || b.level > existing.level) {
        includedVariations.set(b.type, b);
      }
    } else {
      included.push(b);
    }
  }

  // Excluídos
  for (const b of ineligible) {
    if (b.variation) {
      const alreadyIncluded = includedVariations.get(b.type);
      if (!alreadyIncluded) {
        const existing = excludedVariations.get(b.type);
        if (!existing || b.level > existing.level) {
          excludedVariations.set(b.type, b);
        }
      }
    } else {
      excluded.push(b);
    }
  }

  included.push(...includedVariations.values());
  excluded.push(...excludedVariations.values());

  // Ordenação
  included.sort((a, b) => a.level - b.level || a.id - b.id);
  excluded.sort((a, b) => a.level - b.level || a.id - b.id);

  // Saída unificada
  return [
    ...included.map(b => `✅ ${b.description}`),
    ...excluded.map(b => `❌ ${b.description}`),
  ];
}

export function getMaxMonthlyLessons(planId) {
  for (const group of Object.values(PLANS_BY_GROUP)) {
    for (const option of group.options) {
      if (option.id === planId) {
        return option.num || 0;
      }
    }
  }
  return 0;
}
