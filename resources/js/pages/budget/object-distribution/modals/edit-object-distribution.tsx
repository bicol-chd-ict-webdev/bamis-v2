import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormDirtyTracker } from '@/hooks/use-form-dirty-tracker';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { update } from '@/routes/budget/object-distributions';
import type { ModalProps, OfficeAllotment } from '@/types';
import { JSX } from 'react';
import ObjectDistributionBaseForm from '../object-distribution-base-form';

const EditObjectDistribution = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<OfficeAllotment>();
    const isDirty: boolean = useFormDirtyTracker(formHandler, openModal);
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'put',
        url: update.url(formHandler.data.id),
        successMessage: {
            title: 'Object Distribution Updated!',
            description: 'The object distribution has been updated with the latest changes.',
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
            title="Edit Object Distribution"
            description="Edit the details of this object distribution to reflect the latest changes."
            saveText="Update"
        >
            <ObjectDistributionBaseForm />
        </Modal>
    );
};

export default EditObjectDistribution;
