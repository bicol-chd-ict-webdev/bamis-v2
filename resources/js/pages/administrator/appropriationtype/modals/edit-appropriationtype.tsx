import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AppropriationTypeBaseForm from '../appropriationtype-base-form';

type EditAppropriationTypeProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditAppropriationType = ({ openModal, closeModal }: EditAppropriationTypeProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('administrator.appropriation-types.update', { appropriation_type: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Appropration type has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Appropration Type"
            saveText="Update"
            subTitle="Edit the details of this appropriation type to reflect the latest changes."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <AppropriationTypeBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default EditAppropriationType;
