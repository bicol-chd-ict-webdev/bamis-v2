import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AllocationBaseForm from '../../allocation-base-form';

type EditSubAllotmentProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditSubAllotment = ({ openModal, closeModal }: EditSubAllotmentProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.sub-allotments.update', { sub_allotment: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Sub allotment has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Sub allotment"
            saveText="Update"
            subTitle="Make necessary changes to keep the sub allotment allocation up to date."
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

export default EditSubAllotment;
