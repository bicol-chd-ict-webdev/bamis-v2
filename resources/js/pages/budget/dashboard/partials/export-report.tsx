import Modal from '@/components/modal';
import { useModalContext } from '@/contexts/modal-context';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import ExportReportBaseForm from './export-report-base-form';

type ExportReportProps = {
    openModal: boolean;
    closeModal: () => void;
};

const ExportReportModal = ({ openModal, closeModal }: ExportReportProps) => {
    const { formHandler } = useModalContext();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const reportRoute =
            formHandler.data.type === 'saob'
                ? route('budget.export.saob-report', {
                      type: formHandler.data.type,
                      date: formHandler.data.date,
                  })
                : '';

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
        >
            <form onSubmit={handleSubmit}>
                <ExportReportBaseForm formHandler={formHandler} />
            </form>
        </Modal>
    );
};

export default ExportReportModal;
