import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import DisbursementBaseForm from '../disbursement-base-form';

type CreateDisbursementProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateDisbursement = ({ openModal, closeModal }: CreateDisbursementProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.obligations.disbursements.store', { obligation: formHandler.data.obligation_id }), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Disbursement has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Disbursement"
            subTitle="Provide the necessary details to create an disbursement entry."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <DisbursementBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateDisbursement;
