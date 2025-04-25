import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteSectionProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteSection = ({ openModal, closeModal }: DeleteSectionProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('admin.sections.destroy', { section: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Section has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Section"
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

export default DeleteSection;
