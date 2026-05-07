<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    public function sendContactNotification(Contact $contact): void
    {
        $adminEmail = env('MAIL_USERNAME');

        Mail::raw(
            "New Contact Message\n\n" .
            "Name: {$contact->name}\n" .
            "Email: {$contact->email}\n" .
            "Subject: {$contact->subject}\n" .
            "Message: {$contact->message}",
            function ($message) use ($adminEmail, $contact) {
                $message->to($adminEmail)
                    ->subject("Portfolio Contact: {$contact->subject}");
            }
        );
    }
}