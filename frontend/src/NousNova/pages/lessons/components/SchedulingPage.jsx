import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "../../../../styles/pages/nousNovaPages/scheduling.css"
import {disciplinesList} from "../LessonsData";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const weekdays = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];
const weekdayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];


function generateHourlySlots(startTime, endTime) {
    const slots = [];
    let [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    
    let start = sh * 60 + sm;
    const end = eh * 60 + em;
    
    while (start + 60 <= end) {
        const h = Math.floor(start / 60);
        const m = start % 60;
        const slotStart = `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:00`;
            slots.push(slotStart);
            start += 60;
        }
        return slots;
    }
    
    export default function SchedulingPage() {
        const navigate = useNavigate()
        const { state } = useLocation();
        const disciplines = useMemo(() => (state?.selectedTexts ?? []).map(d => d.split("|")[0]), [state]);
        const distribution = state?.distribution || {};
        
        const [teachersByDiscipline, setTeachersByDiscipline] = useState({});
        const [availabilityByTeacher, setAvailabilityByTeacher] = useState({});
        const [reservationsByTeacher, setReservationsByTeacher] = useState({});

        
        const [formData, setFormData] = useState({
            contractorName: "",
            contractorEmail: "",
            studentName: "",
            whatsappNumber: "",
            selectedTeachers: {}, // { discipline: teacherId }
            bookings: {}, // { discipline: [ { weekday, startTime } ] }
        });
        const [notificationMessage, setNotificationMessage] = useState("");
        
        
        function addOneHour(timeStr) {
          const [h, m, s] = timeStr.split(":").map(Number);
          const date = new Date();
          date.setHours(h + 1, m, s || 0);
          const hh = date.getHours().toString().padStart(2, "0");
          const mm = date.getMinutes().toString().padStart(2, "0");
          return `${hh}:${mm}:00`;
        }
        
        function NotificationModal({ message, onClose }) {
          if (!message) return null;
        
          return (
            <div className="notification-overlay" onClick={onClose}>
              <div className="notification-modal" onClick={e => e.stopPropagation()}>
                <p>{message}</p>
                <button onClick={onClose}>Fechar</button>
              </div>
            </div>
          );
        }
        
        function closeNotification() {
            setNotificationMessage("");
          }
        
        useEffect(() => {
            if (disciplines.length === 0) return;
            disciplines.forEach(async (disc) => {
                const res = await fetch(`${API_URL}/teachers/${disc}`);
                const data = await res.json();
      setTeachersByDiscipline(prev => ({ ...prev, [disc]: data }));
    });
  }, [disciplines]);

  useEffect(() => {
    Object.entries(formData.selectedTeachers).forEach(([disc, teacherId]) => {
      if (!teacherId) return;
      if (!availabilityByTeacher[teacherId]) {
        fetch(`${API_URL}/teacher/${teacherId}/availability`)
          .then(res => res.json())
          .then(data => {
            setAvailabilityByTeacher(prev => ({ ...prev, [teacherId]: data }));
          });
      }
      if (!reservationsByTeacher[teacherId]) {
        fetch(`${API_URL}/teacher/${teacherId}/reservations`)
          .then(res => res.json())
          .then(data => {
            setReservationsByTeacher(prev => ({ ...prev, [teacherId]: data }));
          });
      }
    });
  }, [formData.selectedTeachers]);

  useEffect(() => {
    let initialBookings = {};
    for (const disc of disciplines) {
      const count = distribution[disc] || 0;
      initialBookings[disc] = Array(count).fill(null).map(() => ({}));
    }
    setFormData(d => ({ ...d, bookings: initialBookings }));
  }, [distribution, disciplines]);

  function getAvailableSlots(teacherId, weekday) {
    if (!teacherId) return [];
    const availability = availabilityByTeacher[teacherId] || [];
    const reservations = reservationsByTeacher[teacherId] || [];

    const dayAvailabilities = availability.filter(a => a.weekday === weekday);
    const dayReservations = reservations.filter(r => r.weekday === weekday);

    let slots = [];
    dayAvailabilities.forEach(({ startTime, endTime }) => {
      const candidateSlots = generateHourlySlots(startTime, endTime);
      candidateSlots.forEach(slot => {
        const conflict = dayReservations.some(r => {
          const slotEnd = addOneHour(slot);
          return (r.startTime < slotEnd) && (r.endTime > slot);
        });
        if (!conflict) slots.push(slot);
      });
    });
    return slots;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(d => ({ ...d, [name]: value }));
  }

  function handleWhatsappChange(e) {
    const onlyNums = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, whatsappNumber: onlyNums }));
    }


  function handleTeacherSelect(discipline, teacherId) {
    setFormData(d => ({
      ...d,
      selectedTeachers: {
        ...d.selectedTeachers,
        [discipline]: teacherId,
      },
      bookings: {
        ...d.bookings,
        [discipline]: Array(distribution[discipline]).fill(null).map(() => ({})),
      },
    }));
  }

  function handleBookingChange(discipline, index, field, value) {
    setFormData(d => {
      const bookingsForDiscipline = d.bookings[discipline] || [];
      const newBookings = [...bookingsForDiscipline];
      newBookings[index] = {
        ...newBookings[index],
        [field]: value,
      };
      return {
        ...d,
        bookings: {
          ...d.bookings,
          [discipline]: newBookings,
        },
      };
    });
  }

  function renderBookingSelects(discipline, booking, index) {
    const teacherId = formData.selectedTeachers[discipline];
    const selectedWeekday = booking?.weekday;
    const availableTimes = teacherId && selectedWeekday !== undefined
      ? getAvailableSlots(teacherId, Number(selectedWeekday))
      : [];


    function getAvailableWeekdays(teacherId) {
        if (!teacherId) return [];
        const availability = availabilityByTeacher[teacherId] || [];
        // Extrai os dias da semana únicos da disponibilidade
        const uniqueDays = Array.from(new Set(availability.map(a => a.weekday)));
        return uniqueDays;
    }


    return (
      <div key={index} className="booking-block">
        <label className="label">
          Dia da Semana: {index}
            <select className="select"
            required
            value={selectedWeekday ?? ""}
            onChange={e => handleBookingChange(discipline, index, "weekday", Number(e.target.value))}
            disabled={!teacherId}
            >
            <option value="">Selecione o dia</option>
            {getAvailableWeekdays(teacherId).map(dayValue => {
                const day = weekdays.find(d => d.value === dayValue);
                return day ? (
                <option key={day.value} value={day.value}>{day.label}</option>
                ) : null;
            })}
            </select>

        </label>

        <label className="label">
          Horário Início:
          <select className="select"
            required
            value={booking?.startTime || ""}
            onChange={e => handleBookingChange(discipline, index, "startTime", e.target.value)}
            disabled={!teacherId || selectedWeekday === undefined}
          >
            <option value="">Selecione horário</option>
            {availableTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { contractorName, contractorEmail, studentName, whatsappNumber, bookings, selectedTeachers } = formData;
    if (!contractorName || !contractorEmail || !studentName || !whatsappNumber) {
      setNotificationMessage("Preencha todos os dados pessoais.");
      return;
    }

    for (const disc of disciplines) {
      if (!selectedTeachers[disc]) {
        setNotificationMessage(`Selecione um professor para ${disc}`);
        return;
      }
      const required = distribution[disc];
      const booked = bookings[disc];
      if (!booked || booked.length !== required || booked.some(b => b.weekday === undefined || !b.startTime)) {
        setNotificationMessage(`Complete todas as reservas para ${disc}.`);
        return;
      }
    }

    for (const disc of disciplines) {
      const teacherId = selectedTeachers[disc];
        bookings[disc].forEach((booking, weekIndex) => {
        const endTime = addOneHour(booking.startTime);
        const payload = {
            discipline: disc,
            weekIndex, // ✅ agora declarado corretamente
            weekday: booking.weekday,
            startTime: booking.startTime,
            endTime,
            studentName,
            contractorName,
            contractorEmail,
            whatsappNumber,
        };

        fetch(`${API_URL}/teacher/${teacherId}/reservations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        });

    }
    navigate("/nousnova/private-lessons/prices/scheduling/confirmation", { state: { studentName, contractorName } });

  }

  return (
    <form onSubmit={handleSubmit} className="scheduling-page form-container">
      <h1>Reserva de Horários</h1>

      <fieldset>
        <legend>Dados Pessoais</legend>

        <label className="label">
          Nome do Aluno:
          <input className="input"
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
        </label>

        <label className="label">
          Nome do Contratante:
          <input className="input"
            type="text"
            name="contractorName"
            value={formData.contractorName}
            onChange={handleInputChange}
            required
          />
        </label>

        <label className="label">
          e-mail
          <input className="input"
            type="text"
            name="contractorEmail"
            value={formData.contractorEmail}
            onChange={handleInputChange}
            required
          />
        </label>

        <label className="label">
        WhatsApp:
        <input
            className="input"
            type="tel"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleWhatsappChange}
            pattern="\d+"
            inputMode="numeric"
            required
        />
        </label>


      </fieldset>

      {disciplines.map(disc => (
        <fieldset key={disc}>
          <legend>{disciplinesList[disc].label.toUpperCase()}</legend>

          <label className="label">
            Professor:
            <select className="select"
              required
              value={formData.selectedTeachers[disc] || ""}
              onChange={e => handleTeacherSelect(disc, e.target.value)}
            >
              <option value="">Selecione um professor</option>
              {(teachersByDiscipline[disc] || []).map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </label>

          <div className="weekday-group">
            {formData.bookings[disc]?.map((booking, idx) =>
              renderBookingSelects(disc, booking, idx)
            )}
          </div>
        </fieldset>
      ))}

      <button type="submit" className="submit-button">Confirmar Solicitação</button>
      <NotificationModal message={notificationMessage} onClose={closeNotification} />
    </form>
  );
}
