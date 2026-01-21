import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { destroy } from '@/routes/administrator/project-types';
import type { ModalProps, ProjectType } from '@/types';
import { JSX } from 'react';

const DeleteProjectTypeModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<ProjectType>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'delete',
        url: destroy.url(formHandler.data.id),
        successMessage: {
            title: 'Project Type Deleted!',
            description: 'The project type has been permanently removed from the system.',
        },
        onSuccess: closeModal,
    });

    return (
        <DeleteModal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            data={String(formHandler.data.name)}
            title="Delete Project Type"
        />
    );
};

export default DeleteProjectTypeModal;
