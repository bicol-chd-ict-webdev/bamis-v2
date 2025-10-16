import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AppropriationTypeBaseForm from '../appropriation-type-base-form';

type CreateAppropriationTypeProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateAppropriationType = ({ openModal, closeModal }: CreateAppropriationTypeProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('administrator.appropriation-types.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Appropriation type has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Appropriation Type"
            subTitle="Provide the necessary details to create an appropriation type entry."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <AppropriationTypeBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateAppropriationType;
