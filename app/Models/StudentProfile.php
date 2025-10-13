<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentProfile extends Model
{
    protected $table = 'student_profile';
    protected $primaryKey = 'student_id';
    protected $fillable = [
        'f_name','m_name','l_name','suffix','date_of_birth','sex','phone_number','email_address','address','status',
        'department_id','course_id','academic_year_id','year_level'
    ];
}


