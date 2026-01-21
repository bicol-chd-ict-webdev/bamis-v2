import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { useFormSubmit } from '@/hooks/use-form-submit';
import { store } from '@/routes/budget/office-allotments';
import type { ModalProps, OfficeAllotment } from '@/types';
import { JSX } from 'react';
import OfficeAllotmentBaseForm from '../office-allotment-base-form';

const CreateOfficeAllotment = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<OfficeAllotment>();
    const { handleSubmit } = useFormSubmit(formHandler, {
        method: 'post',
        url: store.url(),
        successMessage: {
            title: 'Office Allotment Created!',
            description: 'The office allotment has been successfully created.',
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
            title="Create Office Allotment"
            description="Create a detailed office allotment by specifying its key identifiers."
        >
            <OfficeAllotmentBaseForm />
        </Modal>
    );
};

export default CreateOfficeAllotment;
