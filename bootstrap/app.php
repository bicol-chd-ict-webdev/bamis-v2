<?php

declare(strict_types=1);

use App\Http\Middleware\CheckUserStatus;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
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

        $middleware->alias([
            'role' => RoleMiddleware::class,
            'permission' => PermissionMiddleware::class,
            'role_or_permission' => RoleOrPermissionMiddleware::class,
            'check_status' => CheckUserStatus::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // $exceptions->renderable(function (Throwable $e) {
        // if ($e instanceof AuthorizationException) {
        //     return response()->json([
        //         'errors' => 'You are not authorized.',
        //         'status' => Response::HTTP_FORBIDDEN,
        //     ], Response::HTTP_FORBIDDEN);
        // }

        // $previous = $e->getPrevious();
        // if ($previous instanceof ModelNotFoundException) {
        //     return response()->json([
        //         'errors' => str($previous->getModel())->afterLast('\\') . ' not found',
        //         'status' => Response::HTTP_NOT_FOUND,
        //     ], Response::HTTP_NOT_FOUND);
        // }

        // if ($e instanceof AccessDeniedHttpException) {
        //     return response()->json([
        //         'errors' => 'You are not authorized.',
        //         'status' => Response::HTTP_FORBIDDEN,
        //     ], Response::HTTP_FORBIDDEN);
        // }

        // if ($e instanceof QueryException) {
        //     return response()->json([
        //         'errors' => 'Database error.',
        //         'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
        //     ], Response::HTTP_INTERNAL_SERVER_ERROR);
        // }

        // if (! $e instanceof ValidationException) {
        //     return response()->json([
        //         'errors' => 'An unexpected error occured.',
        //         'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
        //     ], Response::HTTP_INTERNAL_SERVER_ERROR);
        // }
        // });
    })->create();
