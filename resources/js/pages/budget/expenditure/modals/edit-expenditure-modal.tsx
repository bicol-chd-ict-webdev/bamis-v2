import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/budget/expenditures';
import { ModalProps } from '@/types';
import { JSX } from 'react';
import ExpenditureBaseForm from '../expenditure-base-form';

const EditExpenditureModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Expenditure Updated!',
            description: 'The expenditure has been updated with the latest changes.',
        },
        onSuccess: closeModal,
    });

    return (
        <Modal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            isDirty={isDirty}
            title="Edit Expenditure"
            description="Edit the details of this expenditure to reflect the latest changes."
            saveText="Update"
        >
            <ExpenditureBaseForm />
        </Modal>
    );
};

export default EditExpenditureModal;
