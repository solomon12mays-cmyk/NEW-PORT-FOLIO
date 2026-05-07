<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    // Get all users for admin
       // Get users list
    public function users(): JsonResponse
    {
        $currentUser = auth()->user();

        // If current user is NOT admin, only show admin
        if (!$currentUser->is_admin) {
            $users = User::where('is_admin', true)
                ->where('id', '!=', $currentUser->id)
                ->get();

            return response()->json(['success' => true, 'data' => $users]);
        }

        // Admin sees all users except themselves
        $users = User::where('id', '!=', $currentUser->id)
            ->withCount(['messages as unread' => function ($q) use ($currentUser) {
                $q->where('receiver_id', $currentUser->id)->where('is_read', false);
            }])
            ->get();

        return response()->json(['success' => true, 'data' => $users]);
    }

    // Get messages between admin and user
    public function messages($userId): JsonResponse
    {
        $messages = ChatMessage::betweenUsers(auth()->id(), $userId)
            ->with(['user', 'receiver'])
            ->orderBy('created_at', 'asc')
            ->get();

        // Mark as read
        ChatMessage::where('user_id', $userId)
            ->where('receiver_id', auth()->id())
            ->update(['is_read' => true]);

        return response()->json(['success' => true, 'data' => $messages]);
    }

    // Send message
    public function send(Request $request): JsonResponse
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:1000',
        ]);

        $message = ChatMessage::create([
            'user_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        return response()->json(['success' => true, 'data' => $message], 201);
    }

    // Delete message
      // Delete single message
    public function destroy($id): JsonResponse
    {
        $message = ChatMessage::findOrFail($id);

        // Only admin can delete other's messages
        if (!auth()->user()->is_admin) {
            // User can only delete their own messages
            if ($message->user_id != auth()->id()) {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
            }
            // User deletes ONLY from their side (soft delete concept)
            // We just hide it from them, admin still sees it
            $message->delete();
            return response()->json(['success' => true, 'message' => 'Message deleted from your view']);
        }

        // Admin can permanently delete
        $message->forceDelete();

        return response()->json(['success' => true, 'message' => 'Message deleted permanently']);
    }

    // Clear chat
    public function clearChat($userId): JsonResponse
    {
        $user = auth()->user();

        if (!$user->is_admin) {
            // User clears ONLY their side
            ChatMessage::where('user_id', $user->id)
                ->where('receiver_id', $userId)
                ->delete();

            return response()->json([
                'success' => true,
                'message' => 'Your messages cleared. Admin can still see them.'
            ]);
        }

        // Admin can clear all messages between both
        ChatMessage::where(function ($q) use ($userId, $user) {
            $q->where('user_id', $user->id)->where('receiver_id', $userId);
        })->orWhere(function ($q) use ($userId, $user) {
            $q->where('user_id', $userId)->where('receiver_id', $user->id);
        })->delete();

        return response()->json([
            'success' => true,
            'message' => 'All messages cleared from both sides'
        ]);
    }
    // Register new user (for clients)
       public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->username,
            'password' => bcrypt($request->password),
            'is_admin' => false,
        ]);

        $token = $user->createToken('chat-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => ['user' => $user, 'token' => $token],
        ], 201);
    }
}