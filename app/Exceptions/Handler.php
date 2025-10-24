<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Http\JsonResponse;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        // Provide a friendlier response for throttling errors so the UI can show
        // a helpful message instead of the raw exception text.
        $this->renderable(function (ThrottleRequestsException $e, $request) {
            $message = 'Too many requests. Please wait a moment and try again.';
            // Return JSON for API/XHR requests
            if ($request->wantsJson() || $request->is('api/*') || $request->ajax()) {
                return new JsonResponse(['message' => $message], 429);
            }
            // For web requests, return a simple view-friendly response
            return response()->view('errors.throttle', ['message' => $message], 429);
        });
    }
}
