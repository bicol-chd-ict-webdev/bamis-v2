import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteSubAllotmentProps = {
    openModal: boolean;
    closeModal: () => void;
};

const DeleteSubAllotment = ({ openModal, closeModal }: DeleteSubAllotmentProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.delete(route('budget.sub-allotments.destroy', { sub_allotment: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();
                toast.success('Sub allotment has been successfully deleted.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <DeleteModal
            title="Delete Sub Allotment"
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

export default DeleteSubAllotment;
