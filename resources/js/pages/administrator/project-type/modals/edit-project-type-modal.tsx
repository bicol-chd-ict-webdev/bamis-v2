import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/administrator/project-types';
import { ModalProps } from '@/types';
import { JSX } from 'react';
import ProjectTypeBaseForm from '../project-type-base-form';

const EditProjectTypeModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Project Type Updated!',
            description: 'The project type has been updated with the latest changes.',
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
            title="Edit Project Type"
            description="Make necessary changes to keep the project type up to date."
            saveText="Update"
        >
            <ProjectTypeBaseForm />
        </Modal>
    );
};

export default EditProjectTypeModal;
