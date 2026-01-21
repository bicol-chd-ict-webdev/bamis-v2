import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/budget/line-items';
import type { LineItem, ModalProps } from '@/types';
import { JSX } from 'react';
import LineItemBaseForm from '../line-item-base-form';

const EditLineItem = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<LineItem>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Line Item Updated!',
            description: 'The line item has been updated with the latest changes.',
        },
        onSuccess: closeModal,
    });

    return (
        <Modal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            isDirty={isDirty}
            title="Edit Line Item"
            description="Edit the details of this budget item to reflect the latest changes."
            saveText="Update"
        >
            <LineItemBaseForm />
        </Modal>
    );
};

export default EditLineItem;
