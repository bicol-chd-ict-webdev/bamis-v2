import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/budget/obligations';
import type { ModalProps, Obligation } from '@/types';
import { JSX } from 'react';
import ObligationBaseForm from '../obligation-base-form';

const CreateObligation = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Obligation>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Obligation Created!',
            description: 'The obligation has been successfully created.',
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
            title="Create Obligation"
            description="Provide the necessary details to create an obligation entry."
            maxWidth="!max-w-5xl"
        >
            <ObligationBaseForm />
        </Modal>
    );
};

export default CreateObligation;
