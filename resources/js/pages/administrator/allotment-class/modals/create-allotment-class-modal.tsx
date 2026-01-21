import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/administrator/allotment-classes';
import type { ModalProps } from '@/types';
import { JSX } from 'react';
import AllotmentClassBaseForm from '../allotment-class-base-form';

const CreateAllotmentClassModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Allotment Class Created!',
            description: 'The allotment class has been successfully created.',
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
            title="Create Allotment Class"
            description="Provide the necessary details to create an allotment class entry."
        >
            <AllotmentClassBaseForm />
        </Modal>
    );
};

export default CreateAllotmentClassModal;
