import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AccountBaseForm from '../account-base-form';

type EditAccountProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditAccount = ({ openModal, closeModal }: EditAccountProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('admin.accounts.update', Number(formHandler.data.id)), {
            onSuccess: () => {
                closeModal();

                toast.success('Account has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Account"
            saveText="Update"
            subTitle="Make changes to your account information."
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

export default EditAccount;
