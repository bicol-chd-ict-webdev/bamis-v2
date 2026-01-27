<?php

declare(strict_types=1);

namespace App\Concerns;

use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;

trait HasActivityLog
{
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName($this->getActivityLogName())
            ->logAll()
            ->logOnlyDirty();
    }

    public function tapActivity(Activity $activity): Activity
    {
        $activity->properties = collect($activity->properties)
            ->map(fn ($value): mixed => is_array($value)
                ? array_filter($value, fn ($item): bool => $item !== null)
                : $value
            );

        $activity->description = $this->getActivityDescription();

        return $activity;
    }

    /**
     * Get the log name for this model
     * Converts class name to spaced version (e.g., OfficeAllotment => Office Allotment)
     */
    protected function getActivityLogName(): string
    {
        return (string) preg_replace('/(?<!^)(?=[A-Z])/', ' ', class_basename(static::class));
    }

    /**
     * Get the activity description for this model
     */
    protected function getActivityDescription(): string
    {
        return '';
    }
}
