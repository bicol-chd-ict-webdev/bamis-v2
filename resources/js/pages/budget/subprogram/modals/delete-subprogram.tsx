import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteSubprogramProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteSubprogram = ({ openModal, closeModal }: DeleteSubprogramProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('budget.subprograms.destroy', { subprogram: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();
                toast.success('Subprogram has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Subprogram"
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

export default DeleteSubprogram;
