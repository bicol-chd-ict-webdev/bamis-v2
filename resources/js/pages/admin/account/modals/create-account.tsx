import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AccountBaseForm from '../account-base-form';

type CreateAccountProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateAccount = ({ openModal, closeModal }: CreateAccountProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('admin.accounts.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Account has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Account"
            subTitle="Set up a new account by providing the user's information."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <AccountBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateAccount;
