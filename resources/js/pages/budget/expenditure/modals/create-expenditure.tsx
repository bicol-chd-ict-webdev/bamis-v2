import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { type AllotmentClass } from '@/types';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ExpenditureBaseForm from '../expenditure-base-form';

type CreateExpenditureProps = {
    openModal: boolean;
    closeModal: () => void;
    allotmentClasses: AllotmentClass[];
};

const CreateExpenditure = ({ openModal, closeModal, allotmentClasses }: CreateExpenditureProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.expenditures.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Expenditure has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Expenditure"
            subTitle="Create a detailed expenditure by specifying its key identifiers."
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

export default CreateExpenditure;
