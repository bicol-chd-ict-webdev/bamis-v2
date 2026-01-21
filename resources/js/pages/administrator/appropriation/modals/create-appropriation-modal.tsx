import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/administrator/appropriations';
import type { Appropriation, ModalProps } from '@/types';
import { JSX } from 'react';
import AppropriationBaseForm from '../appropriation-base-form';

const CreateAppropriationModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Appropriation>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Appropriation Created!',
            description: 'The appropriation has been successfully created.',
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
            title="Create Appropriation"
            description="Provide the necessary details to create an appropriation entry."
        >
            <AppropriationBaseForm />
        </Modal>
    );
};

export default CreateAppropriationModal;
