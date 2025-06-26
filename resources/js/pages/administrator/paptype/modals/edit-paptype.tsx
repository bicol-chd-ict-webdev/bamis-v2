import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import PapTypeBaseForm from '../paptype-base-form';

type EditPapTypeProps = {
    openModal: boolean;
    closeModal: () => void;
};

const EditPapType = ({ openModal, closeModal }: EditPapTypeProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('administrator.pap-types.update', { pap_type: Number(formHandler.data.id) }), {
            onSuccess: () => {
                closeModal();

                toast.success('PAP type has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit PAP Type"
            saveText="Update"
            subTitle="Edit the details of this PAP type to reflect the latest changes."
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

export default EditPapType;
