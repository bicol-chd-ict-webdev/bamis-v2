import { DISBURSEMENT_FORM_DEFAULTS } from '@/constants/form-defaults';
import { ModalProvider, useModalContext } from '@/contexts/modal-context';
import DisbursementSheet from '@/pages/budget/disbursement/disbursement-sheet';
import CreateDisbursement from '@/pages/budget/disbursement/modals/create-disbursement';
import DeleteDisbursement from '@/pages/budget/disbursement/modals/delete-disbursement';
import EditDisbursement from '@/pages/budget/disbursement/modals/edit-disbursement';
import type { Disbursement, Obligation } from '@/types';
import { JSX } from 'react';

type DisbursementModalWrapperProps = {
    children: JSX.Element;
    formDefaults: Disbursement;
};

function DisbursementModalWrapper({ children, formDefaults }: DisbursementModalWrapperProps): JSX.Element {
    return <ModalProvider<Disbursement> formDefaults={formDefaults}>{children}</ModalProvider>;
}

export default function DisbursementModals(): JSX.Element | null {
    const { modal, handleCloseModal, formHandler: obligationFormHandler } = useModalContext<Obligation>();
    const { formHandler: disbursementFormHandler } = useModalContext<Disbursement>();

    if (modal === 'disburse') {
        return <DisbursementSheet openModal closeModal={handleCloseModal} />;
    }

    if (modal === 'create-disbursement') {
        return (
            <DisbursementModalWrapper formDefaults={DISBURSEMENT_FORM_DEFAULTS(obligationFormHandler.data.id)}>
                <CreateDisbursement openModal closeModal={handleCloseModal} />
            </DisbursementModalWrapper>
        );
    }

    if (modal === 'edit-disbursement') {
        return (
            <DisbursementModalWrapper formDefaults={disbursementFormHandler.data}>
                <EditDisbursement openModal closeModal={handleCloseModal} />
            </DisbursementModalWrapper>
        );
    }

    if (modal === 'delete-disbursement') {
        return (
            <DisbursementModalWrapper formDefaults={disbursementFormHandler.data}>
                <DeleteDisbursement openModal closeModal={handleCloseModal} />
            </DisbursementModalWrapper>
        );
    }

    return null;
}
