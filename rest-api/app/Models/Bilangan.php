<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bilangan extends Model
{
    use HasFactory;

    protected $fillable = [
        'bilangan',
        'hasil',
        'waktu_respons'
    ];
}
