import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { type Program } from '@/types';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import SubprogramBaseForm from '../subprogram-base-form';

type CreateSubprogramProps = {
    programs: Program[];
    openModal: boolean;
    closeModal: () => void;
};

const CreateSubprogram = ({ openModal, closeModal, programs }: CreateSubprogramProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.subprograms.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Subprogram has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Subprogram"
            subTitle="Create a detailed subprogram by specifying its key identifiers."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <SubprogramBaseForm formHandler={formHandler} programs={programs} />
            </form>
        </Modal>
    );
};

export default CreateSubprogram;
