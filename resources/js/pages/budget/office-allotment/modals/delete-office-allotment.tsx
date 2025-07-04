import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteOfficeAllotmentProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteOfficeAllotment = ({ openModal, closeModal }: DeleteOfficeAllotmentProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('budget.office-allotments.destroy', { office_allotment: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Office allotment has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Office Allotment"
            saveText="Yes, Im sure!"
            variant="destructive"
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
            data={FormatMoney(Number(formHandler.data.amount))}
            supportingText="worth of office allotment"
        />
    );
};

export default DeleteOfficeAllotment;
