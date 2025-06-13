import "../../styles/privateLessons.css";
import {Link} from "react-router-dom";
import { teachersArray } from "../Teachers";
import { TeacherCard } from "../Teachers";

const physicsTeachers = teachersArray.filter((teacher) => teacher.disciplines.includes("Física"));
function PhysicsLessons(){
    return (
        <div className="HomePageGlobalDiv">
        <div className="NousNovaLessons">
            {/* Título */}
            <section id="title">
            <h1>Aulas Particulares de Física</h1>
            <h3>Exploração guiada do universo e das leis naturais</h3>
            </section>

            {/* Descrição Geral */}
            <section>
            <h2>Sobre as Aulas</h2>
            <p>
                Na Nous Nova, oferecemos aulas particulares para estudantes do Ensino Fundamental e Médio.
                Nosso método é investigativo, voltado para o verdadeiro entendimento dos conteúdos.
                As aulas podem ser presenciais ou online ao vivo — com a mesma qualidade e atenção individual.
            </p>
            </section>

            {/* Duração e Horários */}
            <section>
            <h2>Duração e Horários</h2>
            <p>
                Cada aula tem 1 hora de duração. Os horários são flexíveis e definidos conforme a disponibilidade do aluno e do professor.
                Atendemos de segunda a sexta, das 13h às 18h.
            </p>
            </section>

            {/* Aulas Online */}
            <section>
            <h2>Aulas Online</h2>
            <p>
                As aulas online são realizadas por Google Meet com quadro digital, compartilhamento de tela e arquivos.
                Você terá o mesmo acompanhamento das aulas presenciais, com mais praticidade e economia de tempo.
            </p>
            </section>

            {/* Suporte Educacional */}
            <section>
            <h2>Suporte Educacional</h2>
            <p>
                Alunos com plano mensal têm acesso a suporte exclusivo via WhatsApp (segunda a sexta, 24h),
                com auxílio em dúvidas, exercícios e atividades. Todo material de apoio é incluso digitalmente.
            </p>
            </section>

            {/* Professores */}
            <section className="teachersSection">
              <h2>Nossos Professores</h2>
              <div className="card">
                <div>
                    {physicsTeachers.map((teacher) => (
                    <TeacherCard key={teacher.name} teacher={teacher} />
                    ))}
                </div>
              </div>
            </section>

            {/* Pagamento e Agendamento */}
            <section id="payments">
            <h2>Pagamento e Agendamento</h2>
            <p>
                O pagamento é feito adiantado e o horário é reservado após o envio do comprovante.
                Consulte os valores e agende um horário clicando no botão abaixo.
            </p>
            </section>

            {/* Chamada para ação */}
            <section id="button" style={{display:"flex",justifyContent:"flex-start"}}>
                <Link to="/nousNova/private-lessons/prices"><button className="card">Planos</button></Link>
            </section>
        </div>
        </div>
    )
}

export default PhysicsLessons;