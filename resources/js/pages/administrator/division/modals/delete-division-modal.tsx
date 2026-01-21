import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { destroy } from '@/routes/administrator/divisions';
import type { Division, ModalProps } from '@/types';
import { JSX } from 'react';

const DeleteDivisionModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Division>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'delete',
        url: destroy.url(formHandler.data.id),
        successMessage: {
            title: 'Division Deleted!',
            description: 'The division has been permanently removed from the system.',
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
            title="Delete Division"
        />
    );
};

export default DeleteDivisionModal;
