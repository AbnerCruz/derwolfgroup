const whatsappBaseURL = "https://wa.me/5518996181770";

const disciplinaLabels = {
  Matematica: "Matemática",
  Musica: "Música",
  Fisica: "Física",
};

const planoLabels = {
  mensal1x: "4 aulas mensais (Plano Mensal)",
  mensal2x: "8 aulas mensais (Plano Mensal)",
  mensal3x: "12 aulas mensais (Plano Mensal)",
  semestral1x: "4 aulas mensais (Plano Semestral - 6 meses)",
  semestral2x: "8 aulas mensais (Plano Semestral - 6 meses)",
  semestral3x: "12 aulas mensais (Plano Semestral - 6 meses)",
  anual1x: "4 aulas mensais (Plano Anual - 12 meses)",
  anual2x: "8 aulas mensais (Plano Anual - 12 meses)",
  anual3x: "12 aulas mensais (Plano Anual - 12 meses)",
};

/**
 * Cria mensagem detalhada para WhatsApp
 * @param {string[]} selections - Array "Disciplina|planoId"
 * @param {boolean} group - Aula em grupo
 * @param {object} distribution - { disciplinaLabel: quantidadeDeAulas }
 * @returns {string} URL completa para WhatsApp
 */
function criarWhatsappLink(selections, group, distribution) {
  if (!selections.length) return "";

  // Extrair plano do primeiro item (assume que todos são do mesmo plano)
  const [, planoId] = selections[0].split("|");
  const planoNome = planoLabels[planoId] || planoId;

  // Mapear disciplinas e quantidades usando o distribution
  let disciplinasDetalhadas = selections.map(sel => {
    const [disciplina] = sel.split("|");
    const nomeDisc = disciplinaLabels[disciplina] || disciplina;
    const qtd = distribution[disciplina] || 0;
    return `- ${nomeDisc}: ${qtd} aula(s) por mês`;
  });

  // Remover duplicatas (caso haja)
  disciplinasDetalhadas = [...new Set(disciplinasDetalhadas)];

  // Montar mensagem
  let mensagem = `Olá, gostaria de contratar o seguinte plano:\n`;
  mensagem += `${planoNome}\n`;
  if (group) mensagem += `- Aula em grupo (com 5% de desconto extra)\n`;
  mensagem += `Disciplinas e quantidade de aulas por mês:\n`;
  mensagem += disciplinasDetalhadas.join("\n");
  mensagem += `\n\nPor favor, me envie as informações para prosseguir com a contratação. Obrigado!`;

  // Retornar URL com texto codificado
  return `${whatsappBaseURL}?text=${encodeURIComponent(mensagem)}`;
}


export default criarWhatsappLink;
