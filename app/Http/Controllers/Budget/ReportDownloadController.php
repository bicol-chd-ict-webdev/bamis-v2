<?php

declare(strict_types=1);

namespace App\Http\Controllers\Budget;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

final class ReportDownloadController extends Controller
{
    public function __invoke(string $filename): StreamedResponse
    {
        $path = 'reports/'.$filename;

        abort_unless(Storage::disk('local')->exists($path), 404);

        return Storage::disk('local')->download($path);
    }
}
