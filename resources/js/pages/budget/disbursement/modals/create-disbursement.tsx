import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/budget/obligations/disbursements';
import type { ModalProps, Obligation } from '@/types';
import { JSX } from 'react';
import DisbursementBaseForm from '../disbursement-base-form';

const CreateDisbursement = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Obligation>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(formHandler.data.id),
        successMessage: {
            title: 'Disbursement Created!',
            description: 'The disbursement has been successfully created.',
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
            title="Create Disbursement"
            description="Provide the necessary details to create an disbursement entry."
            maxWidth="max-w-2xl!"
        >
            <DisbursementBaseForm />
        </Modal>
    );
};

export default CreateDisbursement;
