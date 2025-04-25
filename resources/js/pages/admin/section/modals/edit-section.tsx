import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { type Division } from '@/types';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import SectionBaseForm from '../section-base-form';

type EditSectionProps = {
    openModal: boolean;
    closeModal: () => void;
    divisions: Division[];
};

const EditSection = ({ openModal, closeModal, divisions }: EditSectionProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        formHandler.put(route('admin.sections.update', Number(formHandler.data.id)), {
            onSuccess: () => {
                closeModal();

                toast.success('Section has been updated with the latest changes.');
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    };

    return (
        <Modal
            title="Edit Section"
            saveText="Update"
            subTitle="Make changes to your section information."
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <SectionBaseForm formHandler={formHandler} divisions={divisions} />
            </form>
        </Modal>
    );
};

export default EditSection;
