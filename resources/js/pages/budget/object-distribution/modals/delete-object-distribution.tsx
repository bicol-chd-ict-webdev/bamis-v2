import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import { JSX } from 'react';
import type { ModalProps, ObjectDistribution } from '@/types';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { destroy } from '@/routes/budget/object-distributions';

const DeleteObjectDistribution = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<ObjectDistribution>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'delete',
        url: destroy.url(formHandler.data.id),
        successMessage: {
            title: 'Object Distribution Deleted!',
            description: 'The object distribution has been permanently removed from the system.',
        },
        onSuccess: closeModal,
    });

    return (
        <DeleteModal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            data={FormatMoney(Number(formHandler.data.amount))}
            title="Delete Object Distribution"
            supportingText="worth of object distribution"
        />
    );
};

export default DeleteObjectDistribution;
