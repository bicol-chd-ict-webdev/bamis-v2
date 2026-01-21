import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { FormatMoney } from '@/lib/formatter';
import { destroy } from '@/routes/budget/obligations/disbursements';
import type { Disbursement, ModalProps } from '@/types';
import { JSX } from 'react';

const DeleteDisbursement = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Disbursement>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'delete',
        url: destroy.url({
            obligation: formHandler.data.obligation_id,
            disbursement: formHandler.data.id,
        }),
        successMessage: {
            title: 'Disbursement Deleted!',
            description: 'The disbursement has been permanently removed from the system.',
        },
        onSuccess: closeModal,
    });

    return (
        <DeleteModal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            data={FormatMoney(Number(formHandler.data.total_amount))}
            title="Delete Disbursement"
            supportingText="worth of disbursement"
        />
    );
};

export default DeleteDisbursement;
