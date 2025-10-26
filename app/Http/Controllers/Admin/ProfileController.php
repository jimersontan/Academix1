<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        return response()->json($user);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'username' => ['required','string','max:255','unique:admin,username,'.$user->getKey().',admin_id'],
        ]);

        $user->username = $validated['username'];
        $user->save();

        return response()->json($user);
    }

    public function changePassword(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'current_password' => ['required','string'],
            'new_password' => ['required','string','min:8'],
            'confirm_password' => ['required','same:new_password'],
        ]);

        if (!Hash::check($data['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect.']
            ]);
        }

        $user->password = Hash::make($data['new_password']);
        $user->save();

        return response()->json(['ok' => true]);
    }

    public function uploadAvatar(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'avatar' => ['required','image','mimes:jpeg,png,jpg,webp','max:5120'], // 5MB
        ]);

        $file = $request->file('avatar');
        $path = $file->storePublicly('avatars/'.$user->getKey(), ['disk' => 'public']);
        $user->avatar_path = $path;
        $user->save();

        return response()->json([
            'avatar_url' => Storage::disk('public')->url($path),
        ]);
    }
}
