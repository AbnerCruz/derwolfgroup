import { useState, useMemo } from "react";
import lessonsData from "./lessons/LessonsData";
import { PLANS_BY_GROUP } from "./lessons/components/PlansData";
import "../../styles/pages/nousNovaPages/admin-prices.css";

// ---------- COMPONENTES DE SELEÇÃO ----------
function SelectInput({ label, value, onChange, children }) {
  return (
    <label className="input-label">
      {label}<br />
      <select className="select-input" value={value} onChange={e => onChange(e.target.value)}>
        {children}
      </select>
    </label>
  );
}

function NumberInput({ label, value, onChange, min = 0 }) {
  return (
    <label className="input-label">
      {label}<br />
      <input className="number-input" type="number" min={min} value={value} onChange={e => onChange(Number(e.target.value))} />
    </label>
  );
}

function PlanSelector({ plansByGroup, selectedPlanId, onSelect }) {
  return (
    <SelectInput label="Plano:" value={selectedPlanId} onChange={onSelect}>
      <option value="" disabled>Selecione um plano</option>
      {Object.entries(plansByGroup).flatMap(([groupKey, group]) =>
        group.options.map(plan => (
          <option key={plan.id} value={plan.id}>
            {group.label} - {plan.num} aulas/mês (Desc: {plan.discount}%)
          </option>
        ))
      )}
    </SelectInput>
  );
}

function DisciplineSelector({ lessons, selectedKey, onSelect }) {
  return (
    <SelectInput label="Disciplina:" value={selectedKey} onChange={onSelect}>
      <option value="" disabled>Selecione uma disciplina</option>
      {Object.entries(lessons).map(([key, lesson]) => (
        <option key={key} value={key}>{lesson.discipline}</option>
      ))}
    </SelectInput>
  );
}

// ---------- COMPONENTE PRINCIPAL DE CÁLCULO ----------
function PlanCalculationPanel({ lessons, plansByGroup }) {
  const MARGEM_LUCRO_MINIMA = 0;

  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [numAlunos, setNumAlunos] = useState(1);
  const [lucroDesejado, setLucroDesejado] = useState(0);
  const [custosFixos, setCustosFixos] = useState(0);
  const [usarSalarioMensal, setUsarSalarioMensal] = useState(true);
  const [salarioMensal, setSalarioMensal] = useState(0);
  const [salarioHora, setSalarioHora] = useState(0);
  const [cargaHorariaContratada, setCargaHorariaContratada] = useState(160);

  const lesson = lessons[selectedDiscipline];

  const planoSelecionado = useMemo(() => {
    for (const grupo of Object.values(plansByGroup)) {
      const plano = grupo.options.find(option => option.id === selectedPlanId);
      if (plano) return { ...plano, grupoLabel: grupo.label, grupoNivel: grupo.level };
    }
    return null;
  }, [selectedPlanId, plansByGroup]);

  // ---------- CÁLCULOS ----------
  const precoHoraBase = lesson?.price || 0;
  const precoHoraComDesconto = planoSelecionado
    ? precoHoraBase * (1 - planoSelecionado.discount / 100)
    : 0;

  const aulasPorMes = planoSelecionado?.num || 0;

  const receitaComAlunos = Math.max(1, numAlunos) * precoHoraComDesconto * aulasPorMes;

  const salarioHoraCalculado = cargaHorariaContratada > 0
    ? salarioMensal / cargaHorariaContratada
    : 0;

  const custoProfessoresAtual = usarSalarioMensal
    ? salarioMensal
    : salarioHora * aulasPorMes * Math.max(1, numAlunos);

  const receitaNecessaria = custosFixos + lucroDesejado + custoProfessoresAtual;

  const alunosNecessarios = precoHoraComDesconto > 0 && aulasPorMes > 0
    ? Math.ceil(receitaNecessaria / (precoHoraComDesconto * aulasPorMes))
    : 0;

  const custoProfessoresNecessarios = usarSalarioMensal
    ? salarioMensal
    : salarioHora * aulasPorMes * alunosNecessarios;

  const receitaEstimativa = precoHoraComDesconto * aulasPorMes * alunosNecessarios;
  const lucroEstimado = receitaEstimativa - custoProfessoresNecessarios - custosFixos;

  const alunosParaSalario = precoHoraComDesconto > 0 && aulasPorMes > 0
    ? Math.ceil((usarSalarioMensal ? salarioMensal : salarioHora * aulasPorMes) / (precoHoraComDesconto * aulasPorMes))
    : 0;

  const salarioMaximoPermitido = receitaComAlunos > 0
    ? (receitaComAlunos * (1 - MARGEM_LUCRO_MINIMA)) - custosFixos
    : 0;

  const estaAcimaDoLimite = custoProfessoresAtual > salarioMaximoPermitido;

  // ---------- JSX ----------
  return (
    <div className="plan-panel">
      <h3 className="panel-title">Cálculos de Plano e Disciplina</h3>

      <DisciplineSelector lessons={lessons} selectedKey={selectedDiscipline} onSelect={setSelectedDiscipline} />
      <PlanSelector plansByGroup={plansByGroup} selectedPlanId={selectedPlanId} onSelect={setSelectedPlanId} />

      <NumberInput label="Nº de Alunos:" value={numAlunos} onChange={setNumAlunos} />
      <NumberInput label="Lucro Desejado (R$):" value={lucroDesejado} onChange={setLucroDesejado} />
      <NumberInput label="Custos Fixos Mensais (R$):" value={custosFixos} onChange={setCustosFixos} />

      <label className="input-label">
        <input type="checkbox" checked={usarSalarioMensal} onChange={e => setUsarSalarioMensal(e.target.checked)} />
        &nbsp;Pagar Salário Mensal ao Professor
      </label>

      {usarSalarioMensal ? (
        <>
          <NumberInput label="Carga Horária Contratada (h):" value={cargaHorariaContratada} onChange={setCargaHorariaContratada} min={1} />
          <NumberInput label="Salário Mensal (R$):" value={salarioMensal} onChange={setSalarioMensal} />
        </>
      ) : (
        <NumberInput label="Salário por Hora (R$):" value={salarioHora} onChange={setSalarioHora} />
      )}

      <hr />

      {lesson && planoSelecionado ? (
        <div className="results">
          <span>
            <h3>Valores</h3>
            <p><strong>Preço/hora com desconto:</strong> <b>R$ {precoHoraComDesconto.toFixed(2)}</b></p>
            <p><strong>Aulas por mês:</strong> <b>{aulasPorMes}</b></p>
          </span>
          <span>
            <h3>Receita com {Math.max(1, numAlunos)} alunos</h3>
            <p><strong>Receita total:</strong> <b>R$ {receitaComAlunos.toFixed(2)}</b></p>
            <p><strong>Custos Totais:</strong> <b>R$ {(custoProfessoresAtual + custosFixos).toFixed(2)}</b></p>
            <p><strong>Lucro:</strong> <b>R$ {(receitaComAlunos - custoProfessoresAtual - custosFixos).toFixed(2)}</b></p>
          </span>
          <span>
            <h3>Para atingir lucro desejado (R$ {lucroDesejado.toFixed(2)})</h3>
            <p><strong>Alunos necessários:</strong> <b>{alunosNecessarios}</b></p>
            <p><strong>Receita necessária:</strong> <b>R$ {receitaNecessaria.toFixed(2)}</b></p>
            <p><strong>Lucro estimado:</strong> <b>R$ {lucroEstimado.toFixed(2)}</b></p>
          </span>
          <span>
            <h3>Pagar o professor</h3>
            {usarSalarioMensal ? (
              <>
                <p><strong>Alunos necessários:</strong> <b>{alunosParaSalario}</b></p>
                <p><strong>Salário por hora:</strong> <b>R$ {salarioHoraCalculado.toFixed(2)}</b></p>
              </>
            ) : (
              <>
                <p><strong>Salário por aluno:</strong> <b>R$ {(custoProfessoresAtual / Math.max(1, numAlunos)).toFixed(2)}</b></p>
                <p>
                  <strong>Salário mensal:</strong>{" "}
                  <b style={{ color: estaAcimaDoLimite ? "red" : undefined }}>
                    R$ {custoProfessoresAtual.toFixed(2)}{estaAcimaDoLimite && " (excede lucro mínimo)"}
                  </b>
                </p>
              </>
            )}
          </span>
        </div>
      ) : (
        <p>Selecione disciplina e plano para visualizar cálculos.</p>
      )}
    </div>
  );
}

// ---------- PÁGINA ADMINISTRATIVA ----------
export default function AdminPricesPage() {
  const [panels, setPanels] = useState([0]);
  const addPanel = () => setPanels(p => [...p, p.length]);

  return (
    <div className="admin-prices-container">
      <h1>Administração de Preços - Cálculos Financeiros</h1>
      <button className="add-panel-button" onClick={addPanel}>Adicionar Comparador</button>
      {panels.map(id => (
        <PlanCalculationPanel key={id} lessons={lessonsData} plansByGroup={PLANS_BY_GROUP} />
      ))}
    </div>
  );
}
