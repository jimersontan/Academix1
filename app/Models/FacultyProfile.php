<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacultyProfile extends Model
{
    protected $table = 'faculty_profile';
    protected $primaryKey = 'faculty_id';
    protected $fillable = [
        'display_id', 'f_name','m_name','l_name','suffix','date_of_birth','sex','phone_number','email_address','address','position','department_id'
    ];
    // Append computed display id (e.g. 2510000 + primary key) to JSON responses
    protected $appends = ['display_id'];
    
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id', 'department_id');
    }

    // Prefer stored display_id column if present; otherwise fall back to computed value
    public function getDisplayIdAttribute()
    {
        // Read raw attribute to avoid calling this accessor recursively
        $stored = array_key_exists('display_id', $this->attributes) ? $this->attributes['display_id'] : null;
        if ($stored && (int) $stored > 0) return (int) $stored;
        $base = 2510000;
        $pk = $this->getAttribute($this->getKeyName()) ? (int) $this->getAttribute($this->getKeyName()) : 0;
        if ($pk >= $base) return $pk;
        return $base + $pk;
    }
}


