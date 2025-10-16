import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ProjectTypeBaseForm from '../project-type-base-form';

type CreateProjectTypeProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateProjectType = ({ openModal, closeModal }: CreateProjectTypeProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('administrator.project-types.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Project type has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Project Type"
            subTitle="Provide the necessary details to create a project type entry."
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

export default CreateProjectType;
