<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentProfile extends Model
{
    protected $table = 'student_profile';
    protected $primaryKey = 'student_id';
    protected $fillable = [
        'display_id', 'f_name','m_name','l_name','suffix','date_of_birth','sex','phone_number','email_address','address','status',
        'department_id','course_id','academic_year_id','year_level'
    ];
    // Append display_id (stored or computed) to JSON responses
    protected $appends = ['display_id'];
    
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id', 'department_id');
    }
    
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }
    
    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id', 'academic_year_id');
    }

    // Prefer stored display_id column if present; otherwise fall back to computed value
    public function getDisplayIdAttribute()
    {
        // Use the raw attribute to avoid invoking this accessor recursively
        $stored = array_key_exists('display_id', $this->attributes) ? $this->attributes['display_id'] : null;
        if ($stored && (int) $stored > 0) return (int) $stored;
        $base = 2310000;
        $pk = $this->getAttribute($this->getKeyName()) ? (int) $this->getAttribute($this->getKeyName()) : 0;
        if ($pk >= $base) return $pk;
        return $base + $pk;
    }
}


