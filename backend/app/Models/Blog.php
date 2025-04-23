<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = ['service_id', 'title', 'content','image'];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}