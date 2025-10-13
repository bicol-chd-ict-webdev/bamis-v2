<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AppropriationSource;
use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;
use Carbon\CarbonImmutable;
use Database\Factories\AllocationFactory;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $amount
 * @property string $date_received
 * @property AppropriationSource $appropriation_source
 * @property int $line_item_id
 * @property ?string $line_item_name
 * @property ?string $line_item_acronym
 * @property int $appropriation_id
 * @property ?string $appropriation_name
 * @property ?string $appropriation_acronym
 * @property int $appropriation_type_id
 * @property ?string $appropriation_type_name
 * @property ?string $appropriation_type_acronym
 * @property ?string $appropriation_type_code
 * @property int $allotment_class_id
 * @property ?string $allotment_class_name
 * @property ?string $allotment_class_acronym
 * @property ?string $allotment_class_code
 * @property ?string $department_order
 * @property ?string $particulars
 * @property ?string $saa_number
 * @property ?string $saro_number
 * @property ?string $remarks
 * @property ?int $project_type_id
 * @property ?string $project_type_name
 * @property ?int $program_id
 * @property ?string $program_name
 * @property ?int $subprogram_id
 * @property ?string $subprogram_name
 * @property ?int $program_classification_id
 * @property ?string $program_classification_name
 * @property ?int $object_distributions_count
 * @property ?string $obligations_sum_amount
 * @property ?int $office_allotments_count
 * @property ?string $disbursements_sum_amount
 * @property ?string $unobligated_balance
 */
final class Allocation extends Model
{
    /** @use HasFactory<AllocationFactory> */
    use HasFactory, SoftDeletes;

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
        'remarks',
        'project_type_id',
        'program_id',
        'subprogram_id',
        'program_classification_id',
        'saa_number',
        'saro_number',
    ];

    protected $appends = [
        'allotment_class_code',
        'allotment_class_name',
        'line_item_name',
        'line_item_acronym',
        'appropriation_name',
        'appropriation_acronym',
        'appropriation_type_name',
        'appropriation_type_acronym',
        'appropriation_type_code',
        'program_name',
        'project_type_name',
        'subprogram_name',
        'disbursements_sum_amount',
        'unobligated_balance',
    ];

    protected $casts = [
        'appropriation_source' => AppropriationSource::class,
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
     * @return BelongsTo<ProgramClassification, covariant $this>
     */
    public function programClassification(): BelongsTo
    {
        return $this->belongsTo(ProgramClassification::class);
    }

    /**
     * @return BelongsTo<ProjectType, covariant $this>
     */
    public function projectType(): BelongsTo
    {
        return $this->belongsTo(ProjectType::class);
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
     * @return HasMany<ObjectDistribution, covariant $this>
     */
    public function objectDistributions(): HasMany
    {
        return $this->hasMany(ObjectDistribution::class);
    }

    /**
     * @return HasMany<OfficeAllotment, covariant $this>
     */
    public function officeAllotments(): HasMany
    {
        return $this->hasMany(OfficeAllotment::class);
    }

    /**
     * @return HasMany<Obligation, covariant $this>
     */
    public function obligations(): HasMany
    {
        return $this->hasMany(Obligation::class);
    }

    /**
     * @param  Builder<Allocation>  $query
     * @return Builder<Allocation>
     */
    #[Scope]
    protected function forAppropriation(Builder $query, int $appropriationId): Builder
    {
        return $query->where('appropriation_id', $appropriationId);
    }

    /**
     * @param  Builder<Allocation>  $query
     * @return Builder<Allocation>
     */
    #[Scope]
    protected function isCurrent(Builder $query): Builder
    {
        return $query->where('appropriation_type_id', AppropriationType::CURRENT);
    }

    /**
     * @param  Builder<Allocation>  $query
     * @return Builder<Allocation>
     */
    #[Scope]
    protected function isConap(Builder $query): Builder
    {
        return $query->where('appropriation_type_id', AppropriationType::CONAP);
    }

    /**
     * @return Attribute<string, never>
     */
    protected function disbursementsSumAmount(): Attribute
    {
        return Attribute::make(
            get: function (): string {
                $total = BigDecimal::zero();

                foreach ($this->obligations as $obligation) {
                    foreach ($obligation->disbursements as $disbursement) {
                        $total = $total->plus(BigDecimal::of($disbursement->total_amount));
                    }
                }

                return $total->toScale(2, RoundingMode::HALF_UP)->__toString();
            }
        );
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
    protected function allotmentClassCode(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->allotmentClass?->code,
        );
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function allotmentClassAcronym(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->allotmentClass?->acronym,
        );
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function projectTypeName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->projectType?->name,
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
    protected function lineItemAcronym(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->lineItem?->acronym,
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
    protected function appropriationAcronym(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->appropriation?->acronym,
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
     * @return Attribute<string|null, never>
     */
    protected function appropriationTypeCode(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->appropriationType?->code,
        );
    }

    /**
     * @return Attribute<string|null, never>
     */
    protected function appropriationTypeAcronym(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->appropriationType?->acronym,
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
     * @return Attribute<string, never>
     */
    protected function unobligatedBalance(): Attribute
    {
        return Attribute::make(
            get: function (): string {
                $allocationAmount = BigDecimal::of((string) ($this->amount ?? '0'));

                $totalObligations = $this->obligations->reduce(
                    fn (BigDecimal $carry, $obligation): BigDecimal => $carry->plus(BigDecimal::of((string) $obligation->amount)),
                    BigDecimal::zero()
                );

                return $allocationAmount
                    ->minus($totalObligations)
                    ->toScale(2, RoundingMode::HALF_UP)
                    ->__toString();
            }
        );
    }
}
