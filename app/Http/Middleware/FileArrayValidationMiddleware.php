<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FileArrayValidationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $rules         = [];
        $files         = [];

        if ($request->isMethod('delete')) {
            return $next($request);
        }

        //run Validation
        Validator::make($request->all(), [
            'count' => 'required|integer|max:10|min:1',
        ])->validate();

        $numberOfFiles = $request->get('count');

        for ($key = 1; $key <= $numberOfFiles; $key++) {
            $rules["file{$key}"] = "required|image|max:5000";
        }

        //run Validation
        Validator::make($request->all(), $rules)->validate();

        foreach ($rules as $name => $rule) {
            $files[] = $request->all()[$name];
        }

        $request->request->add(['files' => $files]);

        return $next($request);
    }
}
