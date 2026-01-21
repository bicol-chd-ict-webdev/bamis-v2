import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import administrator from '@/routes/administrator';
import type { ModalProps, User } from '@/types';
import { JSX } from 'react';
import AccountBaseForm from '../account-base-form';

const CreateAccountModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<User>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: administrator.accounts.store.url(),
        successMessage: {
            title: 'Account Created!',
            description: 'The account has been successfully created.',
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
            title="Create Acount"
            description="Set up a new account by providing the user's information."
        >
            <AccountBaseForm />
        </Modal>
    );
};

export default CreateAccountModal;
