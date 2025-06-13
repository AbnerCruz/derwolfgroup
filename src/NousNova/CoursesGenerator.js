//Prompts

//To generate Descriptions
  // Crie uma descrição breve, chamativa e informativa para um capítulo de material didático. A descrição deve:
  // Ter no máximo 2 ou 3 linhas.
  // Explicar de forma simples o que o aluno aprenderá.
  // Destacar a utilidade prática ou acadêmica do conteúdo.
  // Usar linguagem acessível e engajante, mantendo tom didático e motivador.
  // Estrutura sugerida:
  // Comece com um verbo no imperativo (ex: descubra, entenda, aprenda, explore...).
  // Mencione o tema principal da seção.
  // Encerre com a relevância prática ou acadêmica do conteúdo.



function GenerateCourse({
  id,
  name,
  motivation,
  price,
  discount,
  description,
  disponivel = false,

  // Landing Page
  problemTitle,
  problemContent,
  solutionTitle,
  solutionContent,
  courseContentsTitle,
  courseContentsContent = [],
  socialProofTitle,
  socialProofContent = [],
  freeVideoDemonstrationTitle,
  freeVideoDemonstrationContent,
  freeVideoID = "",
  callToActionTitle,
  checkOutURL,
  FAQTitle,
  FAQContent = [],
}) {
  return {
    id,
    name,
    motivation,
    price,
    discount,
    description,
    disponivel,

    // Landing Page
    problemTitle,
    problemContent,
    solutionTitle,
    solutionContent,
    courseContentsTitle,
    courseContentsContent: courseContentsContent.map(content => ({ content })),
    socialProofTitle,
    socialProofContent: socialProofContent.map(image => ({ image })),
    freeVideoDemonstrationTitle,
    freeVideoDemonstrationContent,
    freeVideoDemonstrationURL: `https://www.youtube.com/embed/${freeVideoID}`,
    callToActionTitle,
    checkOutURL,
    FAQTitle,
    FAQContent: FAQContent.map(({ question, answer }) => ({ question, answer })),
  };
}

export default GenerateCourse;