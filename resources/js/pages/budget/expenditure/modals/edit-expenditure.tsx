import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { AllotmentClass } from '@/types';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ExpenditureBaseForm from '../expenditure-base-form';

type EditExpenditureProps = {
    openModal: boolean;
    closeModal: () => void;
    allotmentClasses: AllotmentClass[];
};

const EditExpenditure = ({ openModal, closeModal, allotmentClasses }: EditExpenditureProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.expenditures.update', { expenditure: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Expenditure has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Expenditure"
            saveText="Update"
            subTitle="Edit the details of this expenditure to reflect the latest changes."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <ExpenditureBaseForm formHandler={formHandler} allotmentClasses={allotmentClasses} />
            </form>
        </Modal>
    );
};

export default EditExpenditure;
