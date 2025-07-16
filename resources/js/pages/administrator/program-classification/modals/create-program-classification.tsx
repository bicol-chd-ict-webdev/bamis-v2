import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ProgramClassificationBaseForm from '../program-classification-base-form';

type CreateProgramClassificationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateProgramClassification = ({ openModal, closeModal }: CreateProgramClassificationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('administrator.program-classifications.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Program classification has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Program Classification"
            subTitle="Provide the necessary details to create an program classification entry."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <ProgramClassificationBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateProgramClassification;
