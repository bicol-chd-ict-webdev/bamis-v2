import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import DisbursementBaseForm from '../disbursement-base-form';

type EditDisbursementProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditDisbursement = ({ openModal, closeModal }: EditDisbursementProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(
            route('budget.obligations.disbursements.update', {
                obligation: Number(formHandler.data.obligation_id),
                disbursement: Number(formHandler.data.id),
            }),
            {
                onSuccess: () => {
                    closeModal();

                    toast.success('Disbursement has been updated with the latest changes.');
                },
                onError: () => {
                    toast.error('Something went wrong. Please try again.');
                },
            },
        );
    };

    return (
        <Modal
            title="Edit Disbursement"
            saveText="Update"
            subTitle="Make necessary changes to keep the disbursement up to date."
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

export default EditDisbursement;
