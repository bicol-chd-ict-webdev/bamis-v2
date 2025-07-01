import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AllocationBaseForm from '../../allocation-base-form';

type EditGeneralAppropriationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditGeneralAppropriation = ({ openModal, closeModal }: EditGeneralAppropriationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.general-appropriations.update', { general_appropriation: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('General appropriation has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit General Appropriation"
            saveText="Update"
            subTitle="Edit the details of this general appropriation to reflect the latest changes."
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

export default EditGeneralAppropriation;
