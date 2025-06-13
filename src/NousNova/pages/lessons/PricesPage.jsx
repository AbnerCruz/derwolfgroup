import "../../styles/privateLessons.css";
import { useState } from 'react';
import PriceCalculator from "../../PriceCalculator";
import criarWhatsappLink from "../../WhatsappTextCreator";

const DISCIPLINES = [
  { key: 'Matematica', label: 'Matemática', basePrice: 50, link: 'https://wa.me/5518996181770?text=Eu+gostaria+de+agendar+uma+aula+de+matem%C3%A1tica' },
  { key: 'Fisica', label: 'Física', basePrice: 80, link: 'https://wa.me/5518996181770?text=Eu+gostaria+de+agendar+uma+aula+de+f%C3%ADsica' },
];

const PLANS = [
  { id: 'anual1x', label: 'Plano Anual - 1 aula por semana', discount: 30 },
  { id: 'anual2x', label: 'Plano Anual - 2 aulas por semana', discount: 35 },
  { id: 'anual3x', label: 'Plano Anual - 3 aulas por semana', discount: 40 },
  { id: 'semestral1x', label: 'Plano Semestral - 1 aula por semana', discount: 20 },
  { id: 'semestral2x', label: 'Plano Semestral - 2 aulas por semana', discount: 25 },
  { id: 'semestral3x', label: 'Plano Semestral - 3 aulas por semana', discount: 30 },
  { id: 'mensal1x', label: 'Plano Mensal - 1 aula por semana', discount: 5 },
  { id: 'mensal2x', label: 'Plano Mensal - 2 aulas por semana', discount: 10 },
  { id: 'mensal3x', label: 'Plano Mensal - 3 aulas por semana', discount: 15 },
];

function PricesPage() {
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [groupLesson, setGroupLesson] = useState(false);
  const whatsappLink = criarWhatsappLink(selectedTexts, groupLesson);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const [discipline, planId] = value.split("|");

    if (planId !== currentPlan) {
      setCurrentPlan(planId);
      setSelectedTexts(checked ? [value] : []);
      clearOtherCheckboxes(planId);
    } else {
      setSelectedTexts(prev =>
        checked ? [...prev, value] : prev.filter(item => item !== value)
      );
    }
  };

  const clearOtherCheckboxes = (planId) => {
    const inputs = document.querySelectorAll("#subscriptions input[type='checkbox']");
    inputs.forEach(input => {
      if (!input.value.includes(planId)) input.checked = false;
    });
  };

  const handleGroupChange = (e) => {
    setGroupLesson(e.target.checked);
  };

  return (
    <div className="HomePageGlobalDiv">
      <div className="NousNovaLessons">
        <section id="title">
          <h1>Consultar Valores</h1>
          <h3>Escolha suas disciplinas e descubra como podemos ajudar você a dominar o conhecimento.</h3>
        </section>

        <section>
          <div>
            <h2>Totalmente Personalizado</h2>
            <p>Personalize seus estudos mesclando entre disciplinas</p>

            <div className="prices">
              {DISCIPLINES.map(d => (
                <div key={d.key}>
                  <h2>{d.label}</h2>
                  <ul>
                    <li>Aula Avulsa: {PriceCalculator(d.basePrice, 0)} hora</li>
                    <li>Aula Experimental: {PriceCalculator(d.basePrice, 30)} hora</li>
                    <div id="individualsSolicitation">
                      <a href={d.link} target="_blank" id="individualsSolicitation">
                        <div className="planet-button" id="button">Agendar</div>
                      </a>
                    </div>
                  </ul>
                </div>
              ))}

              <h2>Música</h2>
              <ul>
                <li>Aula Experimental: {PriceCalculator(35, 0)} hora</li>
                <div id="individualsSolicitation">
                  <a href="https://api.whatsapp.com/send/?phone=5518997954628&text=Ol%C3%A1%21+Eu+gostaria+de+agendar+uma+aula+de+música.&type=phone_number&app_absent=0" target="_blank" id="individualsSolicitation">
                    <div className="planet-button" id="button">Agendar</div>
                  </a>
                </div>
              </ul>

              <div>
                <h2>Planos</h2>
                <p>Selecione as disciplinas que gostaria de fazer</p>
                <div className="plansBenefits">
                  <div className="planBox">
                    <h3>Plano Semestral</h3>
                    <ul>
                      <li>✅Horários Flexíveis</li>
                      <li>✅Grupo de dúvidas (WhatsApp)</li>
                      <li>✅Reposição de Aulas</li>
                      <li>✅Garantia de 30 dias</li>
                      <li>❌Plano de Estudos Personalizado</li>
                      <li>❌Simulados e Avaliações Mensais</li>
                    </ul>
                  </div>
                  <div className="planBox">
                    <h3>Plano Anual</h3>
                    <ul>
                      <li>✅Horários Flexíveis</li>
                      <li>✅Grupo de dúvidas (WhatsApp)</li>
                      <li>✅Reposição de Aulas</li>
                      <li>✅Plano de Estudos Personalizado</li>
                      <li>✅Simulados e Avaliações Mensais</li>
                      <li>✅Garantia de 30 dias</li>
                    </ul>
                    <h3 style={{fontSize: "1rem"}}>Recomendado</h3>
                  </div>
                  <div className="planBox">
                    <h3>Plano Mensal</h3>
                    <ul>
                      <li>✅Horários Flexíveis</li>
                      <li>✅Grupo de dúvidas (WhatsApp)</li>
                      <li>✅Garantia de 7 dias</li>
                      <li>❌Reposição de Aulas</li>
                      <li>❌Plano de Estudos Personalizado</li>
                      <li>❌Simulados e Avaliações Mensais</li>
                    </ul>
                  </div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', marginLeft:"20px"}}>
                  <input type="checkbox" checked={groupLesson} onChange={handleGroupChange} style={{ marginRight: '0.5rem' }} />
                  <p>Aula em grupo (ganhe 5% de desconto)</p>
                </label>
                  <div id="subscriptions">
                    {PLANS.map(plan => (
                      <div className="prices" key={plan.id}>
                        <p style={{color: "#f0c040", fontWeight: "bold"}}>{plan.label}</p>
                        {DISCIPLINES.map(d => (
                          <label key={`${d.key}|${plan.id}`}>  
                          <div><p style={{fontSize: "1.1rem"}}>{plan.discount + (groupLesson ? 5 : 0)}% de desconto! <span style={{textDecoration: "line-through"}}>R${d.basePrice},00</span></p></div>               
                            <li style={{display:"flex"}}>
                              <input
                                type="checkbox"
                                value={`${d.key}|${plan.id}`}
                                onChange={handleCheckboxChange}
                                className="checkbox"
                              />
                              {d.label}: {PriceCalculator(d.basePrice, plan.discount + (groupLesson ? 5 : 0))} /hora
                                <span style={{ marginLeft: "auto", fontWeight: "bold" }}>
                                  {(() => {
                                    const match = plan.id.match(/(\d)x$/);
                                    const weekly = match ? parseInt(match[1]) : 1;
                                    const pricePerHour = PriceCalculator(d.basePrice, plan.discount + (groupLesson ? 5 : 0), true); // valor numérico
                                    const monthly = (pricePerHour * weekly * 4).toFixed(2).replace(".", ",");
                                    return `R$ ${monthly}/mês`;
                                  })()}
                              </span>
                            </li>
                          </label>
                        ))}

                        <a
                          href={selectedTexts.some(text => text.includes(plan.id)) ? whatsappLink : "#"}
                          target="_blank"
                          className="card"
                          id={`planSelection_${plan.id}`}
                          onClick={e => {
                            if (!selectedTexts.some(text => text.includes(plan.id))) {
                              e.preventDefault();
                              const el = document.getElementById(`planSelection_${plan.id}`);
                              el.classList.add("flash-error");
                              setTimeout(() => el.classList.remove("flash-error"), 600);
                            }
                          }}
                        >
                          Contratar
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{marginTop:"10%", justifySelf: "center"}}>
          <a href="/PolíticadePreços.pdf" download="Manifesto_Nous_Nova.pdf" className="planet-button" >Baixar Política de Preços</a>
        </div>
      </div>
    </div>
  );
}

export default PricesPage;