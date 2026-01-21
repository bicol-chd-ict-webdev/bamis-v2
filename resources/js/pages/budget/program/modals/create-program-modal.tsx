import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/budget/programs';
import type { ModalProps, Program } from '@/types';
import { JSX } from 'react';
import ProgramBaseForm from '../program-base-form';

const CreateProgramModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Program>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Program Created!',
            description: 'The program has been successfully created.',
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
            title="Create Program"
            description="Provide the necessary details to create a program entry."
        >
            <ProgramBaseForm />
        </Modal>
    );
};

export default CreateProgramModal;
