const whatsappBaseURL = "https://wa.me/5518996181770";

const disciplinaLabels = {
  Matematica: "Matemática",
  Musica: "Música",
  Fisica: "Física",
};

const planoLabels = {
  mensal1x: "1 aula semanal",
  mensal2x: "2 aulas semanais",
  mensal3x: "3 aulas semanais",
  semestral1x: "1 aula semanal (6 meses)",
  semestral2x: "2 aulas semanais (6 meses)",
  semestral3x: "3 aulas semanais (6 meses)",
  anual1x: "1 aula semanal (12 meses)",
  anual2x: "2 aulas semanais (12 meses)",
  anual3x: "3 aulas semanais (12 meses)",
};

/**
 * Formata mensagem de WhatsApp
 * @param {string[]} selections - Array de "Disciplina|planoId"
 * @param {boolean} group - Se aula em grupo está selecionada
 * @returns {string} URL do WhatsApp
 */
function criarWhatsappLink(selections, group) {
  if (!selections.length) return "";

  const [first] = selections;
  const [, plano] = first.split("|");
  const disciplinas = selections.map(item => item.split("|")[0]);

  let message = `Eu gostaria de assinar o plano - ${planoLabels[plano]}`;
  if (group) message += `\n- Em grupo`;
  message += `\nCom as disciplinas:`;

  disciplinas.forEach(d => {
    message += `\n - ${disciplinaLabels[d] || d}`;
  });

  return `${whatsappBaseURL}?text=${encodeURIComponent(message)}`;
}

export default criarWhatsappLink;
