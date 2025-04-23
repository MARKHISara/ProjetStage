<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'url',
        'imageable_id',
        'imageable_type',
        'city_id',
    ];
        
    public function imageable()
    {
        return $this->morphTo();
    }
}