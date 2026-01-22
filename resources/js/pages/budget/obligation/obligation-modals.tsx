import { useModalContext } from '@/contexts/modal-context';
import CancelObligation from '@/pages/budget/obligation/modals/cancel-obligation';
import CreateObligation from '@/pages/budget/obligation/modals/create-obligation';
import DeleteObligation from '@/pages/budget/obligation/modals/delete-obligation';
import EditObligation from '@/pages/budget/obligation/modals/edit-obligation';
import ViewObligation from '@/pages/budget/obligation/modals/view-obligation';
import type { Obligation } from '@/types';
import { JSX } from 'react';

export default function ObligationModals(): JSX.Element {
    const { modal, handleCloseModal } = useModalContext<Obligation>();

    return (
        <>
            {modal === 'create' && <CreateObligation openModal closeModal={handleCloseModal} />}
            {modal === 'edit' && <EditObligation openModal closeModal={handleCloseModal} />}
            {modal === 'delete' && <DeleteObligation openModal closeModal={handleCloseModal} />}
            {modal === 'view' && <ViewObligation openModal closeModal={handleCloseModal} />}
            {modal === 'cancel' && <CancelObligation openModal closeModal={handleCloseModal} />}
        </>
    );
}
