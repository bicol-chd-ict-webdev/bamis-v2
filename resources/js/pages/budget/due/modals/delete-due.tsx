import budget from '@/routes/budget';
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
            budget.obligations.dues.destroy({
                obligation: formHandler.data.obligation_id,
                due: formHandler.data.id,
            }).url,
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
