import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AllocationBaseForm from '../../allocation-base-form';

type CreateSubAllotmentProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateSubAllotment = ({ openModal, closeModal }: CreateSubAllotmentProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.sub-allotments.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Sub allotment has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Sub Allotment"
            subTitle="Provide the necessary details to create a sub allotment allocation entry."
            maxWidth="!max-w-7xl"
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <AllocationBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateSubAllotment;
