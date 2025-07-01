<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AppropriationSource;
use App\Enums\ProgramClassification;
use Carbon\CarbonImmutable;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Allocation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'amount',
        'date_received',
        'appropriation_source',
        'line_item_id',
        'appropriation_id',
        'appropriation_type_id',
        'allotment_class_id',
        'guideline',
        'particulars',
        'additional_code',
        'remarks',
        'project_type_id',
        'program_id',
        'subprogram_id',
        'program_classification',
    ];

    protected $appends = [
        'allotment_class_name',
        'line_item_name',
        'appropriation_name',
        'appropriation_type_name',
    ];

    protected $casts = [
        'appropriation_source' => AppropriationSource::class,
        'program_classification' => ProgramClassification::class,
        'date_received' => 'immutable_date',
    ];

    /**
     * @return BelongsTo<LineItem, covariant $this>
     */
    public function lineItem(): BelongsTo
    {
        return $this->belongsTo(LineItem::class);
    }

    /**
     * @return BelongsTo<Appropriation, covariant $this>
     */
    public function appropriation(): BelongsTo
    {
        return $this->belongsTo(Appropriation::class);
    }

    /**
     * @return BelongsTo<AppropriationType, covariant $this>
     */
    public function appropriationType(): BelongsTo
    {
        return $this->belongsTo(AppropriationType::class);
    }

    /**
     * @return BelongsTo<AllotmentClass, covariant $this>
     */
    public function allotmentClass(): BelongsTo
    {
        return $this->belongsTo(AllotmentClass::class);
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function allotmentClassName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->allotmentClass?->name,
        );
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function lineItemName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->lineItem?->name,
        );
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function appropriationName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->appropriation?->name,
        );
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function appropriationTypeName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->appropriationType?->name,
        );
    }

    /**
     * @return Attribute<string, string>
     */
    protected function dateReceived(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes): string => is_string($value) || $value instanceof DateTimeInterface
                    ? CarbonImmutable::parse($value)->format('Y-m-d')
                    : '',
        );
    }
}
