import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { FormatMoney } from '@/lib/formatter';
import { destroy } from '@/routes/budget/obligations';
import type { ModalProps, Obligation } from '@/types';
import { JSX } from 'react';

const DeleteObligation = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Obligation>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'delete',
        url: destroy.url(formHandler.data.id),
        successMessage: {
            title: 'Obligation Deleted!',
            description: 'The obligation has been permanently removed from the system.',
        },
        onSuccess: closeModal,
    });

    return (
        <DeleteModal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            data={FormatMoney(Number(formHandler.data.offices[0].amount))}
            title="Delete Obligation"
            supportingText="worth of obligation"
        />
    );
};

export default DeleteObligation;
