import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import "../../styles/pages/nousNovaPages/admin-reservations.css";

const API_URL = process.env.REACT_APP_API_URL;

function AdminReservationsPage() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [pendingReservations, setPendingReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [error, setError] = useState("");

  const agendaRef = useRef();

  useEffect(() => {
    async function fetchTeachers() {
      setLoadingTeachers(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/teachers`);
        if (!res.ok) throw new Error("Erro ao buscar professores");
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingTeachers(false);
      }
    }
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (!selectedTeacherId) {
      setPendingReservations([]);
      setConfirmedReservations([]);
      setAvailability([]);
      return;
    }

    async function fetchReservationsAndAvailability() {
      setLoadingReservations(true);
      setError("");
      try {
        const [resRes, resAvail] = await Promise.all([
          fetch(`${API_URL}/teacher/${selectedTeacherId}/reservations`),
          fetch(`${API_URL}/teacher/${selectedTeacherId}/availability`),
        ]);

        if (!resRes.ok || !resAvail.ok) throw new Error("Erro ao buscar dados");

        const reservations = await resRes.json();
        const availabilityData = await resAvail.json();

        const pending = reservations.filter((r) => r.status === "pending");
        const confirmed = reservations.filter((r) => r.status === "confirmed");

        setPendingReservations(pending);
        setConfirmedReservations(confirmed);
        setAvailability(availabilityData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingReservations(false);
      }
    }
    fetchReservationsAndAvailability();
  }, [selectedTeacherId]);

  async function updateReservationStatus(id, status) {
    try {
      const res = await fetch(`${API_URL}/reservations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erro ao atualizar reserva");
      }

      setPendingReservations((prev) => prev.filter((r) => r.id !== id));

      if (status === "confirmed") {
        const updated = pendingReservations.find((r) => r.id === id);
        if (updated) setConfirmedReservations((prev) => [...prev, { ...updated, status }]);
      }
    } catch (err) {
      setError(`Erro: ${err.message}`);
    }
  }

  async function handleDeleteReservation(reservationId) {
    if (!window.confirm("Confirma a exclusão desta reserva?")) return;

    try {
      const res = await fetch(`${API_URL}/reservations/${reservationId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erro ao deletar reserva");
      }

      setPendingReservations((prev) => prev.filter((r) => r.id !== reservationId));
      setConfirmedReservations((prev) => prev.filter((r) => r.id !== reservationId));
    } catch (err) {
      setError(`Erro: ${err.message}`);
    }
  }

  function getWeekdayName(index) {
    return ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][index] || "";
  }

  function ReservationTable({ title, data, showActions }) {
    return (
      <>
        <h2>{title}</h2>
        {data.length === 0 ? (
          <p className="no-reservations-text">Nenhuma reserva encontrada.</p>
        ) : (
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Dia da semana</th>
                <th>Início</th>
                <th>Término</th>
                <th>Aluno</th>
                <th>Disciplina</th>
                <th>WhatsApp</th>
                <th>Responsável</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.id}>
                  <td>{r.weekIndex + 1}</td>
                  <td>{getWeekdayName(r.weekday)}</td>
                  <td>{r.startTime}</td>
                  <td>{r.endTime}</td>
                  <td>{r.studentName}</td>
                  <td>{r.discipline}</td>
                  <td>{r.whatsappNumber}</td>
                  <td>{r.contractorName}</td>
                  <td>
                    {showActions ? (
                      <>
                        <button onClick={() => updateReservationStatus(r.id, "confirmed")} className="confirm-button">
                          Confirmar
                        </button>
                        <button onClick={() => updateReservationStatus(r.id, "cancelled")} className="cancel-button">
                          Rejeitar
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleDeleteReservation(r.id)} className="delete-button">
                        Remover
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }

function AvailabilityTable() {
  const startHour = 8;
  const endHour = 20;
  const hours = [];
  for (let h = startHour; h < endHour; h++) {
    hours.push(`${h.toString().padStart(2, '0')}:00`);
  }

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Extrai HH:mm do TIME do MySQL (HH:mm:ss)
  const formatTime = (timeString) => {
    return timeString ? timeString.slice(0,5) : "";
  };

  const getSlotStatus = (weekIndex, weekday, hour) => {
    const allReservations = [...pendingReservations, ...confirmedReservations];

    const match = allReservations.find(
      (r) =>
        r.weekIndex === weekIndex &&
        r.weekday === weekday &&
        formatTime(r.startTime) === hour
    );

    if (!match) return { color: "", label: "" };
    if (match.status === "confirmed") return { color: "lightgreen", label: match.studentName };
    if (match.status === "pending") return { color: "#ffd966", label: match.studentName };
    return { color: "", label: match.studentName };
  };

  return (
    <>
      <h2>Agenda Geral (4 Semanas)</h2>
      <button onClick={handleDownloadPDF} className="download-button">Baixar PDF</button>
      <div className="agenda-table-container" ref={agendaRef} style={{overflowX: 'auto'}}>
        {Array.from({ length: 4 }).map((_, weekIndex) => (
          <div key={weekIndex} style={{ marginBottom: "2rem" }}>
            <h3>Semana {weekIndex + 1}</h3>
            <table className="agenda-table">
              <thead>
                <tr>
                  <th>Horário</th>
                  {weekDays.map((d, i) => (
                    <th key={i}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((hour, idx) => (
                  <tr key={idx}>
                    <td>{hour}</td>
                    {weekDays.map((weekday, wd) => {
                      const status = getSlotStatus(weekIndex, wd, hour);
                      return (
                        <td key={wd} style={{ backgroundColor: status.color, minWidth: '80px' }}>
                          {status.label}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}



  function handleDownloadPDF() {
    if (!agendaRef.current) return;
    html2pdf().set({
      margin: 5,
      filename: `agenda_${selectedTeacherId}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    }).from(agendaRef.current).save();
  }

  return (
    <div className="admin-reservations-page">
      <h1 className="page-title">Reservas por Professor</h1>

      {error && <p className="error-message">{error}</p>}

      <label htmlFor="teacher-select" className="label-select">
        Selecione um professor:
      </label>
      {loadingTeachers ? (
        <p className="loading-text">Carregando professores...</p>
      ) : (
        <select
          id="teacher-select"
          className="teacher-select"
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
        >
          <option value="">-- Selecione --</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      )}

      {loadingReservations ? (
        <p className="loading-text">Carregando reservas...</p>
      ) : (
        <>
          <ReservationTable title="Reservas Pendentes" data={pendingReservations} showActions />
          <ReservationTable title="Reservas Confirmadas" data={confirmedReservations} showActions={false} />
          <AvailabilityTable />
        </>
      )}
    </div>
  );
}

export default AdminReservationsPage;
