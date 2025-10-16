import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import DueBaseForm from '@/pages/budget/due/due-base-form';

type CreateDueProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateDue = ({ openModal, closeModal }: CreateDueProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.obligations.dues.store', { obligation: formHandler.data.obligation_id }), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Due and demandable has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Due"
            subTitle="Provide the necessary details to create a due and demandable entry."
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

export default CreateDue;
