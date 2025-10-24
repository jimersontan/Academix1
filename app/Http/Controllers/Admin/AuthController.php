<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required','string'],
            'password' => ['required','string'],
            'device_name' => ['nullable','string']
        ]);

        $isEmail = filter_var($validated['username'], FILTER_VALIDATE_EMAIL);
        $user = Admin::where($isEmail ? 'email' : 'username', $validated['username'])->first();
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }
        $tokenName = $validated['device_name'] ?? $request->header('User-Agent') ?? 'api-token';
        $token = $user->createToken($tokenName)->plainTextToken;

        return response()->json([
            'ok' => true,
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function me(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user && $request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
        }
        return response()->json(['ok' => true]);
    }

    // Update profile (username/email) and optionally password
    public function updateProfile(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json(['error' => 'Unauthenticated'], 401);

        $data = $request->validate([
            'username' => 'sometimes|string',
            'email' => 'sometimes|email',
            'current_password' => 'sometimes|string',
            'new_password' => 'sometimes|string|min:6|confirmed'
        ]);

        if (array_key_exists('username', $data)) $user->username = $data['username'];
        if (array_key_exists('email', $data)) $user->email = $data['email'];

        // Change password if requested
        if (isset($data['new_password'])) {
            if (empty($data['current_password']) || !\Illuminate\Support\Facades\Hash::check($data['current_password'], $user->password)) {
                return response()->json(['error' => 'Current password is incorrect'], 422);
            }
            $user->password = \Illuminate\Support\Facades\Hash::make($data['new_password']);
        }

        $user->save();
        return response()->json(['user' => $user]);
    }
}


