import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ObjectDistributionBaseForm from '../object-distribution-base-form';

type CreateObjectDistributionProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateObjectDistribution = ({ openModal, closeModal }: CreateObjectDistributionProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.object-distributions.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Object distribution has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Object Distribution"
            subTitle="Create a detailed object distribution by specifying its key identifiers."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <ObjectDistributionBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateObjectDistribution;
