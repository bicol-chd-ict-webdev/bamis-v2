import ActionDropdownMenu from '@/components/action-dropdownmenu';
import DataTable from '@/components/data-table';
import SearchBar from '@/components/search-bar';
import SortableHeader from '@/components/sortable-header';
import { GeneralAppropriationProvider } from '@/contexts/general-appropriation-context';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import AppLayout from '@/layouts/app-layout';
import { FormatMoney } from '@/lib/formatter';
import {
    type AllotmentClass,
    type AppropriationSource,
    type AppropriationType,
    type BreadcrumbItem,
    type GeneralAppropriation,
    type LineItem,
    type Program,
    type ProgramClassification,
    type ProjectType,
    type Subprogram,
} from '@/types';
import { type GeneralAppropriationFormData } from '@/types/form-data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Toaster } from 'sonner';
import CreateGeneralAppropriation from './modals/create-general-appropriation';
import DeleteGeneralAppropriation from './modals/delete-general-appropriation';
import EditGeneralAppropriation from './modals/edit-general-appropriation';

interface GeneralAppropriationIndexProps {
    generalAppropriations: GeneralAppropriation[];
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

export default function GeneralAppropriationIndex({
    generalAppropriations,
    lineItems,
    appropriationTypes,
    allotmentClasses,
    projectTypes,
    programClassifications,
    programs,
    subprograms,
    appropriationSources,
}: GeneralAppropriationIndexProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'General Appropriations',
            href: 'budget.general-appropriations.index',
        },
    ];

    const formDefaults: GeneralAppropriationFormData = {
        appropriation_source: '',
        amount: '',
        date_received: new Date().toISOString().split('T')[0],
        line_item_id: '',
        appropriation_id: '1',
        appropriation_type_id: '',
        allotment_class_id: '',
        project_type_id: '',
        program_classification: '',
        program_id: '',
        subprogram_id: '',
        remarks: '',
    };

    return (
        <GeneralAppropriationProvider
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
            <ModalProvider<GeneralAppropriationFormData> formDefaults={formDefaults}>
                <Toaster position="bottom-center" />

                <AppLayout breadcrumbs={breadcrumbs}>
                    <Head title="General Appropriations" />
                    <DivisionContent
                        generalAppropriations={generalAppropriations}
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
        </GeneralAppropriationProvider>
    );
}

const DivisionContent = ({ generalAppropriations }: GeneralAppropriationIndexProps) => {
    const [search, setSearch] = useState<string>('');
    const { modal, handleOpenModal, handleCloseModal } = useModalContext();

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <SearchBar search={search} setSearch={setSearch} onCreate={() => handleOpenModal('create')} />
            <GeneralAppropriationTable generalAppropriations={generalAppropriations} search={search} />

            <CreateGeneralAppropriation openModal={modal === 'create'} closeModal={handleCloseModal} />
            <EditGeneralAppropriation openModal={modal === 'edit'} closeModal={handleCloseModal} />
            <DeleteGeneralAppropriation openModal={modal === 'delete'} closeModal={handleCloseModal} />
        </div>
    );
};

const GeneralAppropriationTable = ({ generalAppropriations, search }: { generalAppropriations: GeneralAppropriation[]; search: string }) => {
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

    const columns: ColumnDef<GeneralAppropriation>[] = [
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

    return <DataTable<GeneralAppropriation> columns={columns} data={generalAppropriations} search={search} />;
};
