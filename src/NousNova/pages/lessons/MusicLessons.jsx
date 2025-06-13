import "../../styles/privateLessons.css";
import { teachersArray } from "../Teachers";
import { TeacherCard } from "../Teachers";

const musicTeachers = teachersArray.filter((teacher) => teacher.disciplines.includes("Música"));
function MusicLessons(){
    return (
        <div className="HomePageGlobalDiv">
        <div className="NousNovaLessons">
            {/* Título */}
            <section id="title">
            <h1>Aulas Particulares de Música</h1>
            <h3>Aprenda com especialistas. Parceria oficial com a escola de música Dom Maior.</h3>
            <img src="/DomMaiorIcon.png"/>
            <div style={{marginTop: "30px",display:"flex", justifyContent:"flex-start", width:"100%"}}>
                <a href="https://escolademusicadommaior.com.br/" target="blank" style={{width:"70%"}}>
                    <button className="card" style={{width:"100%"}}>Visitar Site</button>
                </a>
            </div>
            </section>

            {/* Descrição Geral */}
            <section>
            <h2>Sobre as Aulas</h2>
            <p>
                Em parceria com a escola Dom Maior, oferecemos aulas particulares de música para alunos de todas as idades e níveis.
                As aulas são personalizadas, respeitando o ritmo e os objetivos de cada estudante — seja para desenvolver técnica, teoria musical ou simplesmente explorar sua expressão artística.
                Os encontros são presenciais com acompanhamento de alta qualidade.
            </p>
            </section>

            {/* Redes Sociais  */}
            <section>
            <h2>Redes Sociais</h2>
            <div className="galaxy-grid" style={{maxWidth: "70%"}}>
                <a href="https://www.instagram.com/dom_maior.rn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="blank">
                    <button className="card"><img src="/InstagramIcon.png" id="icon"/>Instagram</button>
                </a>
                <a href="https://www.facebook.com/espacomusicaldommaior/" target="blank">
                    <button className="card"><img src="/FacebookIcon.png" id="icon"/>Facebook</button>
                </a>
            </div>
            </section>

            {/* Duração e Horários */}
            <section>
            <h2>Duração e Horários</h2>
            <p>
                Cada aula tem 1 hora de duração — tempo para afinar o ouvido, a técnica e o coração.
                Os horários são flexíveis, combinados conforme sua disponibilidade e a do professor.
                Atendemos de segunda a sexta, das 8h às 11h e das 13h às 19h.
            </p>
            </section>

            {/* Professores */}
            <section className="teachersSection">
              <h2>Nossos Professores</h2>
              <div className="card">
                <div>
                    {musicTeachers.map((teacher) => (
                    <TeacherCard key={teacher.name} teacher={teacher} />
                    ))}
                </div>
              </div>
            </section>

            {/* Valores e Planos */}
            <section>
            <h2>Planos e Valores</h2>
                <p>Aula experimental: Gratuita</p>
            <ul>
                <ul>
                    <li style={{color:"#f0c040"}}>Aulas de: Piano / Teclado / Violão / Violino</li>
                    <li>Em grupo a partir de R$190,00</li>
                    <li>Individuais a partir de R$240,00</li>
                </ul>
            </ul>
            </section>

            {/* Pagamento e Agendamento */}
            <section id="payments">
            <h2>Pagamento e Agendamento</h2>
            <p>
                O pagamento é feito adiantado e o horário é reservado após o envio do comprovante.
                Entre em contato para mais informações.
            </p>
            </section>

            {/* Chamada para ação */}
            <section style={{display:"flex",justifyContent:"flex-start"}}>
                <a href="https://api.whatsapp.com/send/?phone=5518997954628&text=Ol%C3%A1%21+Eu+gostaria+de+informações+sobre+as+aulas+de+música.&type=phone_number&app_absent=0" target="blank" style={{width:"18%"}}>
                <button className="card" style={{width:"100%"}}>Mais Informações</button>
                </a>
            </section>
        </div>
        </div>
    )
}

export default MusicLessons;