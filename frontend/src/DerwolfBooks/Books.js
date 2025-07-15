export const genre = ["Conto", "Crônica", "Fábula", "Guias/Manuais", "Artigos de Opinião", "Ensaio Reflexivo"];
export const subGenre = ["Fantasia", "Drama", "Filosofia", "Espiritualidade", "Religião", "Comédia", "Épico"];
const livros = [
  {
    id: 1,
    nome: "O Solitário Pastor de Ovelhas",
    descricao: "Ben Ahfkael narra a história do solitário pastor de ovelhas, cujo cotidiano tranquilo é marcado por memórias, perdas e um encontro misterioso à beira do lago sagrado Sky Mirror. Entre o silêncio das águas e a solidão das colinas, ele revela emoções profundas e a conexão delicada entre passado e presente, amizade e esperança, numa prosa que eterniza a alma de Uriath.",
    arquivo: "/DerwolfBooks/Books/O_Solitario_Pastor_de_Ovelhas.pdf",
    imagem: "/DerwolfBooks/Books/O_Solitario_Pastor_de_Ovelhas.png",
    filtros: {
      genre: "Conto",
      subGenre: ["Fantasia", "Drama"],
    },
    nota: 9.05,
    disponivel: true,
  },
  {
    id: 2,
    nome: "Uriath Gênese",
    descricao: "",
    arquivo: "/DerwolfBooks/Books/Uriath_Genesis.pdf",
    imagem: "/DerwolfBooks/Books/Uriath_Genesis.png",
    filtros: {
      genre: "",
      subGenre: [],
    },
    nota: 0,
    disponivel: false,
  },
  {
    id: 3,
    nome: "Estrada Para Danfim",
    descricao: "Ben Ahfkael narra a Plendor, seu rei e amigo, um fragmento do sonho que nunca pôde viver: a árdua jornada por uma estrada esquecida em Uriath. Entre pedras e gemidos, exércitos, amantes e fugitivos deixaram suas marcas. É a história de um caminho antigo, de companhias cansadas e destinos incertos, onde a esperança é uma miragem e a memória, o último refúgio dos que não empunham espada.",
    arquivo: "/DerwolfBooks/Books/Estrada_Para_Danfim.pdf",
    imagem: "/DerwolfBooks/Books/Estrada_Para_Danfim.png",
    filtros: {
      genre: "Conto",
      subGenre: ["Fantasia","Drama"],
    },
    nota: 9.25,
    disponivel: true,
  },
  {
    id: 4,
    nome: "Fundação de Caryndor",
    descricao: "Ben Ahfkael narra com reverência e precisão a história de Caryn Ashik, uma mulher que, em meio à guerra e à fuga, ascendeu de refugiada a líder visionária. Contando com a promessa feita ao seu amigo, o Rei Plendor, Ben transporta o leitor para as terras de Caryndor, mostrando a queda do reino e a força das mulheres que o governaram, preservando a memória viva de um tempo marcado por luta, esperança e transformação.",
    arquivo: "/DerwolfBooks/Books/Fundacao_de_Caryndor.pdf",
    imagem: "/DerwolfBooks/Books/Fundacao_de_Caryndor.png",
    filtros: {
      genre: "Conto",
      subGenre: ["Fantasia", "Drama"],
    },
    nota: 8.6,
    disponivel: true,
  },
  {
    id: 5,
    nome: "O Lago",
    descricao: "Ben Ahfkael narra a Plendor, seu velho amigo e rei sedento por Uriath, a jornada espiritual e física que o levou a cruzar territórios desconhecidos, enfrentar a guerra e vivenciar o silêncio profundo das batalhas. Relata o peso da memória viva, o encontro com a beleza imprevista após o conflito e a consciência amarga da mortalidade dos companheiros. Seu testemunho é uma oferenda sincera que transcende o tempo e preserva a alma pulsante de Uriath.",
    arquivo: "/DerwolfBooks/Books/O_Lago.pdf",
    imagem: "/DerwolfBooks/Books/O_Lago.png",
    filtros: {
      genre: "Conto",
      subGenre: ["Fantasia","Drama","Filosofia","Guerras"],
    },
    nota: 10,
    disponivel: true,
  },
  {
    id: 6,
    nome: "Thyra",
    descricao: "",
    arquivo: "/DerwolfBooks/Books/Thyra.pdf",
    imagem: "/DerwolfBooks/Books/Thyra.png",
    filtros: {
      genre: "",
      subGenre: [],
    },
    nota: 0,
    disponivel: false,
  },
  {
    id: 7,
    nome: "O Observador",
    descricao: "Ben Ahfkael narra, com voz carregada de emoção e respeito, as histórias que testemunhou nas terras de Uriath. Dedicadas a Plendor, seu rei e amigo, suas palavras revelam encontros com figuras enigmáticas como Mikhael, o Observador, cuja missão é testemunhar o mundo sem interferir. Entre sombras e silêncios, Ben registra a essência das vidas ocultas e as duras realidades que o tempo insiste em ocultar.",
    arquivo: "/DerwolfBooks/Books/O_Observador.pdf",
    imagem: "/DerwolfBooks/Books/O_Observador.png",
    filtros: {
      genre: "Conto",
      subGenre: ["Filosofia","Espiritualidade","Drama","Fantasia"],
    },
    nota: 9.1,
    disponivel: true,
  },
  {
    id: 8,
    nome: "O Cântico de Melissa",
    descricao: "Ben Ahfkael narra com precisão solene a saga trágica de Melissa e Sabrina, filhas de um reino marcado por pactos sombrios e destinos entrelaçados. Ele revela o preço da salvação, a corrupção da inocência e a luta silenciosa entre luz e sombra, evidenciando o drama de almas condenadas a servir forças antigas. Através de seu relato, o passado esquecidose torna voz viva, e a memória, instrumento de poder e mistério.",
    arquivo: "/DerwolfBooks/Books/O_Cantico_De_Melissa.pdf",
    imagem: "/DerwolfBooks/Books/O_Cantico_De_Melissa.png",
    filtros: {
      genre: "Conto",
      subGenre: ["Drama", "Fantasia"],
    },
    nota: 8.7,
    disponivel: true,
  },
  {
    id: 9,
    nome: "O Grito da Floresta",
    descricao: "Ben Ahfkael narra, dirigindo-se a Plendor, um episódio ocorrido no rigoroso continente de Laekage, onde a jovem Alissa demonstra coragem ímpar ao enfrentar perigos da floresta para salvar o menino Eiran, ameaçado por lobos ferozes. Em meio à natureza implacável e ao inverno severo, ele revela o valor da justiça ativa e da bravura tranquila, capturando a essência da luta humana pela sobrevivência e dignidade num mundo hostil.",
    arquivo: "/DerwolfBooks/Books/O_Grito_da_Floresta.pdf",
    imagem: "/DerwolfBooks/Books/O_Grito_da_Floresta.png",
    filtros: {
      genre: "Conto",
      subGenre: ["Fantasia", "Épico"],
    },
    nota: 8.3,
    disponivel: true,
  },
  {
    id: 10,
    nome: "A Justiça e a Bondade de Deus na Bíblia",
    descricao: "Reflexão contundente sobre a justiça e bondade de Deus na Bíblia, confrontando a ideia de que o Deus do Antigo Testamento seria cruel, em contraste com o Novo. A análise revela que não há contradição moral, mas um intervalo de graça no tempo. Deus não mudou — é justo, santo e misericordioso, e Seus juízos são atos de purificação, não de genocídio. A ira divina permanece viva, aguardando seu tempo escatológico.",
    arquivo: "/DerwolfBooks/Books/A_Justiça_e_a_Bondade_de_Deus_na_Bíblia.pdf",
    imagem: "/DerwolfBooks/Books/A_Justiça_e_a_Bondade_de_Deus_na_Bíblia.png",
    filtros: {
      genre: "Ensaio Reflexivo",
      subGenre: ["Religião", "Espiritual"],
    },
    nota: 8.9,
    disponivel: true,
  },
];

export default livros;

//Faça uma descrição de 500 caracteres no sentido de "Ben Ahfkael narra sobre..."




//
//De acordo com as opções a seguir quero que você classifique o livro em anexo
//genre = ["Conto", "Crônica", "Fábula", "Manuais", "Artigos de Opinião", "Ensaio Reflexivo"];
//subGenre = ["Fantasia", "Drama", "Filosofia", "Espiritualidade", "Guerras", "Religião"]; (Pode ser mais de um subGenre)
//






// Você é um avaliador técnico de histórias para a plataforma Derwolf Books. Sua função é atribuir notas de 0 a 10 em 5 critérios abaixo, com base na história que será apresentada a seguir. Depois, calcule a nota final com os pesos indicados.

// Avalie os seguintes critérios:

// 1. Originalidade & Criatividade (20%)
// - A história tem um enredo original, interessante, sem parecer um clichê?

// 2. Qualidade Narrativa (25%)
// - O texto tem começo, meio e fim claros? Os personagens são bem desenvolvidos? O ritmo e a coesão prendem o leitor?

// 3. Gramática & Estilo (15%)
// - O texto está bem escrito? Sem erros gramaticais, com boa fluidez e clareza?

// 4. Profundidade Temática (20%)
// - A obra transmite uma mensagem relevante, explora temas interessantes, faz pensar?

// 5. Autenticidade & Produção (20%)
// - A história parece ter sido escrita por um humano? A escrita parece natural ou gerada por IA? Há sinais de edição e cuidado?

// Apresente o resultado final da seguinte forma:

// - Originalidade: X/10  
// - Narrativa: X/10  
// - Gramática: X/10  
// - Profundidade: X/10  
// - Autenticidade: X/10  
// - **Nota Final (com cálculo de pesos): X/10**
// - Classificação qualitativa (ex: “Obra-prima”, “Excelente”, “Boa”, etc.)

// Agora avalie a seguinte história:

