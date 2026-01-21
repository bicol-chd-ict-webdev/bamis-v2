import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { destroy } from '@/routes/budget/line-items';
import type { LineItem, ModalProps } from '@/types';
import { JSX } from 'react';

const DeleteLineItem = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<LineItem>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'delete',
        url: destroy.url(formHandler.data.id),
        successMessage: {
            title: 'Line Item Deleted!',
            description: 'The line item has been permanently removed from the system.',
        },
        onSuccess: closeModal,
    });

    return (
        <DeleteModal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            data={String(formHandler.data.name)}
            title="Delete Line Item"
        />
    );
};

export default DeleteLineItem;
