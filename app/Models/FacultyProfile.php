<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacultyProfile extends Model
{
    protected $table = 'faculty_profile';
    protected $primaryKey = 'faculty_id';
    protected $fillable = [
        'f_name','m_name','l_name','suffix','date_of_birth','sex','phone_number','email_address','address','position','department_id'
    ];
    
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id', 'department_id');
    }
}


