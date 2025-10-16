import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteProgramClassificationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteProgramClassification = ({ openModal, closeModal }: DeleteProgramClassificationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('administrator.program-classifications.destroy', { program_classification: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();
                toast.success('Program classification has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Program Classification"
            saveText="Yes, Im sure!"
            variant="destructive"
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
            data={String(formHandler.data.name)}
        />
    );
};

export default DeleteProgramClassification;
