import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/budget/special-allotments';
import type { Allocation, ModalProps } from '@/types';
import { JSX } from 'react';
import AllocationBaseForm from '../../allocation-base-form';

const EditSpecialAllotment = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Allocation>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Allocation Updated!',
            description: 'The special allotment allocation has been updated with the latest changes.',
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
            title="Edit Special Allotment"
            description="Make necessary changes to keep the special allotment allocation up to date."
            saveText="Update"
            maxWidth="!max-w-7xl"
        >
            <AllocationBaseForm />
        </Modal>
    );
};

export default EditSpecialAllotment;
