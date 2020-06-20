<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/home';


    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|confirmed',
            'token' => 'required' 
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'data' => [], 'message' => 'The form given was invalid.']);
        }

        $tokenData = DB::table('password_resets')->where('token', $request->token)->first();
        if (!$tokenData) return response()->json(['success' => false, 'data' => [], 'message' => 'Invalid token.']);

        $user = \App\Models\User::where('email', $tokenData->email)->first();
        if (!$user) return response()->json(['success' => false, 'data' => [], 'message' => 'Invalid e-mail.']);

        $user->password = Hash::make($request->password);
        $user->update();
        DB::table('password_resets')->where('email', $user->email)->delete();

        return response()->json(['success' => true, 'data' => [], 'message' => 'Password changed successfully.']);
    }
}
