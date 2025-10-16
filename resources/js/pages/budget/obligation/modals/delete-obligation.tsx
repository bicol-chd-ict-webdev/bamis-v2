import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteObligationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteObligation = ({ openModal, closeModal }: DeleteObligationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('budget.obligations.destroy', { obligation: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Obligation has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Obligation"
            saveText="Yes, Im sure!"
            variant="destructive"
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
            data={FormatMoney(Number(formHandler.data.offices[0].amount))}
            supportingText="worth of obligation"
        />
    );
};

export default DeleteObligation;
