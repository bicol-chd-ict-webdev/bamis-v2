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

        formHandler.post(route('admin.sections.store'), {
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
            subTitle="Set up your new section by providing the required fields."
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
