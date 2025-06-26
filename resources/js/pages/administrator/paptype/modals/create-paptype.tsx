import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import PapTypeBaseForm from '../paptype-base-form';

type CreatePapTypeProps = {
    openModal: boolean;
    closeModal: () => void;
};

const CreatePapType = ({ openModal, closeModal }: CreatePapTypeProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.post(route('administrator.pap-types.store'), {
            onSuccess: () => {
                closeModal();

                toast.success('Great! PAP type has been successfully created.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Create PAP Type"
            subTitle="Create a detailed PAP type by specifying its key identifiers."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <PapTypeBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default CreatePapType;
