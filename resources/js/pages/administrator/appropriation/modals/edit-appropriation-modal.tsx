import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/administrator/appropriations';
import type { Appropriation, ModalProps } from '@/types';
import { JSX } from 'react';
import AppropriationBaseForm from '../appropriation-base-form';

const EditAppropriationModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Appropriation>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Appropriation Updated!',
            description: 'The appropriation has been updated with the latest changes.',
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
            title="Edit Appropriation"
            description="Make necessary changes to keep the appropriation up to date."
            saveText="Update"
        >
            <AppropriationBaseForm />
        </Modal>
    );
};

export default EditAppropriationModal;
