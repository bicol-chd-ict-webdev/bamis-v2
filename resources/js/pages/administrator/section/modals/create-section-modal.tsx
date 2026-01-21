import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/administrator/sections';
import type { ModalProps } from '@/types';
import { JSX } from 'react';
import SectionBaseForm from '../section-base-form';

const CreateSectionModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Section Created!',
            description: 'The section has been successfully created.',
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
            title="Create Section"
            description="Provide the necessary details to register a new section in the system."
        >
            <SectionBaseForm />
        </Modal>
    );
};

export default CreateSectionModal;
