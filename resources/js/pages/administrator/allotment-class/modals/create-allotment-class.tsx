import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AllotmentClassBaseForm from '../allotment-class-base-form';

type CreateAllotmentClassProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateAllotmentClass = ({ openModal, closeModal }: CreateAllotmentClassProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('administrator.allotment-classes.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Allotment class has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Allotment Class"
            subTitle="Provide the necessary details to create an allotment class entry."
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

export default CreateAllotmentClass;
