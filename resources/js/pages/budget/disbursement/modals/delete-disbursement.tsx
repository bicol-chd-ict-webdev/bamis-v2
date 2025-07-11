import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteDisbursementProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteDisbursement = ({ openModal, closeModal }: DeleteDisbursementProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(
            route('budget.obligations.disbursements.destroy', {
                obligation: Number(formHandler.data.obligation_id),
                disbursement: Number(formHandler.data.id),
            }),
            {
                onSuccess: () => {
                    closeModal();

                    toast.success('Disbursement has been successfully deleted.');
                },
                onError: () => {
                    toast.error('Something went wrong. Please try again.');
                },
            },
        );
    };

    return (
        <DeleteModal
            title="Delete Disbursement"
            saveText="Yes, Im sure!"
            variant="destructive"
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
            data={FormatMoney(Number(formHandler.data.total_amount))}
            supportingText="worth of disbursement"
        />
    );
};

export default DeleteDisbursement;
