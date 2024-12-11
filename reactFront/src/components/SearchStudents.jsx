import React, {useState, useEffect} from "react";

const SearchStudents = () => {

    //Seteamos los hooks useState
    const [students, setStudents] = useState([])
    const [search, setSearch] = useState("")
    
    // Funcion para traer los datos de la API

    const URL = 'http://127.0.0.1:8000/api/students'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setStudents(data)
    }


    // Funcion de busqueda para capturar lo de la barra de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
    }


    // Metodo de filtrado
    let results = []
    if (!search) {
        results = students
    } else 
        results = students.filter((dato =>
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    ))

    useEffect( ()=> {
        showData()
    },[])

    return (
        <div>

            <input value={search} onChange={searcher} type="text" placeholder="Buscar estudiante..." className="form-control" />

            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                <tr className='bg-curso text-white'>
                    <td>ID</td>
                    <td>NOMBRE</td>
                    <td>EMAIL</td>
                    <td>TELEFONO</td>
                    <td>IDIOMA</td>
                </tr>
                </thead>
                <tbody>
                {results.map(student =>  (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>{student.language}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SearchStudents