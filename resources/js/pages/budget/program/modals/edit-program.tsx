import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ProgramBaseForm from '../program-base-form';

type EditProgramProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditProgram = ({ openModal, closeModal }: EditProgramProps) => {
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
            subTitle="Make necessary changes to keep the program up to date."
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

export default EditProgram;
