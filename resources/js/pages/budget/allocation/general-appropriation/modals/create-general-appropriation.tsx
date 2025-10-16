import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AllocationBaseForm from '../../allocation-base-form';

type CreateGeneralAppropriationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateGeneralAppropriation = ({ openModal, closeModal }: CreateGeneralAppropriationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.general-appropriations.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! General appropriation has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create General Appropriation"
            subTitle="Provide the necessary details to create a general appropriation allocation entry."
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

export default CreateGeneralAppropriation;
