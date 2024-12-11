import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentsTable.css';

const StudentsTable = () => {

  //Seteamos los hooks useState
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Cargar datos de la API
  useEffect(() => {
    fetchStudents();
  }, []);

  // mostrar todos los estudiantes
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  // Eliminar estudiante por id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error("Error eliminando estudiante:", error);
    }
  };



  const handleEdit = (student) => {
    setEditingStudent(student);
  };
  // Funcion para editar estudiante
  const handleSave = async (student) => {
    try {
      if (student.id) {
        await axios.put(`http://127.0.0.1:8000/api/studentss/${student.id}`, student);
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/students', student);
        setStudents([...students, response.data]);
      }
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error("Error guardando estudiante:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Estudiantes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Idioma</th>
            <th>Actiones</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.language}</td>
              <td>
                <button class='btn-ed' onClick={() => handleEdit(student)}>Editar</button>
                <button class='btn-dlt' onClick={() => handleDelete(student.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      

      {/* Funcion al apretar agregar Estudiante */}
      {editingStudent && (
        <StudentForm
          student={editingStudent}
          onSave={handleSave}
          onCancel={() => setEditingStudent(null)}
        />
      )}



       <button onClick={() => setEditingStudent({ id: null, name: '', email: '', phone: '', language: 'English' })}>
        Agregar estudiante
      </button>
    </div>
  );
};






//Funcion para agregar nuevo estudiante
const StudentForm = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState(student);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Nombre estudiante"
        value={formData.name}
        onChange={handleChange}
     
      />
      <input
        name="email"
        placeholder="Email de estudiante"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Telefono"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <select
        name="language"
        value={formData.language}
        onChange={handleChange}
      >
        <option value="Spanish">Español</option>
        <option value="English">Ingles</option>
        <option value="Portugues">Portugues</option>
      </select>
      <button type="submit">Agregar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default StudentsTable;
