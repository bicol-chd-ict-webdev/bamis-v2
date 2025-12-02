<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Broadcast;

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::routes(['middleware' => ['web', 'auth']]);
Broadcast::channel('allotment-classes', fn ($user): true => true);
Broadcast::channel('expenditures', fn ($user): true => true);
Broadcast::channel('programs', fn ($user): true => true);
Broadcast::channel('subprograms', fn ($user): true => true);
Broadcast::channel('reports', fn ($user): true => true);
