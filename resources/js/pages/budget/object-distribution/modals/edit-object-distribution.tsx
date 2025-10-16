import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ObjectDistributionBaseForm from '../object-distribution-base-form';

type EditObjectDistributionProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditObjectDistribution = ({ openModal, closeModal }: EditObjectDistributionProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.object-distributions.update', { object_distribution: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Object distribution has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Object Distribution"
            saveText="Update"
            subTitle="Edit the details of this object distribution to reflect the latest changes."
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

export default EditObjectDistribution;
