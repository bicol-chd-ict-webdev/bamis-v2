import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/budget/line-items';
import type { LineItem, ModalProps } from '@/types';
import { JSX } from 'react';
import LineItemBaseForm from '../line-item-base-form';

const CreateLineItemModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<LineItem>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Line Item Created!',
            description: 'The line item has been successfully created.',
        },
        onSuccess: closeModal,
    });

    return (
        <Modal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            isDirty={formHandler.isDirty}
            title="Create Line Item"
            description="Create a detailed line item by specifying its key identifiers."
        >
            <LineItemBaseForm />
        </Modal>
    );
};

export default CreateLineItemModal;
