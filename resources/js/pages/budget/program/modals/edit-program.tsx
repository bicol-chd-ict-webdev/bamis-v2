import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ProgramBaseForm from '../program-base-form';

type EditProgramProps = {
    openModal: boolean;
    appropriationSources: [];
    prexcs: [];
    closeModal: () => void;
};

const EditProgram = ({ openModal, closeModal, appropriationSources, prexcs }: EditProgramProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.programs.update', { program: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Program has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Program"
            saveText="Update"
            subTitle="Edit the details of this program to reflect the latest changes."
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

export default EditProgram;
