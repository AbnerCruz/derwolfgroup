import { galaxyData } from "../courses/Math/GalaxyData";
import { NousNovaContactURL } from "../../WhatsappTextCreator";
import { DomMaiorContactURL } from "../../WhatsappTextCreator";
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
  english: {key:"english", label:"Inglês"},
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
    fromNous: true,
    contactURL: NousNovaContactURL,
    courses: galaxyData.math,

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
  },

  physics: {
    title: "Aulas Particulares de Física",
    price: 70,
    subtitle: "Conheça nossas aulas de Física",
    discipline: disciplinesList.physics.label,
    description: "Transforme a Física em uma aliada do raciocínio, não em um obstáculo. Combinamos lógica, contexto histórico e aplicações reais para que o aluno compreenda profundamente os conceitos e consiga aplicá-los com confiança, seja na escola ou em provas desafiadoras.",
    quote: "A Física não é um bicho-papão. Quando compreendida, ela revela a beleza invisível do universo.",
    coord: "0,0,0",
    fromNous: true,
    contactURL: NousNovaContactURL,
    courses: galaxyData.physics,

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
  },

  piano: {
    title: "Aulas Particulares de Piano",
    price: 75,
    subtitle: "Desperte sua musicalidade com o piano",
    discipline: disciplinesList.piano.label,
    description: "As aulas de piano combinam técnica, sensibilidade e teoria musical de forma integrada. Seja você iniciante ou já experiente, aqui desenvolvemos leitura, coordenação, percepção e repertório com acompanhamento próximo e adaptação ao seu ritmo.",
    quote: "Não se trata apenas de tocar notas — trata-se de comunicar emoção, dominar linguagem e moldar o tempo com as próprias mãos.",
    coord: "0,0,0",
    fromNous: false,
    contactURL: DomMaiorContactURL,
    courses: galaxyData.piano,


    sections: [
      {
        title: "Sobre as Aulas",
        content: "Nossas aulas de piano são planejadas para formar músicos completos: leitura, técnica, percepção auditiva e expressão artística são desenvolvidas de forma integrada. Respeitamos o tempo e os objetivos de cada aluno — seja o sonho de tocar músicas favoritas, ingressar em um conservatório ou simplesmente aprender por prazer, o caminho será estruturado, progressivo e prazeroso. O aluno não apenas repete, mas entende o que está tocando.",
      },
      {
        title: "Metodologia",
        content: [
          "Aprendizado gradual, adaptado ao nível e à idade do aluno: do iniciante absoluto ao pianista intermediário ou avançado.",
          "Integração entre teoria e prática desde as primeiras aulas: leitura de partitura, harmonia, percepção e técnica são ensinadas de forma conectada.",
          "Material didático selecionado com base no perfil e nos objetivos do aluno: métodos clássicos, repertórios modernos, peças populares e eruditas.",
          "Uso de tecnologia, gravações e exercícios auditivos para desenvolver precisão rítmica e afinação.",
          "A primeira aula é experimental. Na aula diagnóstica, avaliamos o conhecimento prévio, habilidades motoras e preferências musicais, traçando um plano personalizado de estudos.",
        ]
      },
      {
        title: "Objetivos Personalizados",
        content: [
          "Tocar piano por prazer, lazer ou desenvolvimento pessoal.",
          "Aprender a ler partituras e compreender a linguagem musical.",
          "Preparar-se para provas de aptidão musical, conservatórios ou universidades.",
          "Dominar técnica pianística: escalas, arpejos, acordes, independência das mãos.",
          "Aprimorar percepção auditiva, improvisação e interpretação musical.",
        ]
      },
      {
        title: "Por quê estudar?",
        content: [
          "O piano é um dos instrumentos mais completos e formativos: desenvolve coordenação, concentração, disciplina e sensibilidade.",
          "Serve como base sólida para músicos de qualquer instrumento, compositores, maestros ou arranjadores.",
          "Estimula o cérebro de forma integral: memória, lógica, criatividade e controle emocional.",
          "Permite tocar uma infinidade de repertórios: clássico, popular, gospel, trilhas sonoras, jazz, MPB, entre outros.",
        ]
      },
      {
        title: "Modalidades e Agendamento",
        content: [
          "Aulas presenciais (recomendadas para iniciantes e crianças) ou remotas (com câmera adequada para acompanhamento técnico).",
          "Individuais ou em pequenos grupos, com cronograma flexível conforme disponibilidade do aluno e professor.",
          "Plano inicial inclui aula diagnóstica para definir o nível técnico, repertório ideal e metas realistas.",
          "Opção de plano contínuo ou módulos específicos (como introdução à improvisação, harmonia funcional, preparação para provas etc.).",
        ]
      }
    ],

    callToAction: {
      description: "O estudo de piano exige constância e acompanhamento. Garanta sua vaga e comece seu desenvolvimento musical com excelência.",
      button: { label: "Planos", to: "/nousnova/private-lessons/prices" }
    },
  },

  keyboard: {
    title: "Aulas Particulares de Teclado",
    price: 70,
    subtitle: "Aprenda teclado com método prático e musical",
    discipline: disciplinesList.keyboard.label,
    description: "As aulas de teclado são voltadas para desenvolver autonomia musical desde o início. Com foco prático e dinâmico, unimos teoria, repertório, coordenação e criatividade em um processo adaptado ao seu perfil.",
    quote: "O teclado é uma porta de entrada acessível e poderosa para o universo da música moderna.",
    coord: "0,0,0",
    fromNous: false,
    contactURL: DomMaiorContactURL,
    courses: galaxyData.keyboard,

    sections: [
      {
        title: "Sobre as Aulas",
        content: "O teclado permite resultados rápidos e versatilidade. Nas aulas, o aluno aprende desde os fundamentos musicais até a execução de músicas populares, trilhas, louvores ou repertórios personalizados. Trabalhamos com leitura básica, cifras, percepção auditiva e acompanhamento harmônico, tudo de forma aplicada. O foco é tornar o aluno capaz de tocar com independência e prazer.",
      },
      {
        title: "Metodologia",
        content: [
          "Aulas práticas desde o primeiro encontro, com aprendizado por meio de músicas reais e objetivos definidos.",
          "Introdução progressiva à teoria musical (notas, acordes, escalas, ritmo) sem excesso de abstração.",
          "Ensino de cifras, leitura de pauta simplificada, harmonia funcional e desenvolvimento da mão esquerda para acompanhamento.",
          "Uso de tecnologia: aplicativos de apoio, playback, metrônomo e gravações para treino e autoavaliação.",
          "A primeira aula é experimental. Na aula diagnóstica, mapeamos o perfil e definimos o plano de estudo: repertório, nível técnico e metas.",
        ]
      },
      {
        title: "Objetivos Personalizados",
        content: [
          "Aprender teclado por lazer ou como instrumento de apoio para composição e canto.",
          "Tocar músicas populares, gospel, sertanejo, MPB, trilhas e outros estilos com segurança.",
          "Compreender os fundamentos de harmonia, escalas e formação de acordes para improvisação e arranjo.",
          "Desenvolver independência rítmica e coordenação motora.",
          "Se preparar para tocar em igrejas, bandas ou eventos sociais.",
        ]
      },
      {
        title: "Por quê estudar?",
        content: [
          "O teclado é acessível e versátil: ideal para iniciantes, músicos autodidatas e apoio em bandas.",
          "Permite tocar com acompanhamento harmônico completo, ideal para quem canta ou compõe.",
          "Desenvolve noções de ritmo, percepção e estrutura musical de forma aplicada.",
          "É uma ponte para aprofundamentos futuros: piano, harmonia funcional, produção musical etc.",
        ]
      },
      {
        title: "Modalidades e Agendamento",
        content: [
          "Aulas presenciais ou remotas, com foco em acompanhamento próximo e metas práticas.",
          "Individuais ou em grupos pequenos, com turmas organizadas por faixa etária ou objetivo.",
          "A aula diagnóstica traça o plano personalizado: repertório, técnica, leitura e objetivos.",
          "Planos contínuos ou módulos por temas (ex: teclado gospel, pop, teoria básica, etc.).",
        ]
      }
    ],

    callToAction: {
      description: "Quer aprender teclado de verdade? Reserve sua vaga, agende a aula experimental e descubra seu potencial musical.",
      button: { label: "Planos", to: "/nousnova/private-lessons/prices" }
    },
  },

};

export default lessonsData;