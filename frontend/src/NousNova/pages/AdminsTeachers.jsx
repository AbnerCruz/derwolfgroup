import React, { useEffect, useState } from "react";
import "../../styles/pages/nousNovaPages/adminTeachers.css";
import { disciplinesList } from "./lessons/LessonsData";

const AVAILABLE_DISCIPLINES = Object.values(disciplinesList).map(d => d.label);

function DisciplineCheckbox({ discipline, checked, onChange }) {
  return (
    <label className="discipline-label">
      <input
        type="checkbox"
        value={discipline}
        checked={checked}
        onChange={onChange}
      />
      {discipline}
    </label>
  );
}

function TeacherListItem({ teacher, onRemove, onEdit }) {
  return (
    <li className="teacher-list-item">
      <span>{teacher.name}</span>
      <div>
        <button
          className="edit-button"
          onClick={() => onEdit(teacher)}
          aria-label={`Editar professor ${teacher.name}`}
        >
          Editar
        </button>
        <button
          className="remove-button"
          onClick={() => onRemove(teacher.id)}
          aria-label={`Remover professor ${teacher.name}`}
        >
          Remover
        </button>
      </div>
    </li>
  );
}

function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [instagram, setInstagram] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/teachers`)
      .then(res => res.json())
      .then(data => setTeachers(data));
  }, []);

  function handleDisciplineChange(e) {
    const { value, checked } = e.target;
    setDisciplines(prev =>
      checked ? [...prev, value] : prev.filter(d => d !== value)
    );
  }

  function resetForm() {
    setName("");
    setImage(null);
    setDisciplines([]);
    setInstagram("");
    setEditingId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || disciplines.length === 0 || !instagram.trim()) return;

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image); // não obrigatória em edição
    formData.append("disciplines", JSON.stringify(disciplines));
    formData.append("instagram", instagram);

    if (editingId) {
      // Atualização
      fetch(`${process.env.REACT_APP_API_URL}/admin/teachers/${editingId}`, {
        method: "PUT",
        body: formData,
      })
        .then(res => res.json())
        .then(updated => {
          setTeachers(prev =>
            prev.map(t => (t.id === editingId ? updated : t))
          );
          resetForm();
        })
        .catch(err => alert(err.message));
    } else {
      // Criação
      if (!image) return; // imagem obrigatória na criação

      fetch(`${process.env.REACT_APP_API_URL}/admin/teachers`, {
        method: "POST",
        body: formData,
      })
        .then(res => res.json())
        .then(newTeacher => {
          setTeachers(prev => [...prev, newTeacher]);
          resetForm();
        })
        .catch(err => alert(err.message));
    }
  }

  function removeTeacher(id) {
    fetch(`${process.env.REACT_APP_API_URL}/admin/teachers/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTeachers(prev => prev.filter(p => p.id !== id));
    });
  }

  function editTeacher(teacher) {
    setName(teacher.name);
    setInstagram(teacher.instagram);
    try {
      const parsed = Array.isArray(teacher.disciplines)
        ? teacher.disciplines
        : JSON.parse(teacher.disciplines);
      setDisciplines(parsed);
    } catch {
      setDisciplines([]);
    }
    setImage(null); // opcional trocar imagem
    setEditingId(teacher.id);
  }

  return (
    <div className="admin-teachers-container">
      <h1 className="admin-teachers-title">Administração de Professores</h1>

      <form className="admin-teachers-form" onSubmit={handleSubmit}>
        <div>
          <h3>Nome</h3>
          <input
            type="text"
            className="input-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do professor"
            required
          />
        </div>

        <div>
          <h3>Foto de Perfil {editingId && "(opcional na edição)"}</h3>
          <input
            type="file"
            className="input-image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editingId}
          />
        </div>

        <fieldset className="disciplines-fieldset">
          <legend>Selecione as disciplinas:</legend>
          <div className="disciplines-checkboxes">
            {AVAILABLE_DISCIPLINES.map((disc) => (
              <DisciplineCheckbox
                key={disc}
                discipline={disc}
                checked={disciplines.includes(disc)}
                onChange={handleDisciplineChange}
              />
            ))}
          </div>
        </fieldset>

        <input
          type="text"
          className="input-instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="Link do Instagram"
          required
        />

        <div className="form-buttons">
          <button type="submit" className="btn-add-teacher">
            {editingId ? "Salvar Alterações" : "Adicionar"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-cancel-edit"
              onClick={resetForm}
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </form>

      <ul className="teachers-list">
        {teachers.map((teacher) => (
          <TeacherListItem
            key={teacher.id}
            teacher={teacher}
            onRemove={removeTeacher}
            onEdit={editTeacher}
          />
        ))}
      </ul>
    </div>
  );
}

export default AdminTeachers;
