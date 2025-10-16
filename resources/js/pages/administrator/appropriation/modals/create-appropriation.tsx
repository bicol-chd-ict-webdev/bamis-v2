import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AppropriationBaseForm from '../appropriation-base-form';

type CreateAppropriationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateAppropriation = ({ openModal, closeModal }: CreateAppropriationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('administrator.appropriations.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Appropriation has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Appropriation"
            subTitle="Provide the necessary details to create an appropriation entry."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <AppropriationBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateAppropriation;
