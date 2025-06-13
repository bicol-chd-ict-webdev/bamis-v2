import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import LineItemBaseForm from '../lineitem-base-form';

type CreateLineItemProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateLineItem = ({ openModal, closeModal }: CreateLineItemProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.line-items.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Line item has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Line Item"
            subTitle="Create a detailed line item by specifying its key identifiers."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <LineItemBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateLineItem;
