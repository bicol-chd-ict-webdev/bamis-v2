import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/budget/sub-allotments';
import type { Allocation, ModalProps } from '@/types';
import { JSX } from 'react';
import AllocationBaseForm from '../../allocation-base-form';

const CreateSubAllotment = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Allocation>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Allocation Created!',
            description: 'The sub-allotment advise allocation has been successfully created.',
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
            title="Create Sub-Allotment"
            description="Provide the necessary details to create a sub-allotment advise allocation entry."
            maxWidth="!max-w-7xl"
        >
            <AllocationBaseForm />
        </Modal>
    );
};

export default CreateSubAllotment;
