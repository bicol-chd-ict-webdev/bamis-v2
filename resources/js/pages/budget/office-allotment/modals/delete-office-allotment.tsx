import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { FormatMoney } from '@/lib/formatter';
import { destroy } from '@/routes/budget/office-allotments';
import type { ModalProps, OfficeAllotment } from '@/types';
import { JSX } from 'react';

const DeleteOfficeAllotment = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<OfficeAllotment>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'delete',
        url: destroy.url(formHandler.data.id),
        successMessage: {
            title: 'Office Allotment Deleted!',
            description: 'The office allotment has been permanently removed from the system.',
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
            title="Delete Office Allotment"
            supportingText="worth of office allotment"
        />
    );
};

export default DeleteOfficeAllotment;
