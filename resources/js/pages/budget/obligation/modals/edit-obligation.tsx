import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ObligationBaseForm from '../obligation-base-form';

type EditObligationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditObligation = ({ openModal, closeModal }: EditObligationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.obligations.update', { obligation: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Obligation has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Obligation"
            saveText="Update"
            subTitle="Make necessary changes to keep the obligation up to date."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
            maxWidth="!max-w-3xl"
        >
            <form onSubmit={handleSubmit}>
                <ObligationBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default EditObligation;
