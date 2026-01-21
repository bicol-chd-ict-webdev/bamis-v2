<?php

declare(strict_types=1);

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Response;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->api(prepend: [
            EnsureFrontendRequestsAreStateful::class,
            SubstituteBindings::class,
        ]);

        $middleware->alias([
            'role' => RoleMiddleware::class,
            'permission' => PermissionMiddleware::class,
            'role_or_permission' => RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->renderable(function (Throwable $e) {
            $request = request();
            $status = 500;
            $message = 'An unexpected error occurred.';

            if ($e instanceof AuthorizationException || $e instanceof AccessDeniedHttpException) {
                $status = ResponseAlias::HTTP_FORBIDDEN;
                $message = 'You are not authorized.';
            } elseif ($e instanceof ModelNotFoundException) {
                $status = ResponseAlias::HTTP_NOT_FOUND;
                $message = str($e->getModel())->afterLast('\\').' not found';
            } elseif ($e instanceof NotFoundHttpException) {
                $status = ResponseAlias::HTTP_NOT_FOUND;
                $message = 'Not Found';
            } elseif ($e instanceof QueryException) {
                $status = ResponseAlias::HTTP_INTERNAL_SERVER_ERROR;
                $message = 'Database error.';
            } elseif ($e instanceof HttpException) {
                $status = $e->getStatusCode();
                $message = $e->getMessage() ?: Response::$statusTexts[$status] ?? 'Error';
            } elseif ($e instanceof ValidationException) {
                // Validation exceptions are handled by Laravel/Inertia automatically usually,
                // but if we want to catch API ones specifically:
                return null; // Let default handler handle validation errors to preserve session errors
            }

            if ($request->wantsJson() && ! $request->inertia()) {
                return response()->json([
                    'errors' => $message,
                    'status' => $status,
                ], $status);
            }

            if ($request->inertia() && in_array($status, [403, 404, 500, 503])) {
                return Inertia::render('Error', [
                    'status' => $status,
                    'message' => $message,
                ])->toResponse($request)->setStatusCode($status);
            }

            return null; // Fallback to default handler
        });
    })->create();
