export const NousNovaContactURL = "https://wa.me/5518996181770";
export const DomMaiorContactURL = "https://wa.me/5518997954628";

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
 * @param {string[]} selections - Array no formato "Disciplina|planoId", ou "Disciplina|avulsa", ou "Disciplina|experimental"
 * @param {boolean} group - Aula em grupo
 * @param {object} distribution - { disciplinaLabel: quantidadeDeAulas }
 * @returns {string} URL completa para WhatsApp
 */

function criarWhatsappLink(selections, group, distribution, baseURL = NousNovaContactURL) {
  if (!selections?.length) return baseURL;

  const tiposEspeciais = ["avulsa", "experimental"];
  const mensagens = [];

  for (const sel of selections) {
    const [disciplina, planoId] = sel.split("|");
    const nomeDisc = disciplinaLabels[disciplina] || disciplina;
    const qtd = distribution?.[disciplina] || 1;

    if (tiposEspeciais.includes(planoId)) {
      if (planoId === "avulsa") {
        mensagens.push(`Gostaria de agendar uma aula **avulsa** de *${nomeDisc}* (${qtd} aula${qtd > 1 ? "s" : ""}).`);
      }
      if (planoId === "experimental") {
        mensagens.push(`Gostaria de agendar uma **aula experimental** de *${nomeDisc}*.`);
      }
    } else {
      const planoNome = planoLabels[planoId] || planoId;
      let linha = `- ${nomeDisc}: ${qtd} aula(s) por mês`;
      mensagens.push({ tipo: "plano", plano: planoNome, linha });
    }
  }

  const planos = mensagens.filter(m => typeof m === "object");
  const avulsasOuExp = mensagens.filter(m => typeof m === "string");

  let corpoMsg = "";

  if (planos.length > 0) {
    const planoNome = planos[0].plano;
    corpoMsg += `Olá, gostaria de contratar o seguinte plano:\n`;
    corpoMsg += `${planoNome}\n`;
    if (group) corpoMsg += `- Aula em grupo (com 5% de desconto extra)\n`;
    corpoMsg += `Disciplinas e quantidade de aulas por mês:\n`;
    corpoMsg += planos.map(p => p.linha).join("\n");
    corpoMsg += `\n`;
  }

  if (avulsasOuExp.length > 0) {
    corpoMsg += avulsasOuExp.join("\n") + "\n";
  }

  corpoMsg += `\nPor favor, me envie as informações para prosseguir. Obrigado!`;

  return `${baseURL}?text=${encodeURIComponent(corpoMsg)}`;
}


export default criarWhatsappLink;
