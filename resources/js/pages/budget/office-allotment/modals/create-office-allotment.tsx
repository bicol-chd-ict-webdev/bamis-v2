import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import OfficeAllotmentBaseForm from '../office-allotment-base-form';

type CreateOfficeAllotmentProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateOfficeAllotment = ({ openModal, closeModal }: CreateOfficeAllotmentProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.office-allotments.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Office allotment has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Office Allotment"
            subTitle="Create a detailed office allotment by specifying its key identifiers."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <OfficeAllotmentBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateOfficeAllotment;
