import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteObjectDistributionProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteObjectDistribution = ({ openModal, closeModal }: DeleteObjectDistributionProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('budget.object-distributions.destroy', { object_distribution: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Object distribution has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Object Distribution"
            saveText="Yes, Im sure!"
            variant="destructive"
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
            data={FormatMoney(Number(formHandler.data.amount))}
            supportingText="worth of object distribution"
        />
    );
};

export default DeleteObjectDistribution;
