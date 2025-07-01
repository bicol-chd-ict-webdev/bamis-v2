import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AllotmentClassBaseForm from '../allotment-class-base-form';

type EditAllotmentClassProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditAllotmentClass = ({ openModal, closeModal }: EditAllotmentClassProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('administrator.allotment-classes.update', { allotment_class: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Allotment class has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Allotment Class"
            saveText="Update"
            subTitle="Edit the details of this allotment class to reflect the latest changes."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <AllotmentClassBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default EditAllotmentClass;
