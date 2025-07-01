import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import LineItemBaseForm from '../line-item-base-form';

type EditLineItemProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditLineItem = ({ openModal, closeModal }: EditLineItemProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.line-items.update', { line_item: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Line item has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Line Item"
            saveText="Update"
            subTitle="Edit the details of this budget item to reflect the latest changes."
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

export default EditLineItem;
