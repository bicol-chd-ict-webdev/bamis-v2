import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { destroy } from '@/routes/administrator/allotment-classes';
import type { ModalProps } from '@/types';
import { JSX } from 'react';

const DeleteAllotmentClassModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'delete',
        url: destroy.url(formHandler.data.id),
        successMessage: {
            title: 'Allotment Class Deleted!',
            description: 'The allotment class has been permanently removed from the system.',
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
            title="Delete Allotment Class"
        />
    );
};

export default DeleteAllotmentClassModal;
