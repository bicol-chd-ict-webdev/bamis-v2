import { ModalProvider } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AllocationPieChart } from './charts/allocation-pie-chart';
import { BudgetUtilization } from './charts/budget-utilization';
import FilterYear from './partials/filter-year';
import Statistics from './partials/statistics';

interface DashboardProps {
    totalAllocations: number;
    totalObligations: number;
    totalDisbursements: number;
    obligationRate: string;
    disbursementRate: string;
    budgetUtilizations: [];
    allocationPieChart: [];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    totalAllocations,
    totalObligations,
    totalDisbursements,
    obligationRate,
    disbursementRate,
    budgetUtilizations,
    allocationPieChart,
}: DashboardProps) {
    const now = new Date();
    const formHandler = useForm({ year: String(now.getFullYear()) });
    const formDefaults = { type: 'saob', date: now.toISOString().split('T')[0] };

    return (
        <ModalProvider formDefaults={formDefaults}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />

                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-2">
                        <FilterYear formHandler={formHandler} />
                    </div>

                    {/* Statistics */}
                    <Statistics
                        totalAllocations={totalAllocations}
                        totalObligations={totalObligations}
                        totalDisbursements={totalDisbursements}
                        obligationRate={obligationRate}
                        disbursementRate={disbursementRate}
                    />

                    {/* Charts */}
                    <div className="grid grid-cols-2 gap-4">
                        <BudgetUtilization budgetUtilizations={budgetUtilizations} />
                        <AllocationPieChart allocationPieChart={allocationPieChart} />
                    </div>
                </div>
            </AppLayout>
        </ModalProvider>
    );
}
