import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ProgramBaseForm from '../program-base-form';

type CreateProgramProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateProgram = ({ openModal, closeModal }: CreateProgramProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('budget.programs.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Program has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Program"
            subTitle="Provide the necessary details to create a program entry."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <ProgramBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateProgram;
