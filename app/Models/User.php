<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\AccountStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property-read string $role
 */
final class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, Notifiable;

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
        'remember_token',
    ];

    protected $casts = [
        'status' => AccountStatus::class,
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'name' => 'encrypted',
    ];

    protected $appends = ['role'];

    public static function booted(): void
    {
        self::creating(function ($model): void {
            if ($model instanceof User) {
                $model->password = bcrypt('password');
            }
        });
    }

    public function isActive(): bool
    {
        return $this->status === AccountStatus::ACTIVE;
    }

    protected function getRoleAttribute(): string
    {
        $role = $this->roles->first();

        if ($role instanceof Role) {
            return Str::ucfirst(mb_strtolower($role->name));
        }

        return '';
    }
}
