// ConfirmPage.jsx
import { useLocation } from "react-router-dom";
import "../../../../styles/pages/nousNovaPages/confirmation-page.css"

export default function ConfirmationPage() {
  const { state } = useLocation();
  const student = state?.studentName || "aluno";
  const contractor = state?.contractorName || "contratante";

  return (
    <div className="confirmation-container">
      <h1>Reserva Solicitada com Sucesso!</h1>
      <p>Obrigado, {contractor}. As reservas para {student} foram enviadas e em breve entraremos em contato.</p>
    </div>
  );
}
