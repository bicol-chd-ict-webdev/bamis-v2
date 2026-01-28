<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\DivisionResource;
use App\Http\Resources\SectionResource;
use App\Models\Section;
use App\Repositories\DivisionRepository;
use App\Repositories\SectionRepository;
use App\Services\FundTracker\FundTrackerMetricsService;
use DB;
use Inertia\Inertia;
use Inertia\Response;

final class FundTrackerController extends Controller
{
    public function __construct(
        private readonly FundTrackerMetricsService $metricsService,
        private readonly DivisionRepository $divisionRepository,
        private readonly SectionRepository $sectionRepository,
    ) {}

    public function index(): Response
    {
        return Inertia::render('fund-tracker/fund-tracker-index', [
            'metrics' => $this->metricsService->getMetrics(),
            'divisions' => fn (): array => DivisionResource::collection(
                $this->divisionRepository->listWithSectionCount(),
            )->resolve(),
            'sections' => fn (): array => SectionResource::collection(
                $this->sectionRepository->list(),
            )->resolve(),
        ]);
    }

    public function show(Section $section): Response
    {
        // $section = DB::table('sections')->select('id', 'name', 'code')->where('id', $section->id)->first();
        $officeAllotments = DB::table('office_allotments')->where('section_id', $section->id)
            ->select([
                'office_allotments.id',
                'office_allotments.amount',
                'office_allotments.allocation_id',
                'line_items.name as line_item_name',
                DB::raw('COALESCE(SUM(obligations.amount), 0) as total_obligation'),
                DB::raw('COALESCE(SUM(disbursements.net_amount + COALESCE(disbursements.tax, 0) + COALESCE(disbursements.retention, 0) + COALESCE(disbursements.penalty, 0) + COALESCE(disbursements.absences, 0) + COALESCE(disbursements.other_deductions, 0)), 0) as total_disbursement'),
                DB::raw('office_allotments.amount - COALESCE(SUM(obligations.amount), 0) as unobligated_balance'),
            ])
            ->join('allocations', 'allocations.id', '=', 'office_allotments.allocation_id')
            ->join('line_items', 'line_items.id', '=', 'allocations.line_item_id')
            ->leftJoin('obligations', 'obligations.office_allotment_id', '=', 'office_allotments.id')
            ->leftJoin('disbursements', 'disbursements.obligation_id', '=', 'obligations.id')
            ->groupBy('office_allotments.id', 'office_allotments.amount', 'office_allotments.allocation_id', 'line_items.name')
            ->get();

        return Inertia::render('fund-tracker/show-fund-details', [
            'section' => $section,
            'officeAllotments' => $officeAllotments,
            'metrics' => $this->metricsService->getSectionMetrics($section),
        ]);
    }
}
