import EmptyState from '@/components/empty-state';
import GlassyCard from '@/components/glassy-card';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Item, ItemContent, ItemDescription, ItemFooter, ItemSeparator, ItemTitle } from '@/components/ui/item';
import { OBJECT_DISTRIBUTION_FORM_DEFAULTS } from '@/constants/form-defaults';
import { LoadingProvider } from '@/contexts/loading-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import { useObjectDistributionContext } from '@/contexts/object-distribution-context';
import { SearchProvider, useSearchContext } from '@/contexts/search-context';
import { useSingleAllocationContext } from '@/contexts/single-allocation-context';
import { FormatMoney } from '@/lib/formatter';
import CreateObjectDistribution from '@/pages/budget/object-distribution/modals/create-object-distribution';
import DeleteObjectDistribution from '@/pages/budget/object-distribution/modals/delete-object-distribution';
import EditObjectDistribution from '@/pages/budget/object-distribution/modals/edit-object-distribution';
import type { ObjectDistribution } from '@/types';
import { PencilLine, Plus, Search as SearchIcon, Split, Trash2 } from 'lucide-react';
import { ChangeEvent, JSX, memo, useMemo } from 'react';

const ObjectDistributions = (): JSX.Element => {
    const { allocation } = useSingleAllocationContext();

    return (
        <ModalProvider formDefaults={OBJECT_DISTRIBUTION_FORM_DEFAULTS(allocation.id)}>
            <SearchProvider>
                <LoadingProvider>
                    <ObjectDistributionsContent />
                </LoadingProvider>
            </SearchProvider>
        </ModalProvider>
    );
};
const ObjectDistributionsContent = (): JSX.Element => {
    const { search, setSearch } = useSearchContext();
    const { handleOpenModal } = useModalContext<ObjectDistribution>();
    const { objectDistributions } = useObjectDistributionContext();

    const filteredDistributions: ObjectDistribution[] = useMemo(
        (): ObjectDistribution[] => getFilteredDistributions(objectDistributions, search),
        [objectDistributions, search],
    );

    const totalAllotted: number = objectDistributions.reduce(
        (sum: number, objectDistribution: ObjectDistribution): number => sum + parseFloat(objectDistribution.amount),
        0,
    );

    return (
        <>
            <GlassyCard className="flex h-auto max-h-88 flex-col">
                <ObjectDistributionsHeader
                    search={search}
                    onSearchChange={setSearch}
                    totalAllotted={totalAllotted}
                    onCreateClick={(): void => handleOpenModal('create')}
                />

                {filteredDistributions.length > 0 ? (
                    <div className="grid flex-1 grid-cols-2 items-start gap-2 overflow-y-auto">
                        {filteredDistributions.map(
                            (objectDistribution: ObjectDistribution): JSX.Element => (
                                <Item variant="outline" className="group bg-card" key={objectDistribution.id}>
                                    <ItemContent className="min-w-0 flex-row items-start justify-between">
                                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                                            <p className="truncate text-sm leading-snug font-medium">{objectDistribution.expenditure_name}</p>
                                            <ItemDescription className="text-xs">{objectDistribution.expenditure_code}</ItemDescription>
                                        </div>

                                        <div className="hidden shrink-0 items-center gap-1 group-hover:flex">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 has-[>svg]:px-1.5"
                                                title="Edit Object Distribution"
                                                onClick={(): void => handleOpenModal('edit', objectDistribution)}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 has-[>svg]:px-1.5"
                                                title="Delete Object Distribution"
                                                onClick={(): void => handleOpenModal('delete', objectDistribution)}
                                            >
                                                <Trash2 className="text-destructive" />
                                            </Button>
                                        </div>
                                    </ItemContent>
                                    <ItemSeparator />
                                    <ItemFooter>
                                        <ItemDescription>Amount</ItemDescription>
                                        <ItemTitle className="font-bold">{FormatMoney(Number(objectDistribution.amount))}</ItemTitle>
                                    </ItemFooter>
                                </Item>
                            ),
                        )}
                    </div>
                ) : search && filteredDistributions.length === 0 ? (
                    <NoResult />
                ) : (
                    <EmptyState
                        icon={<Split />}
                        title="Break down expenditure"
                        description="Define specific expenditure items and assign their corresponding amounts."
                    />
                )}
            </GlassyCard>

            <Modals />
        </>
    );
};

const ObjectDistributionsHeader = memo(
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
                <CardTitle>Object Distributions</CardTitle>
                <CardDescription>Total Allotted: {FormatMoney(totalAllotted)}</CardDescription>
            </div>

            <div className="flex items-center gap-2">
                <InputGroup className="max-w-40">
                    <InputGroupInput
                        name="search"
                        autoComplete="off"
                        placeholder="Search..."
                        value={search}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => onSearchChange(e.target.value)}
                    />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>

                <Button className="shrink-0" size="icon" onClick={onCreateClick}>
                    <Plus />
                </Button>
            </div>
        </div>
    ),
);

const NoResult = memo(
    (): JSX.Element => (
        <Empty className="border border-dashed bg-card">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Split />
                </EmptyMedia>
                <EmptyTitle>No object distribution found</EmptyTitle>
                <EmptyDescription>
                    We couldn't find any object distribution matching your search. Try adjusting your filters or search terms.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    ),
);

const Modals = memo((): JSX.Element => {
    const { modal, handleCloseModal } = useModalContext<ObjectDistribution>();

    return (
        <>
            {modal === 'create' && <CreateObjectDistribution openModal closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditObjectDistribution openModal closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteObjectDistribution openModal closeModal={handleCloseModal} />}
        </>
    );
});

// Utility Functions
function matchesSearch(distribution: ObjectDistribution, searchLower: string): boolean {
    return (
        (distribution.expenditure_name?.toLowerCase().includes(searchLower) ?? false) ||
        (distribution.expenditure_code?.toLowerCase().includes(searchLower) ?? false)
    );
}

function getFilteredDistributions(objectDistributions: ObjectDistribution[], search: string): ObjectDistribution[] {
    const searchLower: string = search.toLowerCase();

    return objectDistributions.filter((distribution: ObjectDistribution): boolean => matchesSearch(distribution, searchLower));
}

export default ObjectDistributions;
