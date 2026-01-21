import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatLongDate, FormatMoney } from '@/lib/formatter';
import type { Allocation, ModalProps } from '@/types';
import { JSX } from 'react';

const ViewSpecialAllotment = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Allocation>();

    return (
        <Modal
            title="View Details"
            description="Review the complete details of the selected allocation."
            openModal={openModal}
            closeModal={closeModal}
            saveText=""
            cancelText="Close"
            maxWidth="!max-w-xl"
        >
            <div className="px-5">
                <div className="grid divide-y divide-input">
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="col-span-2 text-muted-foreground">Appropriation</p>
                        <p className="col-span-3">{formHandler.data.appropriation_name}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="col-span-2 text-muted-foreground">Appropriation Type</p>
                        <p className="col-span-3">{formHandler.data.appropriation_type_name}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="col-span-2 text-muted-foreground">Allotment Class</p>
                        <p className="col-span-3">{formHandler.data.allotment_class_name}</p>
                    </div>
                    {formHandler.data.program_classification && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="col-span-2 text-muted-foreground">Program Classification</p>
                            <p className="col-span-3">{formHandler.data.program_classification}</p>
                        </div>
                    )}
                    {formHandler.data.program_id && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="col-span-2 text-muted-foreground">Program</p>
                            <p className="col-span-3">{formHandler.data.program_name}</p>
                        </div>
                    )}
                    {formHandler.data.subprogram_id && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="col-span-2 text-muted-foreground">Subprogram</p>
                            <p className="col-span-3">{formHandler.data.subprogram_name}</p>
                        </div>
                    )}
                    {formHandler.data.saro_number && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="col-span-2 text-muted-foreground">SARO Number</p>
                            <p className="col-span-3">{formHandler.data.saro_number}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="col-span-2 text-muted-foreground">Date Received</p>
                        <p className="col-span-3">{FormatLongDate(formHandler.data.date_received)}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="col-span-2 text-muted-foreground">Amount</p>
                        <p className="col-span-3">{FormatMoney(Number(formHandler.data.amount))}</p>
                    </div>
                    {formHandler.data.remarks && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="col-span-2 text-muted-foreground">Remarks</p>
                            <p className="col-span-3">{formHandler.data.remarks}</p>
                        </div>
                    )}
                </div>

                {formHandler.data.particulars && (
                    <div className="flex flex-col justify-between py-2 text-sm">
                        <p className="text-muted-foreground">Particulars</p>
                        <p className="mt-2 rounded-md border border-input px-3 py-2">{formHandler.data.particulars}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ViewSpecialAllotment;
