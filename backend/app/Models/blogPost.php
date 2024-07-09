<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class blogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'description', 
        'blogImage', 
        'blogTag', 
        'id_user',
    ];

    public function users(){
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
