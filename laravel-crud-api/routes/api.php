<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\studentController;

/* Mostrar todos los estudiantes */
Route::get('/students', [studentController::class, 'index']);

/* Mostrar estudiante por id */
Route::get('/students/{id}', [studentController::class, 'show']);

/* Crear un estudiante */
Route::post('/students', [studentController::class, 'store']);

/* Actualizar estudiante por id */
Route::put('/students/{id}', [studentController::class, 'update']);

/* Actualizar campo individual de estudiante por id */
Route::patch('/students/{id}', [studentController::class, 'updatePartial']);

/* Eliminar un estudiante por id */
Route::delete('/students/{id}', [studentController::class, 'destroy']);
