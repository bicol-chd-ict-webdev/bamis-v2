import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/budget/expenditures';
import type { Expenditure, ModalProps } from '@/types';
import { JSX } from 'react';
import ExpenditureBaseForm from '../expenditure-base-form';

const CreateExpenditureModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Expenditure>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Expenditure Created!',
            description: 'The expenditure has been successfully created.',
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
            title="Create Expenditure"
            description="Create a detailed expenditure by specifying its key identifiers."
        >
            <ExpenditureBaseForm />
        </Modal>
    );
};

export default CreateExpenditureModal;
