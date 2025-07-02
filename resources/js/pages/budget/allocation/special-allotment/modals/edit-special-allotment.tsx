import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AllocationBaseForm from '../../allocation-base-form';

type EditSpecialAllotmentProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditSpecialAllotment = ({ openModal, closeModal }: EditSpecialAllotmentProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.special-allotments.update', { special_allotment: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Special allotment has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Special allotment"
            saveText="Update"
            subTitle="Edit the details of this special allotment to reflect the latest changes."
            maxWidth="!max-w-5xl"
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

export default EditSpecialAllotment;
