import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { FormatMoney } from '@/lib/formatter';
import { destroy } from '@/routes/budget/general-appropriations';
import type { Allocation, ModalProps } from '@/types';
import { JSX } from 'react';

const DeleteGeneralAppropriation = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Allocation>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'delete',
        url: destroy.url(formHandler.data.id),
        successMessage: {
            title: 'Allocation Deleted!',
            description: 'The general appropriation act allocation has been permanently removed from the system.',
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
            supportingText="worth of allocation"
            title="Delete General Appropriation"
        />
    );
};

export default DeleteGeneralAppropriation;
