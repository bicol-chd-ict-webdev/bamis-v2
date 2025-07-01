import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteLineItemProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteLineItem = ({ openModal, closeModal }: DeleteLineItemProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('budget.line-items.destroy', { line_item: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Line item has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Line Item"
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

export default DeleteLineItem;
