import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import OfficeAllotmentBaseForm from '../office-allotment-base-form';

type EditOfficeAllotmentProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditOfficeAllotment = ({ openModal, closeModal }: EditOfficeAllotmentProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.office-allotments.update', { office_allotment: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Office allotment has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Office Allotment"
            saveText="Update"
            subTitle="Edit the details of this office allotment to reflect the latest changes."
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

export default EditOfficeAllotment;
