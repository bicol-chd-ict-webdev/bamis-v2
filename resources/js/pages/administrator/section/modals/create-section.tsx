import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { type Division } from '@/types';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import SectionBaseForm from '../section-base-form';

type CreateSectionProps = {
    openModal: boolean;
    closeModal: () => void;
    divisions: Division[];
};

const CreateSection = ({ openModal, closeModal, divisions }: CreateSectionProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('administrator.sections.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Sections has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Section"
            subTitle="Provide the necessary details to register a new section in the system."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <SectionBaseForm formHandler={formHandler} divisions={divisions} />
            </form>
        </Modal>
    );
};

export default CreateSection;
