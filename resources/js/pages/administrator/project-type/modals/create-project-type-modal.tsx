import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/administrator/project-types';
import type { ModalProps, ProjectType } from '@/types';
import { JSX } from 'react';
import ProjectTypeBaseForm from '../project-type-base-form';

const CreateProjectTypeModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<ProjectType>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Project Type Created!',
            description: 'The project type has been successfully created.',
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
            title="Create Project Type"
            description="Provide the necessary details to create a project type entry."
        >
            <ProjectTypeBaseForm />
        </Modal>
    );
};

export default CreateProjectTypeModal;
