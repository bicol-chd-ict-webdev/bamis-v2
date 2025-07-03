<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AppropriationSource;
use App\Enums\ProgramClassification;
use Carbon\CarbonImmutable;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $amount
 * @property CarbonImmutable $date_received
 * @property AppropriationSource $appropriation_source
 * @property int $line_item_id
 * @property string $line_item_name
 * @property int $appropriation_id
 * @property string $appropriation_name
 * @property int $appropriation_type_id
 * @property string $appropriation_type_name
 * @property int $allotment_class_id
 * @property string $allotment_class_name
 * @property ?string $department_order
 * @property ?string $particulars
 * @property ?string $additional_code
 * @property ?string $saa_number
 * @property ?string $saro_number
 * @property ?string $remarks
 * @property ?int $project_type_id
 * @property ?int $program_id
 * @property ?string $program_name
 * @property ?int $subprogram_id
 * @property ?string $subprogram_name
 * @property ?ProgramClassification $program_classification
 */
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
        'department_order',
        'particulars',
        'additional_code',
        'remarks',
        'project_type_id',
        'program_id',
        'subprogram_id',
        'program_classification',
        'saa_number',
        'saro_number',
    ];

    protected $appends = [
        'allotment_class_name',
        'line_item_name',
        'appropriation_name',
        'appropriation_type_name',
        'program_name',
        'subprogram_name',
    ];

    protected $casts = [
        'appropriation_source' => AppropriationSource::class,
        'program_classification' => ProgramClassification::class,
        'date_received' => 'immutable_date',
        'amount' => 'decimal:2',
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
     * @return BelongsTo<Program, covariant $this>
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * @return BelongsTo<Subprogram, covariant $this>
     */
    public function subprogram(): BelongsTo
    {
        return $this->belongsTo(Subprogram::class);
    }

    /**
     * @param  Builder<Allocation>  $query
     * @return Builder<Allocation>
     */
    public function scopeForAppropriation(Builder $query, int $appropriationId): Builder
    {
        return $query->where('appropriation_id', $appropriationId);
    }

    /**
     * @return HasMany<ObjectDistribution, covariant $this>
     */
    public function objectDistributions(): HasMany
    {
        return $this->hasMany(ObjectDistribution::class);
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
    protected function programName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->program?->name,
        );
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function subprogramName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->subprogram?->name,
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

    /**
     * @return Attribute<string|null, string|null>
     */
    protected function additionalCode(): Attribute
    {
        return Attribute::make(
            set: fn (?string $value): ?string => $value !== null && $value !== '' && $value !== '0' ? Str::upper($value) : null,
        );
    }
}
