import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/budget/subprograms';
import type { ModalProps, Subprogram } from '@/types';
import { JSX } from 'react';
import SubprogramBaseForm from '../subprogram-base-form';

const CreateSubprogramModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Subprogram>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Subprogram Created!',
            description: 'The subprogram has been successfully created.',
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
            title="Create Subprogram"
            description="Provide the necessary details to create a subprogram entry."
        >
            <SubprogramBaseForm />
        </Modal>
    );
};

export default CreateSubprogramModal;
