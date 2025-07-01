import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteAllotmentClassProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteAllotmentClass = ({ openModal, closeModal }: DeleteAllotmentClassProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('administrator.allotment-classes.destroy', { allotment_class: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();
                toast.success('Allotment class has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Allotment Class"
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

export default DeleteAllotmentClass;
