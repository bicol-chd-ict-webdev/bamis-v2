import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/budget/subprograms';
import type { ModalProps, Subprogram } from '@/types';
import { JSX } from 'react';
import SubprogramBaseForm from '../subprogram-base-form';

const EditSubprogram = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Subprogram>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Subprogram Updated!',
            description: 'The subprogram has been updated with the latest changes.',
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
            title="Edit Subprogram"
            description="Make necessary changes to keep the subprogram up to date."
            saveText="Update"
        >
            <SubprogramBaseForm />
        </Modal>
    );
};

export default EditSubprogram;
