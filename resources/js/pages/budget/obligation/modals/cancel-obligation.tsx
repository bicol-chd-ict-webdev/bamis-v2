import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { FormatMoney } from '@/lib/formatter';
import { cancel } from '@/routes/budget/obligations';
import type { ModalProps, Obligation } from '@/types';
import { JSX } from 'react';

const CancelObligation = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Obligation>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: cancel.url(formHandler.data.id),
        successMessage: {
            title: 'Obligation Cancelled!',
            description: 'The obligation has been successfully cancelled.',
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
            title="Cancel Obligation"
            supportingText="worth of obligation"
            action="cancel"
        />
    );
};

export default CancelObligation;
