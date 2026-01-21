import Modal from '@/components/modal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import type { Allocation, ModalProps } from '@/types';
import { Fingerprint, Flag, Layers, ListCheck, Notebook, NotepadText, Quote, ShieldCheck, Tag } from 'lucide-react';
import { JSX } from 'react';

const ViewAllocationDetailsModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Allocation>();

    console.log(formHandler.data);

    return (
        <Modal
            title="View Details"
            description="Review the complete details of the selected allocation."
            openModal={openModal}
            closeModal={closeModal}
            showSaveButton={false}
            cancelText="Close"
            maxWidth="!max-w-4xl"
        >
            <div className="grid gap-4 px-5">
                <Item variant="muted">
                    <ItemContent>
                        <div className="grid">
                            <Badge className="mb-2 bg-primary">
                                <ShieldCheck />
                                Verified Entry
                            </Badge>
                            <ItemDescription className="text-xs">Approved Allocation</ItemDescription>
                            <div className="flex items-start justify-between">
                                <ItemTitle className="text-2xl font-bold">{FormatMoney(Number(formHandler.data.amount))}</ItemTitle>
                                <div className="flex flex-col items-end">
                                    <ItemDescription className="text-xs">Appropriation Type</ItemDescription>
                                    <ItemTitle>{formHandler.data.appropriation_type_name}</ItemTitle>
                                </div>
                            </div>
                        </div>

                        <ItemSeparator />

                        <div className="mt-4 grid grid-cols-2 items-stretch gap-4">
                            <Item variant="outline" className="bg-card">
                                <ItemMedia variant="icon">
                                    <Layers />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemDescription className="text-xs">Appropriation</ItemDescription>
                                    <ItemTitle>{formHandler.data.appropriation_name}</ItemTitle>
                                </ItemContent>
                            </Item>

                            <Item variant="outline" className="bg-card">
                                <ItemMedia variant="icon">
                                    <Tag />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemDescription className="text-xs">Allotment Class</ItemDescription>
                                    <ItemTitle>{formHandler.data.allotment_class_name}</ItemTitle>
                                </ItemContent>
                            </Item>
                        </div>

                        <Item variant="outline" className="mt-3 bg-card">
                            <ItemMedia variant="icon">
                                <ListCheck />
                            </ItemMedia>
                            <ItemContent>
                                <ItemDescription className="text-xs">Budget Line Item</ItemDescription>
                                <ItemTitle>{formHandler.data.line_item_name}</ItemTitle>
                            </ItemContent>
                        </Item>
                    </ItemContent>
                </Item>

                <div className="flex items-start gap-4">
                    <Card className="w-[40%] gap-4 divide-y divide-border p-0">
                        <div className="group flex items-center justify-between gap-2 p-4 text-sm">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                                <p className="text-xs text-muted-foreground">SARO Number</p>
                            </div>
                            <p
                                className={`${formHandler.data.saro_number ? 'text-sm leading-snug font-medium text-foreground' : 'text-xs text-muted-foreground italic'}`}
                            >
                                {formHandler.data.saro_number ?? 'Not Available'}
                            </p>
                        </div>
                        <div className="group flex items-center justify-between gap-2 px-4 pb-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Fingerprint className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                                <p className="text-xs text-muted-foreground">SAA Number</p>
                            </div>
                            <p
                                className={`${formHandler.data.saa_number ? 'text-sm leading-snug font-medium text-foreground' : 'text-xs text-muted-foreground italic'}`}
                            >
                                {formHandler.data.saa_number ?? 'Not Available'}
                            </p>
                        </div>
                        <div className="group flex items-center justify-between gap-2 px-4 pb-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Notebook className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                                <p className="text-xs text-muted-foreground">Department Order</p>
                            </div>
                            <p
                                className={`${formHandler.data.department_order ? 'text-sm leading-snug font-medium text-foreground' : 'text-xs text-muted-foreground italic'}`}
                            >
                                {formHandler.data.department_order ?? 'Not Available'}
                            </p>
                        </div>
                    </Card>

                    <Item variant="muted" className="group h-full w-[60%]">
                        <ItemHeader className="justify-start border-b pb-2">
                            <NotepadText className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                            <ItemDescription className="text-xs">Particulars</ItemDescription>
                        </ItemHeader>
                        <ItemContent>
                            <p
                                className={`${formHandler.data.particulars ? 'text-sm leading-snug font-medium text-foreground' : 'text-center text-xs text-muted-foreground italic'}`}
                            >
                                {formHandler.data.particulars ?? 'No programmatic particulars registered for this cycle.'}
                            </p>
                        </ItemContent>
                    </Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Item variant="outline" className="group">
                        <ItemHeader className="justify-start border-b pb-2">
                            <Flag className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                            <ItemDescription className="text-xs">Classification</ItemDescription>
                        </ItemHeader>
                        <ItemContent>
                            <p
                                className={`${formHandler.data.program_classification_name ? 'text-sm leading-snug font-medium text-foreground' : 'text-xs text-muted-foreground italic'}`}
                            >
                                {formHandler.data.program_classification_name ?? 'Not Available'}
                            </p>
                        </ItemContent>
                    </Item>
                    <Item variant="outline" className="group">
                        <ItemHeader className="justify-start border-b pb-2">
                            <Flag className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                            <ItemDescription className="text-xs">Project</ItemDescription>
                        </ItemHeader>
                        <ItemContent>
                            <p
                                className={`${formHandler.data.project_type_name ? 'text-sm leading-snug font-medium text-foreground' : 'text-xs text-muted-foreground italic'}`}
                            >
                                {formHandler.data.project_type_name ?? 'Not Available'}
                            </p>
                        </ItemContent>
                    </Item>
                    <Item variant="outline" className="group">
                        <ItemHeader className="justify-start border-b pb-2">
                            <Flag className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                            <ItemDescription className="text-xs">Program</ItemDescription>
                        </ItemHeader>
                        <ItemContent>
                            <p
                                className={`${formHandler.data.program_name ? 'text-sm leading-snug font-medium text-foreground' : 'text-xs text-muted-foreground italic'}`}
                            >
                                {formHandler.data.program_name ?? 'Not Available'}
                            </p>
                        </ItemContent>
                    </Item>
                    <Item variant="outline" className="group">
                        <ItemHeader className="justify-start border-b pb-2">
                            <Flag className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                            <ItemDescription className="text-xs">Subprogram</ItemDescription>
                        </ItemHeader>
                        <ItemContent>
                            <p
                                className={`${formHandler.data.subprogram_name ? 'text-sm leading-snug font-medium text-foreground' : 'text-xs text-muted-foreground italic'}`}
                            >
                                {formHandler.data.subprogram_name ?? 'Not Available'}
                            </p>
                        </ItemContent>
                    </Item>
                </div>

                <Item variant="muted" className="group">
                    <ItemHeader className="justify-start border-b pb-2">
                        <Quote className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                        <ItemDescription className="text-xs">Remarks</ItemDescription>
                    </ItemHeader>
                    <ItemContent>
                        <p
                            className={`${formHandler.data.remarks ? 'text-sm leading-snug font-medium text-foreground' : 'text-center text-xs text-muted-foreground italic'}`}
                        >
                            {formHandler.data.remarks ?? 'No internal justifications or audit observations logged.'}
                        </p>
                    </ItemContent>
                </Item>
            </div>
        </Modal>
    );
};

export default ViewAllocationDetailsModal;
