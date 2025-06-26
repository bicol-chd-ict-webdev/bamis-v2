import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ProgramBaseForm from '../program-base-form';

type CreateProgramProps = {
    openModal: boolean;
    appropriationSources: [];
    prexcs: [];
    closeModal: () => void;
};

const CreateProgram = ({ openModal, closeModal, appropriationSources, prexcs }: CreateProgramProps) => {
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
            subTitle="Create a detailed program by specifying its key identifiers."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <ProgramBaseForm formHandler={formHandler} appropriationSources={appropriationSources} prexcs={prexcs} />
            </form>
        </Modal>
    );
};

export default CreateProgram;
