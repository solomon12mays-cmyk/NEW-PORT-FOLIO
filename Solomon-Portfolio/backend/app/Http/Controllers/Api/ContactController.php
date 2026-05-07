<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use App\Services\EmailService;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function store(ContactRequest $request, EmailService $emailService): JsonResponse
    {
        $contact = Contact::create($request->validated());

        try {
            $emailService->sendContactNotification($contact);
        } catch (\Exception $e) {
        }

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully!',
            'data' => $contact,
        ], 201);
    }

    public function index(): JsonResponse
    {
        $messages = Contact::latest()->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $messages,
        ]);
    }

    public function show(Contact $contact): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $contact,
        ]);
    }

    public function markAsRead(Contact $contact): JsonResponse
    {
        $contact->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Message marked as read',
        ]);
    }

    public function destroy(Contact $contact): JsonResponse
    {
        $contact->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message deleted successfully',
        ]);
    }
}