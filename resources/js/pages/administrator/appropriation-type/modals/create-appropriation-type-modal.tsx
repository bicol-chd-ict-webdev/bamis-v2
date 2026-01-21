import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/administrator/appropriation-types';
import type { AppropriationType, ModalProps } from '@/types';
import { JSX } from 'react';
import AppropriationTypeBaseForm from '../appropriation-type-base-form';

const CreateAppropriationTypeModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<AppropriationType>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Appropriation Type Created!',
            description: 'The appropriation type has been successfully created.',
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
            title="Create Appropriation Type"
            description="Provide the necessary details to create an appropriation type entry."
        >
            <AppropriationTypeBaseForm />
        </Modal>
    );
};

export default CreateAppropriationTypeModal;
