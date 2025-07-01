import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ProjectTypeBaseForm from '../project-type-base-form';

type EditProjectTypeProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditProjectType = ({ openModal, closeModal }: EditProjectTypeProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('administrator.project-types.update', { project_type: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Project type has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Project Type"
            saveText="Update"
            subTitle="Edit the details of this project type to reflect the latest changes."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <ProjectTypeBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default EditProjectType;
