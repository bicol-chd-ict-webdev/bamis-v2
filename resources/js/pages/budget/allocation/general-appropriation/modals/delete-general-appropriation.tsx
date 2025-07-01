import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteGeneralAppropriationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteGeneralAppropriation = ({ openModal, closeModal }: DeleteGeneralAppropriationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('budget.general-appropriations.destroy', { general_appropriation: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();
                toast.success('General appropriation has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete General Appropriation"
            saveText="Yes, Im sure!"
            variant="destructive"
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
            data={FormatMoney(formHandler.data.amount)}
            supportingText="worth of allocation"
        />
    );
};

export default DeleteGeneralAppropriation;
