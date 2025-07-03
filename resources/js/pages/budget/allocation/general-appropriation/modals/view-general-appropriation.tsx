import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatLongDate, FormatMoney } from '@/lib/formatter';

type ViewGeneralAppropriationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const ViewGeneralAppropriation = ({ openModal, closeModal }: ViewGeneralAppropriationProps) => {
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
            </div>
        </Modal>
    );
};

export default ViewGeneralAppropriation;
