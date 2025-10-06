import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ObligationBaseForm from '../obligation-base-form';

type CreateObligationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateObligation = ({ openModal, closeModal }: CreateObligationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.obligations.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Obligation has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Obligation"
            subTitle="Provide the necessary details to create an obligation entry."
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

export default CreateObligation;
