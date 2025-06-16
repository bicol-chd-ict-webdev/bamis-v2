import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteDivisionProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteDivision = ({ openModal, closeModal }: DeleteDivisionProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('administrator.divisions.destroy', { division: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Division has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Division"
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

export default DeleteDivision;
