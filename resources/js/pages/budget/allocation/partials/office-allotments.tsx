import EmptyState from '@/components/empty-state';
import GlassyCard from '@/components/glassy-card';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Progress } from '@/components/ui/progress';
import { OFFICE_ALLOTMENT_FORM_DEFAULTS } from '@/constants/form-defaults';
import { LoadingProvider } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useOfficeAllotmentContext } from '@/contexts/office-allotment-context';
import { SearchProvider, useSearchContext } from '@/contexts/search-context';
import { useSingleAllocationContext } from '@/contexts/single-allocation-context';
import { FormatMoney, FormatPercentage } from '@/lib/formatter';
import CreateOfficeAllotment from '@/pages/budget/office-allotment/modals/create-office-allotment';
import DeleteOfficeAllotment from '@/pages/budget/office-allotment/modals/delete-office-allotment';
import EditOfficeAllotment from '@/pages/budget/office-allotment/modals/edit-office-allotment';
import type { OfficeAllotment } from '@/types';
import { Building2, ChevronDown, Folder, PencilLine, Plus, Search as SearchIcon, Trash2 } from 'lucide-react';
import { ChangeEvent, JSX, memo, useMemo } from 'react';

interface DivisionGroup {
    divisionName: string;
    officeAllotments: OfficeAllotment[];
    totalAmount: number;
}

const OfficeAllotments = (): JSX.Element => {
    const { allocation } = useSingleAllocationContext();

    return (
        <ModalProvider formDefaults={OFFICE_ALLOTMENT_FORM_DEFAULTS(Number(allocation.id))}>
            <SearchProvider>
                <LoadingProvider>
                    <OfficeAllotmentsContent />
                </LoadingProvider>
            </SearchProvider>
        </ModalProvider>
    );
};

const OfficeAllotmentsContent = (): JSX.Element => {
    const { handleOpenModal } = useModalContext<OfficeAllotment>();
    const { officeAllotments } = useOfficeAllotmentContext();
    const { search, setSearch } = useSearchContext();

    const divisions: DivisionGroup[] = useMemo((): DivisionGroup[] => getFilteredDivisions(officeAllotments, search), [officeAllotments, search]);

    const totalAllotted: number = divisions.reduce((sum: number, division: DivisionGroup): number => sum + division.totalAmount, 0);

    return (
        <>
            <GlassyCard className="flex h-auto max-h-88 flex-col">
                <OfficeAllotmentsHeader
                    search={search}
                    onSearchChange={setSearch}
                    totalAllotted={totalAllotted}
                    onCreateClick={(): void => handleOpenModal('create')}
                />
                <div className="grid flex-1 items-start gap-2 overflow-y-auto">
                    {divisions.length > 0 ? (
                        divisions.map(
                            (division: DivisionGroup): JSX.Element => (
                                <DivisionItem
                                    key={division.divisionName}
                                    division={division}
                                    onEditClick={(office: OfficeAllotment): void => handleOpenModal('edit', office)}
                                    onDeleteClick={(office: OfficeAllotment): void => handleOpenModal('delete', office)}
                                />
                            ),
                        )
                    ) : search && divisions.length === 0 ? (
                        <NoResult />
                    ) : (
                        <EmptyState
                            icon={<Building2 />}
                            title="Setup office budget"
                            description="Define the specific amount and the receiving office to establish a baseline for obligations and disbursements."
                        />
                    )}
                </div>
            </GlassyCard>

            <OfficeAllotmentModals />
        </>
    );
};

const OfficeAllotmentsHeader = memo(
    ({
        search,
        onSearchChange,
        totalAllotted,
        onCreateClick,
    }: {
        search: string;
        onSearchChange: (value: string) => void;
        totalAllotted: number;
        onCreateClick: () => void;
    }): JSX.Element => (
        <div className="m-4 flex items-center justify-between">
            <div className="grid gap-1.5">
                <CardTitle>Office Allotments</CardTitle>
                <CardDescription>Total Allotted: {FormatMoney(totalAllotted)}</CardDescription>
            </div>

            <div className="flex items-center gap-2">
                <InputGroup className="max-w-72">
                    <InputGroupInput
                        name="search"
                        autoComplete="off"
                        placeholder="Search office..."
                        value={search}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => onSearchChange(e.target.value)}
                    />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>

                <Button className="shrink-0" onClick={onCreateClick}>
                    <Plus />
                    <span>Allotment</span>
                </Button>
            </div>
        </div>
    ),
);

const DivisionItem = memo(
    ({
        division,
        onEditClick,
        onDeleteClick,
    }: {
        division: DivisionGroup;
        onEditClick: (office: OfficeAllotment) => void;
        onDeleteClick: (office: OfficeAllotment) => void;
    }): JSX.Element => {
        return (
            <Item variant="outline" className="grid items-start bg-card p-0">
                <Collapsible>
                    <DivisionHeader
                        divisionName={division.divisionName}
                        itemCount={division.officeAllotments.length}
                        totalAmount={division.totalAmount}
                    />
                    <CollapsibleContent className="p-4">
                        <div className="grid max-h-88 grid-cols-2 gap-4 overflow-y-auto">
                            {division.officeAllotments.map(
                                (office: OfficeAllotment): JSX.Element => (
                                    <OfficeAllotmentCard key={office.id} office={office} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
                                ),
                            )}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </Item>
        );
    },
);

const DivisionHeader = memo(
    ({ divisionName, itemCount, totalAmount }: { divisionName: string; itemCount: number; totalAmount: number }): JSX.Element => (
        <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between p-4">
            <div className="flex gap-4">
                <ItemMedia variant="icon" className="group-data-[state=open]:border-primary group-data-[state=open]:bg-primary">
                    <Folder className="group-hover:text-primary group-data-[state=open]:text-primary-foreground" />
                </ItemMedia>
                <div className="flex flex-col items-start">
                    <p className="font-semibold">{divisionName}</p>
                    <span className="mt-1 text-xs font-normal text-muted-foreground">
                        {itemCount} recipient unit{itemCount > 1 ? 's' : ''}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex flex-col items-end">
                    <p className="font-normal text-muted-foreground">Aggregate Ceiling</p>
                    <h1 className="text-lg font-bold text-primary">{FormatMoney(totalAmount)}</h1>
                </div>
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
        </CollapsibleTrigger>
    ),
);

const OfficeAllotmentCard = memo(
    ({
        office,
        onEditClick,
        onDeleteClick,
    }: {
        office: OfficeAllotment;
        onEditClick: (office: OfficeAllotment) => void;
        onDeleteClick: (office: OfficeAllotment) => void;
    }): JSX.Element => {
        const { allocation } = useSingleAllocationContext();
        const budgetSharePercentage: number = calculateBudgetShare(Number(office.amount), Number(allocation.amount));

        return (
            <Item variant="outline" className="group bg-card">
                <ItemContent className="min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div className="mb-4 flex min-w-0 flex-1 flex-col">
                            <ItemDescription>{office.wfp_code}</ItemDescription>
                            <p className="truncate text-sm leading-snug font-medium" title={office.section_name}>
                                {office.section_name}
                            </p>
                        </div>

                        <div className="hidden items-center gap-1 group-hover:flex">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 has-[>svg]:px-1.5"
                                onClick={(): void => onEditClick(office)}
                                title="Edit Office Allotment"
                            >
                                <PencilLine />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 has-[>svg]:px-1.5"
                                onClick={(): void => onDeleteClick(office)}
                                title="Delete Office Allotment"
                            >
                                <Trash2 className="text-destructive" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <ItemDescription className="text-xs">Office Allotment</ItemDescription>
                            <ItemTitle className="font-bold">{FormatMoney(Number(office.amount))}</ItemTitle>
                        </div>
                        <div className="flex flex-col items-end">
                            <ItemTitle className="font-bold text-primary">{FormatPercentage(budgetSharePercentage, 0)}</ItemTitle>
                            <ItemDescription className="text-xs">Budget Share</ItemDescription>
                        </div>
                    </div>
                    <Progress value={budgetSharePercentage} className="h-1" />
                </ItemContent>
            </Item>
        );
    },
);

const NoResult = memo(
    (): JSX.Element => (
        <Empty className="border border-dashed bg-card">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Building2 />
                </EmptyMedia>
                <EmptyTitle>No office allotment found</EmptyTitle>
                <EmptyDescription>
                    We couldn't find any office allotment matching your search. Try adjusting your filters or search terms.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    ),
);

const OfficeAllotmentModals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<OfficeAllotment>();

    return (
        <>
            {modal === 'create' && <CreateOfficeAllotment openModal={true} closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditOfficeAllotment openModal={true} closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteOfficeAllotment openModal={true} closeModal={handleCloseModal} />}
        </>
    );
});

// Utility Functions
function matchesSearch(allotment: OfficeAllotment, searchLower: string): boolean {
    return (
        (allotment.section_name?.toLowerCase().includes(searchLower) ?? false) ||
        (allotment.wfp_code?.toLowerCase().includes(searchLower) ?? false) ||
        (allotment.section_acronym?.toLowerCase().includes(searchLower) ?? false)
    );
}

function getFilteredDivisions(officeAllotments: OfficeAllotment[], search: string): DivisionGroup[] {
    const grouped = officeAllotments as unknown as Record<string, OfficeAllotment[]>;
    const searchLower: string = search.toLowerCase();

    return Object.entries(grouped)
        .map(([divisionName, divisionAllotments]: [string, OfficeAllotment[]]) => {
            const filteredAllotments: OfficeAllotment[] = divisionAllotments.filter((allotment: OfficeAllotment): boolean =>
                matchesSearch(allotment, searchLower),
            );

            return {
                divisionName,
                officeAllotments: filteredAllotments,
                totalAmount: filteredAllotments.reduce((sum: number, allotment: OfficeAllotment): number => sum + Number(allotment.amount), 0),
            };
        })
        .filter((division): boolean => division.officeAllotments.length > 0);
}

function calculateBudgetShare(amount: number, totalAllocation: number): number {
    if (totalAllocation === 0) return 0;
    return (amount / totalAllocation) * 100;
}

export default OfficeAllotments;
