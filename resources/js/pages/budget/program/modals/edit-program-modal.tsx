import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/budget/programs';
import type { ModalProps, Program } from '@/types';
import { JSX } from 'react';
import ProgramBaseForm from '../program-base-form';

const EditProgramModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Program>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Program Updated!',
            description: 'The program has been updated with the latest changes.',
        },
        onSuccess: closeModal,
    });

    return (
        <Modal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            isDirty={isDirty}
            title="Edit Program"
            description="Make necessary changes to keep the program up to date."
            saveText="Update"
        >
            <ProgramBaseForm />
        </Modal>
    );
};

export default EditProgramModal;
