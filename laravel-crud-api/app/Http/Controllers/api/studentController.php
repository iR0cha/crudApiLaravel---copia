<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
/* importamos el Modelo */
use App\Models\Student;
/* importamos una libreria de laravel para validar datos */
use Illuminate\Support\Facades\Validator;

class studentController extends Controller
{
    /* get lista de estudiantes */
    public function index() 
    {
        $students = Student::all();

        /* Condicion si la lista de estudiantes esta vacia*/
        if ($students->isEmpty()) {
            $data = [
                'mesagge' => 'No se encontraron estudiantes',
                'status' => 200,
                'students' => $students
            ];
            return response()->json($data, 200);
        }
        return response()->json($students, 200);
    }

    /* post estudiante */
    public function store(Request $request)
    {
        /* Campos que establecemos requeridos */
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:student',
            'phone' => 'required|digits:10',
            'language' => 'required|in:English,Spanish,Portugues'
        ]);
        /* Mensaje por si algun campo falla o es incorrecto */
        if ($validator->fails()) {
            $data = [
                'mesagge' => 'Error en la validacion de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        /* Creacion del estudiante */
        $student = Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'language' => $request->language
        ]);
        /* Mensaje por si falla la creacion del estudiante */
        if (!$student) {
            $data = [
                'mesagge' => 'Error al crear estudiante',
                'status' => 500
            ];
            return response()->json($data, 500);
        }
        /* mensaje de mostrar estudiante creado */
        $data = [
            'student' => $student,
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    /* get por id estudiante*/
    public function show($id)
    {
        $student = Student::find($id);

        if (!$student) {
            $data = [
                'mesagge' => 'Estudiante no encontrado',
                'status' => 404 
            ];
            return response()->json($data, 404);
        }

        $data = [
            'student' => $student,
            'status' => 200
        ];
        return response()->json($data,200);
    }

    /* delete estudiante por id */
    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            $data = [
                'mesagge' => 'Estudiante no encontrado',
                'status' => 404 
            ];
            return response()->json($data, 404);
        }
        $student->delete();

        $data = [
            'mesagge' => 'Estudiante eliminado:',
            'student' => $student,
            'status' => 200
        ];
        return response()->json($data,200);
    }

    /* put estudiante por id */
    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:student',
            'phone' => 'required|digits:10',
            'language' => 'required|in:English,Spanish,Portugues'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validacion de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return respose()->json($data, 400);
        }

        $student->name = $request->name;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->language = $request->language;
        $student->save();

        $data = [
                'message' => 'Estudiante actualizado',
                'student' => $student,
                'status' => 200
        ];
        return response()->json($data, 200);
    }

    /* patch estudiante por id */
    public function updatePartial(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            $data = [ 
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        return response()->json($request->all(), 200);

        $validator = Validator::make($request->all(), [
            'name' => 'max:255',
            'email' => 'email|unique:student',
            'phone' => 'digits:10',
            'language' => 'in:English,Spanish,Portugues'
        ]);
        
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validacion de los datos',
                'erros' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if ($request->has('name')) {
            $student->name = $request->name;
        }

        if ($request->has('email')) {
            $student->email = $request->email;
        }

        if ($request->has('phone')) {
            $student->phone = $request->phone;
        }

        if ($request->has('language')) {
            $student->language = $request->language;
        }

        $student->save();
    
        $data = [
            'message' => 'Estudiante actualizado',
            'student' => $student,
            'status' => 200
        ];    
        return response()->json($data, 200);
    }
}

