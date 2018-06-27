<?php

namespace App\Http\Controllers;

use App\BusinessFile;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function show(Request $request)
    {
        $path = $request->get("path");
        $storagePath = storage_path("app/{$path}");
        return response()->file($storagePath);
    }

    public function showBusinessImage(BusinessFile $file)
    {
        $path = $file->{BusinessFile::FIELD__PATH};
        $storagePath = storage_path("app/{$path}");
        return response()->file($storagePath);
    }
}
