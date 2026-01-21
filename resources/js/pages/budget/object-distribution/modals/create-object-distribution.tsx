import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { JSX } from 'react';
import ObjectDistributionBaseForm from '../object-distribution-base-form';
import type { ModalProps, ObjectDistribution } from '@/types';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/budget/object-distributions';

const CreateObjectDistribution = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<ObjectDistribution>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Object Distribution Created!',
            description: 'The object distribution has been successfully created.',
        },
        onSuccess: closeModal,
    });

    return (
        <Modal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={formHandler.processing}
            isDirty={formHandler.isDirty}
            title="Create Object Distribution"
            description="Create a detailed object distribution by specifying its key identifiers."
        >
            <ObjectDistributionBaseForm />
        </Modal>
    );
};

export default CreateObjectDistribution;
