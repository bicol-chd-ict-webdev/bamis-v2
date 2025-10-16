import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AppropriationBaseForm from '../appropriation-base-form';

type EditAppropriationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditAppropriation = ({ openModal, closeModal }: EditAppropriationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('administrator.appropriations.update', { appropriation: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Appropriation has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Appropriation"
            saveText="Update"
            subTitle="Make necessary changes to keep the appropriation up to date."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <AppropriationBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default EditAppropriation;
