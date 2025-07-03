import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatLongDate, FormatMoney } from '@/lib/formatter';

type ViewSubAllotmentProps = {
    openModal: boolean;
    closeModal: () => void;
};

const ViewSubAllotment = ({ openModal, closeModal }: ViewSubAllotmentProps) => {
    const { formHandler } = useModalContext();

    return (
        <Modal
            title="View Details"
            subTitle="Review the complete details of the selected allocation."
            openModal={openModal}
            closeModal={closeModal}
            saveText=""
            cancelText="Close"
            maxWidth="!max-w-xl"
        >
            <div>
                <div className="divide-input grid divide-y">
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Appropriation</p>
                        <p className="col-span-3">{formHandler.data.appropriation_name}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Appropriation Type</p>
                        <p className="col-span-3">{formHandler.data.appropriation_type_name}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Allotment Class</p>
                        <p className="col-span-3">{formHandler.data.allotment_class_name}</p>
                    </div>
                    {formHandler.data.program_classification && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="text-muted-foreground col-span-2">Program Classification</p>
                            <p className="col-span-3">{formHandler.data.program_classification}</p>
                        </div>
                    )}
                    {formHandler.data.program_id && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="text-muted-foreground col-span-2">Program</p>
                            <p className="col-span-3">{formHandler.data.program_name}</p>
                        </div>
                    )}
                    {formHandler.data.subprogram_id && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="text-muted-foreground col-span-2">Subprogram</p>
                            <p className="col-span-3">{formHandler.data.subprogram_name}</p>
                        </div>
                    )}
                    {formHandler.data.additional_code && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="text-muted-foreground col-span-2">Additional Code</p>
                            <p className="col-span-3">{formHandler.data.additional_code}</p>
                        </div>
                    )}
                    {formHandler.data.saa_number && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="text-muted-foreground col-span-2">SAA Number</p>
                            <p className="col-span-3">{formHandler.data.saa_number}</p>
                        </div>
                    )}
                    {formHandler.data.department_order && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="text-muted-foreground col-span-2">Department Order</p>
                            <p className="col-span-3">{formHandler.data.department_order}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Date Received</p>
                        <p className="col-span-3">{FormatLongDate(formHandler.data.date_received)}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Amount</p>
                        <p className="col-span-3">{FormatMoney(formHandler.data.amount)}</p>
                    </div>
                    {formHandler.data.remarks && (
                        <div className="grid grid-cols-5 py-2 text-sm">
                            <p className="text-muted-foreground col-span-2">Remarks</p>
                            <p className="col-span-3">{formHandler.data.remarks}</p>
                        </div>
                    )}
                </div>

                {formHandler.data.particulars && (
                    <div className="flex flex-col justify-between py-2 text-sm">
                        <p className="text-muted-foreground">Particulars</p>
                        <p className="border-input mt-2 rounded-md border px-3 py-2">{formHandler.data.particulars}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ViewSubAllotment;
