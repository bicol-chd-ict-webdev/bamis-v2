<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Broadcast;

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('allotment-classes', fn ($user) => true);
Broadcast::channel('expenditures', fn ($user) => true);
