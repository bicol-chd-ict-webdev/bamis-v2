import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteDueProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteDue = ({ openModal, closeModal }: DeleteDueProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(
            route('budget.obligations.dues.destroy', {
                obligation: Number(formHandler.data.obligation_id),
                due: Number(formHandler.data.id),
            }),
            {
                onSuccess: () => {
                    closeModal();

                    toast.success('Due and demandable has been successfully deleted.');
                },
                onError: () => {
                    toast.error('Something went wrong. Please try again.');
                },
            },
        );
    };

    return (
        <DeleteModal
            title="Delete Due"
            saveText="Yes, Im sure!"
            variant="destructive"
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
            data={FormatMoney(Number(formHandler.data.amount))}
            supportingText="worth of due and demandable"
        />
    );
};

export default DeleteDue;
