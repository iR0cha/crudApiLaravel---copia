<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    //Nombre del Modelo asociado a la tabla students
    protected $table = 'student'; 

    // Campos que pueden ser alterados en la tabla. 
    protected $fillable = [  
        'name',
        'email',
        'phone',
        'language'
    ];
}
