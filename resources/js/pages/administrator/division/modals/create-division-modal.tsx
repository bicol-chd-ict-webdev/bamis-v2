import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/administrator/divisions';
import type { Division, ModalProps } from '@/types';
import { JSX } from 'react';
import DivisionBaseForm from '../division-base-form';

const CreateDivisionModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Division>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Division Created!',
            description: 'The division has been successfully created.',
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
            title="Create Division"
            description="Set up your new division by providing a name and acronym."
        >
            <DivisionBaseForm />
        </Modal>
    );
};

export default CreateDivisionModal;
