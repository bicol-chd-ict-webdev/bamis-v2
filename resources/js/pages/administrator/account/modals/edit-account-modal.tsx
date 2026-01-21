import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import administrator from '@/routes/administrator';
import type { ModalProps, User } from '@/types';
import { JSX } from 'react';
import AccountBaseForm from '../account-base-form';

const EditAccountModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<User>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: administrator.accounts.update.url(formHandler.data.id),
        successMessage: {
            title: 'Account Updated!',
            description: 'The account has been updated with the latest changes.',
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
            title="Update Account"
            description="Modify the existing account details below."
            saveText="Update"
        >
            <AccountBaseForm />
        </Modal>
    );
};

export default EditAccountModal;
