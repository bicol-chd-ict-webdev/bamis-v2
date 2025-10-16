import DeleteModal from '@/components/delete-modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney } from '@/lib/formatter';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import CancelModal from '@/components/cancel-modal';

type CancelObligationProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CancelObligation = ({ openModal, closeModal }: CancelObligationProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.obligations.cancel', { obligation: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Obligation has been successfully cancelled.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <CancelModal
            title="Cancel Obligation"
            saveText="Yes, Im sure!"
            variant="destructive"
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
            data={FormatMoney(Number(formHandler.data.offices[0].amount))}
            supportingText="worth of obligation"
        />
    );
};

export default CancelObligation;
