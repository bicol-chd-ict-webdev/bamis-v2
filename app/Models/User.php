<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AccountStatus;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property-read int $id
 * @property-read string $name
 * @property-read string $email
 * @property string|null $email_verified_at
 * @property-read AccountStatus $status
 * @property-read string $designation
 */
final class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;

    /** @use HasFactory<UserFactory> */
    use HasFactory;

    use HasRoles;

    use Notifiable;

    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'designation',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_recovery_codes',
        'two_factor_secret',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'two_factor_confirmed_at' => 'datetime',
        'name' => 'encrypted',
        'status' => AccountStatus::class,
    ];

    protected $appends = ['role'];

    public function isActive(): bool
    {
        return $this->status === AccountStatus::ACTIVE;
    }

    protected static function booted(): void
    {
        self::creating(function ($model): void {
            if ($model instanceof User) {
                $model->password = bcrypt('password');
            }
        });
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function role(): Attribute
    {
        $role = $this->roles->first();

        return Attribute::make(
            get: fn (): ?string => ($role instanceof Role
                ? $role->name
                : null)
        );
    }
}
