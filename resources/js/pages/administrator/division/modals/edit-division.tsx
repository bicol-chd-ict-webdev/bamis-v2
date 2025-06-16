import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import DivisionBaseForm from '../division-base-form';

type EditDivisionProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditDivision = ({ openModal, closeModal }: EditDivisionProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('administrator.divisions.update', { division: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Division has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Division"
            saveText="Update"
            subTitle="Make changes to your division information."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <DivisionBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default EditDivision;
