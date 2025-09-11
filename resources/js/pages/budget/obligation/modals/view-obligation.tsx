import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatLongDate, FormatMoney } from '@/lib/formatter';

type ViewObligationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const ViewObligation = ({ openModal, closeModal }: ViewObligationProps) => {
    const { formHandler } = useModalContext();

    return (
        <Modal
            title="View Details"
            subTitle="Review the complete details of the selected obligation."
            openModal={openModal}
            closeModal={closeModal}
            saveText=""
            cancelText="Close"
            maxWidth="!max-w-xl"
        >
            <div>
                <div className="divide-input grid divide-y">
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">NORSA Type</p>
                        <p className="col-span-3">{formHandler.data.norsa_type ?? '-/-'}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Series</p>
                        <p className="col-span-3">{formHandler.data.series}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Date</p>
                        <p className="col-span-3">{FormatLongDate(formHandler.data.date)}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Office</p>
                        <p className="col-span-3">{formHandler.data.office}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Creditor</p>
                        <p className="col-span-3">{formHandler.data.creditor}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Dtrak Number</p>
                        <p className="col-span-3">{formHandler.data.dtrak_number ?? '-/-'}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Reference Number</p>
                        <p className="col-span-3">{formHandler.data.reference_number ?? '-/-'}</p>
                    </div>
                    <div className="grid grid-cols-5 py-2 text-sm">
                        <p className="text-muted-foreground col-span-2">Amount</p>
                        <p className="col-span-3">{FormatMoney(formHandler.data.amount)}</p>
                    </div>
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

export default ViewObligation;
