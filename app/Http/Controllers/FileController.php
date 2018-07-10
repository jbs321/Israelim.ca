<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function show(Request $request)
    {
        $path = $request->get("path");
        $storagePath = storage_path("app/{$path}");
        return response()->file($storagePath);
    }

    public function showBusinessImage(File $file)
    {
        $path = $file->{File::FIELD__PATH};
        $storagePath = storage_path("app/{$path}");
        return response()->file($storagePath);
    }
}
