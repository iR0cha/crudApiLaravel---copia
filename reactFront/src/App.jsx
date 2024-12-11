import { useEffect, useState } from 'react'
import './App.css'
import StudentsTable from './components/StudentsTable';
import SearchStudents from './components/SearchStudents';

function App() {
  return (
    <div className='container-fluid'>
      <h2 className='text-center'>Buscador Estudiantes</h2>
      <SearchStudents/>
    </div>
  );   
}

export default App
