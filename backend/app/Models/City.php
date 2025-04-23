<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class City extends Model
{
    use HasFactory, Notifiable;

    protected $fillable=['name','service_id','city_id','description'];

    public function Service(){

        return $this->belongsTo(Service::class);
    }   
    public function Description(){
        return $this->hasMany(Description::class);
    }
    public function images()
{
    return $this->morphMany(Image::class, 'imageable');
}


    public function subcities()
    {
        return $this->hasMany(SubCity::class);
    }

    public function subservices()
    {
        return $this->hasMany(SubService::class);
    }

  

}