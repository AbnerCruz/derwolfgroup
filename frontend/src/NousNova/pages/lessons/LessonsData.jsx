import { galaxyData } from "../courses/Math/GalaxyData";
// disciplinesList.js
export const disciplinesList = {
  math: { key: "math", label: "Matemática" },
  physics: { key: "physics", label: "Física" },
  chemistry: { key: "chemistry", label: "Química" },
  biology: { key: "biology", label: "Biologia" },
  portuguese: { key: "portuguese", label: "Português" },
  history: { key: "history", label: "História" },
  geography: { key: "geography", label: "Geografia" },
  philosophy: { key: "philosophy", label: "Filosofia" },
  sociology: { key: "sociology", label: "Sociologia" },
  music: { key: "music", label: "Música" },
  guitar: { key: "guitar", label: "Violão" },
  piano: { key: "piano", label: "Piano" },
  keyboard: { key: "keyboard", label: "Teclado" },
  violin: { key: "violin", label: "Violino" },
};


const lessonsData = {
  math: {
    title: "Aulas Particulares de Matemática",
    price: 60,
    subtitle: "Conheça nossas aulas de Matemática",
    discipline: disciplinesList.math.label,
    description: "Desenvolva raciocínio lógico, confiança e autonomia com aulas que ensinam a pensar, não decorar. Seja para provas, concursos ou superação pessoal, nossa metodologia investiga, conecta e treina até que o aluno domine de verdade.",
    quote: "Aqui, até quem odeia matemática aprende. Não por fórmulas prontas, mas por compreensão real.",
    coord: "0,0,0",

    sections: [
      {
        title: "Sobre as Aulas",
        content: "Matemática, para nós, é linguagem, é raciocínio. Ensinamos o aluno a pensar com clareza, a identificar padrões e resolver problemas com autonomia. Em vez de apenas simplificar o conteúdo, aprofundamos até que o aluno compreenda, e depois praticamos até que ele domine. A aprendizagem é ativa: o professor guia, questiona, desafia, mas nunca entrega tudo pronto. É o aluno quem aprende a chegar lá.",
      },
      {
        title: "Metodologia",
        content: [
          "Investigação lógica e histórica dos conceitos, o aluno reconstrói o conhecimento, passo a passo.",
          "Desenvolvemos materiais exclusivos e aprofundados para as aulas particulares, focado em raciocínio, construção conceitual e aplicação estratégica. Já nas aulas de reforço escolar, trabalhamos com os próprios materiais do aluno (apostilas, cadernos, livros), revisando o conteúdo que ele está estudando na escola e reforçando a compreensão a partir de suas necessidades imediatas.",
          "Exercícios de aplicação em grande quantidade, com acompanhamento, correção e orientação contínua.",
          "Oferecemos uma aula experimental para apresentar nossa metodologia ao aluno. Na aula inicial oficial, realizamos uma avaliação diagnóstica para identificar dificuldades, hábitos e definir metas personalizadas para o acompanhamento.",
        ]
      },
      {
        title: "Objetivos Personalizados",
        content: [
          "Preparação para ENEM, vestibulares e concursos públicos.",
          "Acompanhamento escolar e reforço de conteúdos vistos na escola.",
          "Desenvolvimento de raciocínio lógico, cálculo mental e resolução de problemas.",
          "Estímulo ao aprendizado por interesse, lazer ou superação de dificuldades anteriores (abandono escolar, traumas etc.).",
          "Preparação para cursos superiores que exigem base matemática sólida (engenharia, economia, física, TI, etc.).",
        ]
      },
      {
        title: "Por quê estudar?",
        content: [
          "Matemática é cobrada em quase todos os vestibulares e concursos do país.",
          "Profissões que exigem forte base matemática: engenharias, estatística, física, ciências atuariais, TI, economia, logística e muitas outras.",
          "No cotidiano: finanças pessoais, planejamento, investimentos, tomada de decisões, análise de dados, uso consciente de tecnologia.",
        ]
      },
      {
        title: "Modalidades e Agendamento",
        content: [
          "Disponível de forma presencial ou remota (via chamada Google Meet).",
          "Aulas individuais ou em grupo (pequenos), com nivelamento de habilidades.",
          "A primeira aula do plano é uma aula diagnóstica: nela o professor analisa o perfil e traça um plano de acompanhamento de acordo com os objetivos do estudante.",
          "Cursos online ou presenciais",
        ]
      }
    ],

    callToAction: {
      description: "Os horários são reservados mediante envio de comprovante. Confira os planos disponíveis e garanta sua vaga.",
      button: { label: "Planos", to: "/nousnova/private-lessons/prices" }
    },

    courses: galaxyData.math
  },
  physics: {
    title: "Aulas Particulares de Física",
    price: 70,
    subtitle: "Conheça nossas aulas de Física",
    discipline: disciplinesList.physics.label,
    description: "Transforme a Física em uma aliada do raciocínio, não em um obstáculo. Combinamos lógica, contexto histórico e aplicações reais para que o aluno compreenda profundamente os conceitos e consiga aplicá-los com confiança, seja na escola ou em provas desafiadoras.",
    quote: "A Física não é um bicho-papão. Quando compreendida, ela revela a beleza invisível do universo.",
    coord: "0,0,0",

    sections: [
      {
        title: "Sobre as Aulas",
        content: "A Física é mais do que fórmulas: é um modo de entender o mundo. Em nossas aulas, cada conceito é explorado de forma lógica, com experimentos mentais, analogias e conexão com o cotidiano. A proposta é sair da decoreba e entrar no campo da compreensão ativa e do raciocínio físico. Aqui o aluno aprende a pensar como um físico, passo a passo.",
      },
      {
        title: "Metodologia",
        content: [
          "Construção conceitual progressiva, com base em perguntas investigativas e contextos reais.",
          "Integração com a matemática: explicamos como aplicar raciocínio matemático sem depender de fórmulas decoradas.",
          "Utilização de esquemas, diagramas e analogias visuais para facilitar a compreensão e retenção.",
          "Acompanhamento contínuo com exercícios resolvidos em conjunto e desafios graduais.",
          "Aula experimental gratuita para apresentar a proposta; primeira aula oficial é diagnóstica, com levantamento de perfil e planejamento personalizado.",
        ]
      },
      {
        title: "Objetivos Personalizados",
        content: [
          "Dominar os fundamentos da Física Clássica: Cinemática, Dinâmica, Energia, Óptica e Termologia.",
          "Preparar-se para ENEM, vestibulares e concursos públicos com ênfase em interpretação e raciocínio.",
          "Reforçar conteúdos escolares com foco em provas e recuperação de notas.",
          "Explorar aplicações práticas e tecnológicas da física (robótica, engenharia, eletrônica).",
          "Desenvolver segurança para lidar com física no ensino superior (medicina, engenharia, TI, etc.).",
        ]
      },
      {
        title: "Por quê estudar?",
        content: [
          "Física é cobrada em todos os principais vestibulares e concursos públicos.",
          "É base essencial para cursos superiores de Engenharia, Medicina, Astronomia, Arquitetura e Ciências Exatas.",
          "Ajuda a desenvolver raciocínio lógico, visão sistêmica e pensamento crítico.",
          "Permite entender fenômenos do cotidiano e operar tecnologias com consciência.",
        ]
      },
      {
        title: "Modalidades e Agendamento",
        content: [
          "Aulas disponíveis no formato presencial ou remoto (Google Meet).",
          "Opções individuais ou em pequenos grupos, conforme o perfil do aluno.",
          "A primeira aula do plano é uma aula diagnóstica com análise de dificuldades e definição de estratégias.",
          "Flexibilidade de horários e possibilidade de combinar com aulas de matemática ou química.",
        ]
      }
    ],

    callToAction: {
      description: "Garanta sua vaga com antecedência. A agenda é limitada para garantir acompanhamento de qualidade. Clique abaixo para ver os planos disponíveis.",
      button: { label: "Planos", to: "/nousnova/private-lessons/prices" }
    },

    courses: galaxyData.physics
  },

};

export default lessonsData;

// model:{
//   title:"",
//   price: 0,
//   subtitle: "",
//   discipline: "Química",
//   description: "",
//   quote: "",
//   sections: [
//     {
//       title: "",
//       content: "",
//     },
//   ],
//   callToAction: {
//     description: "",
//     button: {label: "Planos", to: "/nousnova/private-lessons/prices"}
//   },
//   coord: "0,0,0",
// },

