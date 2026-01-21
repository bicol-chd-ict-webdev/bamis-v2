import budget from '@/routes/budget';
import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import DueBaseForm from '@/pages/budget/due/due-base-form';

type EditDueProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditDue = ({ openModal, closeModal }: EditDueProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(
            budget.obligations.dues.update({
                obligation: formHandler.data.obligation_id,
                due: formHandler.data.id,
            }).url,
            {
                onSuccess: () => {
                    closeModal();

                    toast.success('Due and demandable has been updated with the latest changes.');
                },
                onError: () => {
                    toast.error('Something went wrong. Please try again.');
                },
            },
        );
    };

    return (
        <Modal
            title="Edit Due"
            saveText="Update"
            subTitle="Make necessary changes to keep the due and demandable up to date."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <DueBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default EditDue;
