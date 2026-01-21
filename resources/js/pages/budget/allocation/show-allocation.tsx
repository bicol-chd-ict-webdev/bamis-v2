import GlassyCard from '@/components/glassy-card';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Item, ItemContent, ItemHeader, ItemMedia } from '@/components/ui/item';
import { ExpenditureProvider } from '@/contexts/expenditure-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { ObjectDistributionProvider } from '@/contexts/object-distribution-context';
import { ObligationProvider } from '@/contexts/obligation-context';
import { OfficeAllotmentProvider } from '@/contexts/office-allotment-context';
import { OfficeProvider } from '@/contexts/office-context';
import { SectionProvider } from '@/contexts/section-context';
import { SingleAllocationProvider, useSingleAllocationContext } from '@/contexts/single-allocation-context';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney, FormatPercentage } from '@/lib/formatter';
import ObjectDistributions from '@/pages/budget/allocation/partials/object-distributions';
import Obligations from '@/pages/budget/allocation/partials/obligations';
import OfficeAllotments from '@/pages/budget/allocation/partials/office-allotments';
import ViewAllocationDetailsModal from '@/pages/budget/allocation/view-allocation-details-modal';
import type { Allocation, Expenditure, ObjectDistribution, Obligation, OfficeAllotment, RecipientEnum, Section } from '@/types';
import { Head } from '@inertiajs/react';
import { Banknote, ChevronRight, Coins, FileCheck, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import { JSX } from 'react';

interface ShowAllocationProps {
    allocation: Allocation;
    sections: Section[];
    expenditures: Expenditure[];
    officeAllotments: OfficeAllotment[];
    objectDistributions: ObjectDistribution[];
    obligations: Obligation[];
    recipients: RecipientEnum[];
    officeAllotmentsGroupedBySection: Section[];
}

const ShowAllocation = ({
    allocation,
    sections,
    expenditures,
    officeAllotments,
    objectDistributions,
    obligations,
    recipients,
    officeAllotmentsGroupedBySection,
}: ShowAllocationProps): JSX.Element => {
    return (
        <SingleAllocationProvider value={{ allocation }}>
            <ModalProvider formDefaults={{}}>
                <AppLayout header={<CustomHeader />}>
                    <Head title="General Appropriations" />

                    <section className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                        <div className="flex flex-col gap-4">
                            <AllocationStatsRow />

                            <div className="grid grid-cols-5 gap-4">
                                <div className="col-span-3">
                                    <SectionProvider value={{ sections }}>
                                        <OfficeAllotmentProvider value={{ officeAllotments }}>
                                            <OfficeAllotments />
                                        </OfficeAllotmentProvider>
                                    </SectionProvider>
                                </div>

                                <div className="col-span-2 min-h-0">
                                    <ExpenditureProvider value={{ expenditures }}>
                                        <ObjectDistributionProvider value={{ objectDistributions }}>
                                            <ObjectDistributions />
                                        </ObjectDistributionProvider>
                                    </ExpenditureProvider>
                                </div>
                            </div>

                            <ObligationProvider value={{ obligations, recipients }}>
                                <ObjectDistributionProvider value={{ objectDistributions }}>
                                    <OfficeProvider value={{ officeAllotmentsGroupedBySection }}>
                                        <Obligations />
                                    </OfficeProvider>
                                </ObjectDistributionProvider>
                            </ObligationProvider>
                        </div>
                    </section>
                </AppLayout>
            </ModalProvider>
        </SingleAllocationProvider>
    );
};

const CustomHeader = (): JSX.Element => {
    const { allocation } = useSingleAllocationContext();

    return (
        <div className="flex items-center justify-between gap-4">
            <h5 className="font-semibold">{allocation.line_item_name}</h5>

            <div className="flex items-center gap-2 rounded-md bg-accent-foreground px-4 py-2">
                <Coins className="size-5 text-primary" />
                <p className="text-sm font-bold text-accent">{FormatMoney(Number(allocation.amount))}</p>
            </div>
        </div>
    );
};

const AllocationStatsRow = (): JSX.Element => {
    const { allocation } = useSingleAllocationContext();

    return (
        <div className="flex gap-4">
            <GlassyCard className="grid flex-1 grid-cols-3 items-start gap-4">
                <StatCard
                    icon={<ShieldCheck className="text-muted-foreground group-hover:text-primary" />}
                    label="Obligations"
                    amount={FormatMoney(allocation.obligations_sum_amount)}
                    description="Commited Funds"
                    trend={
                        Number(allocation.amount) > 0
                            ? FormatPercentage((Number(allocation.obligations_sum_amount) / Number(allocation.amount)) * 100, 0)
                            : '0%'
                    }
                />
                <StatCard
                    icon={<Banknote className="text-muted-foreground group-hover:text-primary" />}
                    label="Disbursements"
                    amount={FormatMoney(allocation.disbursements_sum_amount)}
                    description="Actual Utilization"
                    trend={
                        Number(allocation.obligations_sum_amount) > 0
                            ? FormatPercentage((Number(allocation.disbursements_sum_amount) / Number(allocation.obligations_sum_amount)) * 100, 0)
                            : '0%'
                    }
                />
                <StatCard
                    icon={<Wallet className="text-muted-foreground group-hover:text-primary" />}
                    label="Balance"
                    amount={FormatMoney(Number(allocation.unobligated_balance))}
                    description="Available Limit"
                />
            </GlassyCard>

            <TechnicalProfileCard />
        </div>
    );
};

interface StatCardProps {
    icon: JSX.Element;
    label: string;
    amount: string;
    description: string;
    trend?: string;
}

const StatCard = ({ icon, label, amount, description, trend }: StatCardProps): JSX.Element => (
    <Card className="py-0">
        <Item className="group flex-col items-start">
            <div className="flex w-full items-center justify-between">
                <ItemMedia variant="icon" className="border">
                    {icon}
                </ItemMedia>
                {trend && (
                    <div className="flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-2.5 py-0.5">
                        <TrendingUp className="h-3 w-3 text-primary" />
                        <span className="text-xs font-bold text-primary">{trend}</span>
                    </div>
                )}
            </div>
            <ItemContent>
                <h6 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{label}</h6>
                <h1 className="text-xl font-bold">{amount}</h1>
                <p className="text-xs text-muted-foreground">{description}</p>
            </ItemContent>
        </Item>
    </Card>
);

const TechnicalProfileCard = (): JSX.Element => {
    const { modal, handleOpenModal, handleCloseModal } = useModalContext<Allocation>();
    const { allocation } = useSingleAllocationContext();

    return (
        <>
            <GlassyCard className="w-1/4">
                <button
                    onClick={(): void => handleOpenModal('view', allocation)}
                    type="button"
                    aria-label="Technical Profile"
                    className="w-full cursor-pointer text-left"
                >
                    <Card className="border-primary bg-primary py-0">
                        <Item className="group flex-col items-start">
                            <ItemHeader className="w-full">
                                <ItemMedia variant="icon" className="border-green-400 bg-green-500 transition-all duration-200">
                                    <FileCheck className="text-primary-foreground transition-all duration-200" />
                                </ItemMedia>
                                <Badge className="rounded-full bg-green-700 font-semibold">Technical Profile</Badge>
                            </ItemHeader>
                            <ItemContent className="w-full">
                                <h6 className="text-xs font-semibold tracking-wider text-card/70 uppercase">Strategic Registry</h6>
                                <h1 className="text-xl font-bold text-secondary">Full Specifications</h1>
                                <div className="flex w-full items-center gap-1 text-xs text-card/70">
                                    <FileCheck className="size-3 shrink-0 group-hover:text-primary-foreground" />
                                    <p className="flex-1 group-hover:text-primary-foreground">Audit-Ready Context</p>
                                    <div className="rounded-full bg-green-500 p-0.5 transition-all duration-200 group-hover:bg-primary-foreground">
                                        <ChevronRight className="size-3 shrink-0 transition-all duration-200 group-hover:text-primary" />
                                    </div>
                                </div>
                            </ItemContent>
                        </Item>
                    </Card>
                </button>
            </GlassyCard>

            {modal === 'view' && <ViewAllocationDetailsModal openModal={true} closeModal={handleCloseModal} />}
        </>
    );
};

export default ShowAllocation;
