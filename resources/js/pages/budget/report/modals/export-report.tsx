import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ExportReportBaseForm from '../export-report-base-form';

type ExportReportProps = {
    openModal: boolean;
    closeModal: () => void;
};

const ExportReportModal = ({ openModal, closeModal }: ExportReportProps) => {
    const { formHandler } = useModalContext();

    /*const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        let reportRoute = '';

        if (formHandler.data.type === 'saob') {
            reportRoute = route('budget.export.saob-report', {
                type: formHandler.data.type,
                date: formHandler.data.date,
            });
        }

        if (formHandler.data.type === 'bur') {
            reportRoute = route('budget.export.bur-report', {
                type: formHandler.data.type,
                date: formHandler.data.date,
            });
        }

        if (formHandler.data.type === 'accounts-payable') {
            reportRoute = route('budget.export.accounts-payable-report', {
                type: formHandler.data.type,
                date: formHandler.data.date,
            });
        }

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
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

            window.processingToastId = toast.loading(data.message, {
                duration: Infinity,
            });

            closeModal();
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong while sending the request.');
        }
    };*/

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        let reportRoute = '';

        if (formHandler.data.type === 'saob') {
            reportRoute = route('budget.export.saob-report', {
                type: formHandler.data.type,
                date: formHandler.data.date,
            });
        }

        if (formHandler.data.type === 'bur') {
            reportRoute = route('budget.export.bur-report', {
                type: formHandler.data.type,
                date: formHandler.data.date,
            });
        }

        if (formHandler.data.type === 'accounts-payable') {
            reportRoute = route('budget.export.accounts-payable-report', {
                type: formHandler.data.type,
                date: formHandler.data.date,
            });
        }

        if (reportRoute) {
            window.location.href = reportRoute;
            closeModal();
        } else {
            toast.error('Invalid report type.');
        }
    };

    return (
        <Modal
            title="Export"
            subTitle="Generate and export financial reports."
            openModal={openModal}
            closeModal={closeModal}
            saveText="Generate"
            handleSubmit={handleSubmit}
            isProcessing={Boolean(window.processingToastId)} // disable if event is still processing
        >
            <form onSubmit={handleSubmit}>
                <ExportReportBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default ExportReportModal;
