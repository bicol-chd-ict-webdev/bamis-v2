import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ProgramClassificationBaseForm from '../program-classification-base-form';

type EditProgramClassificationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditProgramClassification = ({ openModal, closeModal }: EditProgramClassificationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('administrator.program-classifications.update', { program_classification: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Program classification has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Program Classification"
            saveText="Update"
            subTitle="Make necessary changes to keep the program classification up to date."
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

export default EditProgramClassification;
