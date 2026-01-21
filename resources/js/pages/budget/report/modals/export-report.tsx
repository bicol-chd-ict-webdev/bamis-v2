import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import budget from '@/routes/budget';
import type { ModalProps, Report } from '@/types';
import { FormEventHandler, JSX, useState } from 'react';
import { toast } from 'sonner';
import ExportReportBaseForm from '../export-report-base-form';

const ExportReportModal = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler } = useModalContext<Report>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let reportRoute: string = '';

        if (formHandler.data.type === 'saob-chd') {
            reportRoute = budget.export.saobReport().url;
        }

        if (formHandler.data.type === 'bur-division') {
            reportRoute = budget.export.utilizationByDivisionReport().url;
        }

        if (formHandler.data.type === 'bur-allotment-class') {
            reportRoute = budget.export.utilizationByAllotmentClassReport().url;
        }

        const csrfToken: string = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        if (!csrfToken) {
            toast.error('CSRF token not found. Please refresh the page.');
            return;
        }

        try {
            const response = await fetch(reportRoute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    date: formHandler.data.date,
                    type: formHandler.data.type,
                }),
            });

            if (!response.ok) throw new Error('Request failed');

            const data = await response.json();

            const toastId: string | number = toast.loading(data.message, { duration: Infinity });
            (window as any).processingToastId = toastId;

            closeModal();
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong while sending the request.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            openModal={openModal}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            processing={isSubmitting || Boolean((window as any).processingToastId)}
            isDirty={formHandler.isDirty}
            title="Export"
            description="Generate and export financial reports."
            saveText="Generate"
        >
            <ExportReportBaseForm />
        </Modal>
    );
};

export default ExportReportModal;
