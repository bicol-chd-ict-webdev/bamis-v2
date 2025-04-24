import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import DivisionBaseForm from '../division-base-form';

type CreateDivisionProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreateDivision = ({ openModal, closeModal }: CreateDivisionProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('admin.divisions.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! Division has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create Division"
            subTitle="Set up your new division by providing a name and acronym."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <DivisionBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreateDivision;
