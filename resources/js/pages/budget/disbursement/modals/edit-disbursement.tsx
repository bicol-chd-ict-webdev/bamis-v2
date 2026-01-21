import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/budget/obligations/disbursements';
import type { Disbursement, ModalProps } from '@/types';
import { JSX } from 'react';
import DisbursementBaseForm from '../disbursement-base-form';

const EditDisbursement = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Disbursement>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url({
            obligation: formHandler.data.obligation_id,
            disbursement: formHandler.data.id,
        }),
        successMessage: {
            title: 'Disbursement Updated!',
            description: 'The disbursement has been updated with the latest changes.',
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
            title="Edit Disbursement"
            saveText="Update"
            description="Make necessary changes to keep the disbursement up to date."
            maxWidth="max-w-2xl!"
        >
            <DisbursementBaseForm />
        </Modal>
    );
};

export default EditDisbursement;
