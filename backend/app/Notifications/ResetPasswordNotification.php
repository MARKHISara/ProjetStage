<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;

class ResetPasswordNotification extends Notification
{
    public $token;
    public $email;

    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $frontendUrl = "http://localhost:5173/resetpassword?token={$this->token}&email={$this->email}";

        return (new MailMessage)
            ->subject('Reset Password Notification')
            ->line('You requested a password reset.')
            ->action('Reset Password', $frontendUrl)
            ->line('If you did not request a password reset, no further action is required.');
    }
}