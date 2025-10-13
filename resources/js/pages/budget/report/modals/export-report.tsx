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

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        const reportRoute =
            formHandler.data.type === 'saob'
                ? route('budget.export.saob-report', {
                      type: formHandler.data.type,
                      date: formHandler.data.date,
                  })
                : route('budget.export.bur-report', {
                      type: formHandler.data.type,
                      date: formHandler.data.date,
                  });

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
