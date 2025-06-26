import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteAppropriationTypeProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteAppropriationType = ({ openModal, closeModal }: DeleteAppropriationTypeProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('administrator.appropriation-types.destroy', { appropriation_type: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Appropriation type has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Appropriation Type"
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

export default DeleteAppropriationType;
