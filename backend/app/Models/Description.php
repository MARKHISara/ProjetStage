<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Description extends Model
{
    protected $fillable=[ 'subservice_id','text','service_id'];


    public function images()
{
    return $this->morphMany(Image::class, 'imageable');
}


    public function subservice()
    {
        return $this->belongsTo(SubService::class);
    }
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}