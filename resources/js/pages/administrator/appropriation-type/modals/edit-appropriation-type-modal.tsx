import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/administrator/appropriation-types';
import type { AppropriationType, ModalProps } from '@/types';
import { JSX } from 'react';
import AppropriationTypeBaseForm from '../appropriation-type-base-form';

const EditAppropriationTypeModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<AppropriationType>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Appropriation Type Updated!',
            description: 'The appropriation type has been updated with the latest changes.',
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
            title="Edit Appropration Type"
            description="Make necessary changes to keep the appropriation type up to date."
            saveText="Update"
        >
            <AppropriationTypeBaseForm />
        </Modal>
    );
};

export default EditAppropriationTypeModal;
