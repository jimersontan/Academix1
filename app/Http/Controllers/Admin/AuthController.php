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
}


