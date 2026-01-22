import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/budget/obligations';
import type { ModalProps, Obligation } from '@/types';
import { JSX } from 'react';
import ObligationBaseForm from '../obligation-base-form';

const EditObligation = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Obligation>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Obligation Updated!',
            description: 'The obligation has been updated with the latest changes.',
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
            title="Edit Obligation"
            description="Make necessary changes to keep the obligation up to date."
            saveText="Update"
            maxWidth="!max-w-5xl"
        >
            <ObligationBaseForm />
        </Modal>
    );
};

export default EditObligation;
