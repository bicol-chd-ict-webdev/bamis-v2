import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/administrator/program-classifications';
import type { ModalProps, ProgramClassification } from '@/types';
import { JSX } from 'react';
import ProgramClassificationBaseForm from '../program-classification-base-form';

const CreateProgramClassificationModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<ProgramClassification>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Program Classification Created!',
            description: 'The program classification has been successfully created.',
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
            title="Create Program Classification"
            description="Provide the necessary details to create an program classification entry."
        >
            <ProgramClassificationBaseForm />
        </Modal>
    );
};

export default CreateProgramClassificationModal;
