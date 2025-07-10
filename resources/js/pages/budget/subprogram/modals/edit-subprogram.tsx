import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import SubprogramBaseForm from '../subprogram-base-form';

type EditSubprogramProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditSubprogram = ({ openModal, closeModal }: EditSubprogramProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('budget.subprograms.update', { subprogram: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('Subprogram has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Subprogram"
            saveText="Update"
            subTitle="Make necessary changes to keep the subprogram up to date."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <SubprogramBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default EditSubprogram;
