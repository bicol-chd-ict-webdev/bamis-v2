import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { AllocationProvider } from '@/contexts/allocation-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney } from '@/lib/formatter';
import {
    type Allocation,
    type AllotmentClass,
    type AppropriationSource,
    type AppropriationType,
    type BreadcrumbItem,
    type LineItem,
    type Program,
    type ProgramClassification,
    type ProjectType,
    type Subprogram,
} from '@/types';
import { type AllocationFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateSubAllotment from './modals/create-sub-allotment';
import DeleteSubAllotment from './modals/delete-sub-allotment';
import EditSubAllotment from './modals/edit-sub-allotment';

interface SubAllotmentIndexProps {
    allocations: Allocation[];
    appropriationSources: AppropriationSource[];
    lineItems: LineItem[];
    appropriationTypes: AppropriationType[];
    allotmentClasses: AllotmentClass[];
    projectTypes?: ProjectType[];
    programClassifications?: ProgramClassification[];
    programs?: Program[];
    subprograms?: Subprogram[];
    search?: string;
}

export default function SubAllotmentIndex({
    allocations,
    lineItems,
    appropriationTypes,
    allotmentClasses,
    projectTypes,
    programClassifications,
    programs,
    subprograms,
    appropriationSources,
}: SubAllotmentIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Sub Allotments',
            href: 'budget.sub-allotments.index',
        },
    ];

    const formDefaults: AllocationFormData = {
        appropriation_source: '',
        amount: '',
        date_received: new Date().toISOString().split('T')[0],
        line_item_id: '',
        appropriation_id: '2',
        appropriation_type_id: '',
        allotment_class_id: '',
        project_type_id: '',
        program_classification: '',
        program_id: '',
        subprogram_id: '',
        remarks: '',
        particulars: '',
        additional_code: '',
        saa_number: '',
        department_order: '',
    };

    return (
        <AllocationProvider
            value={{
                lineItems,
                appropriationTypes,
                allotmentClasses,
                projectTypes,
                programClassifications,
                programs,
                subprograms,
                appropriationSources,
            }}
        >
            <ModalProvider<AllocationFormData> formDefaults={formDefaults}>
                <Toaster position="bottom-center" />

                <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="General Appropriations" />
                    <SubAllotmentContent
                        allocations={allocations}
                        lineItems={lineItems}
                        appropriationTypes={appropriationTypes}
                        allotmentClasses={allotmentClasses}
                        projectTypes={projectTypes}
                        programClassifications={programClassifications}
                        programs={programs}
                        subprograms={subprograms}
                        appropriationSources={appropriationSources}
                    />
                </AppLayout>
            </ModalProvider>
        </AllocationProvider>
    );
}

const SubAllotmentContent = ({ allocations }: SubAllotmentIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <SubAllotmentTable allocations={allocations} search={search} />

            <CreateSubAllotment openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditSubAllotment openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteSubAllotment openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const SubAllotmentTable = ({ allocations, search }: { allocations: Allocation[]; search: string }) => {
    const { handleOpenModal } = useModalContext();

    const dropdownItems = [
        {
            label: 'Edit',
            action: 'edit',
            handler: (row: any) => handleOpenModal('edit', row.original),
        },
        {
            isSeparator: true,
        },
        {
            label: 'Delete',
            action: 'delete',
            handler: (row: any) => handleOpenModal('delete', row.original),
        },
    ];

    const columns: ColumnDef<Allocation>[] = [
        {
            accessorKey: 'line_item_name',
            header: ({ column }) => <SortableHeader column={column} label="Line Item" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'allotment_class_name',
            header: ({ column }) => <SortableHeader column={column} label="Allotment Class" />,
            cell: ({ cell }) => <p>{String(cell.getValue())}</p>,
        },
        {
            accessorKey: 'amount',
            header: ({ column }) => <SortableHeader column={column} label="Amount" />,
            cell: ({ cell }) => <p>{FormatMoney(Number(cell.getValue()))}</p>,
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => <ActionDropdownMenu items={dropdownItems} row={row} />,
        },
    ];

    return <DataTable<Allocation> columns={columns} data={allocations} search={search} />;
};
