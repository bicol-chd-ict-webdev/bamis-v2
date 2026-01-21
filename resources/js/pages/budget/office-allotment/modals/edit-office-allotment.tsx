import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/budget/office-allotments';
import type { ModalProps, OfficeAllotment } from '@/types';
import { JSX } from 'react';
import OfficeAllotmentBaseForm from '../office-allotment-base-form';

const EditOfficeAllotment = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<OfficeAllotment>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Office Allotment Updated!',
            description: 'The office allotment has been updated with the latest changes.',
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
            title="Edit Office Allotment"
            description="Edit the details of this office allotment to reflect the latest changes."
            saveText="Update"
        >
            <OfficeAllotmentBaseForm />
        </Modal>
    );
};

export default EditOfficeAllotment;
