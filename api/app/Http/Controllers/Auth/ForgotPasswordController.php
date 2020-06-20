<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function forgotUserPassword(Request $request)
    {
        $user = \App\Models\User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['success' => false, 'data' => [], 'message' => 'User does not exist']);
        }

        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => Str::random(60),
            'created_at' => Carbon::now()
        ]);

        $tokenData = DB::table('password_resets')
            ->where('email', $request->email)->first();

        if ($this->sendResetEmail($request->email, $tokenData->token)) {
            return response()->json(['success' => true, 'data' => [], 'message' => 'An e-mail was sent to you with a recovery link.']);
        } else {
            return response()->json(['success' => false, 'data' => [], 'message' => 'There was an erro while trying to send the e-mail, please try again later.']);
        }
    }

    private function sendResetEmail($email, $token)
    {
        $user = \App\Models\User::where('email', $email)->first();

        $link = env('APP_FRONT_END_URL') . '/recuperar/senha/' . $token . '/' . $email;

        try {
            $data = ['name' => $user->name, 'recoverLink' => $link];
            Mail::send('mail.recover', $data, function($message) use ($user) {
                $message->to($user->email, $user->name)
                        ->subject('Recuperação de senha')
                        ->from(env('MAIL_USERNAME'), 'Contato ACTA');
            });
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
