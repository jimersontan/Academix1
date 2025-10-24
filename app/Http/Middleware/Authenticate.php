<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Route;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            // Only attempt to generate the login route URL if the route exists.
            // Calling route('login') when the route is not defined throws a
            // RouteNotFoundException which caused API requests to return HTML
            // error pages. Returning null here lets the authentication
            // exception be handled as a JSON 401 for API clients.
            if (Route::has('login')) {
                return route('login');
            }

            return null;
        }
    }
}
