import SheetModal from '@/components/sheet-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemSeparator, ItemTitle } from '@/components/ui/item';
import { useModalContext } from '@/contexts/modal-context';
import { FormatMoney, FormatShortDate } from '@/lib/formatter';
import type { Disbursement, ModalProps, Obligation } from '@/types';
import { Calendar, Coins, CreditCard, PencilLine, Quote, Trash2, UserCircle } from 'lucide-react';
import { JSX } from 'react';

const DisbursementSheet = ({ openModal, closeModal }: ModalProps): JSX.Element => {
    const { formHandler: obligationFormHandler, handleOpenModal: obligationHandleOpenModal } = useModalContext<Obligation>();
    const { handleOpenModal: disbursementHandleOpenModal } = useModalContext<Disbursement>();

    const disbursements: Disbursement[] = obligationFormHandler.data.disbursements?.data ?? [];

    return (
        <SheetModal
            openModal={openModal}
            closeModal={closeModal}
            title="Liquidation Registry"
            description={
                <>
                    <UserCircle className="size-4" />
                    <span className="min-w-0 truncate" title={obligationFormHandler.data.creditor}>
                        {obligationFormHandler.data.creditor}
                    </span>
                    <span className="min-w-0 shrink-0 truncate">&bull; {obligationFormHandler.data.oras_number_reference}</span>
                </>
            }
        >
            <div className="grid gap-4">
                {/* Header with aggregate settled and button to create disbursement */}
                <div className="flex items-center justify-between gap-4 border-t border-b p-4">
                    <div className="flex flex-1 flex-col">
                        <ItemDescription className="text-xs font-semibold">Aggregate Settled</ItemDescription>
                        <ItemTitle className="text-xl font-bold text-primary">
                            {FormatMoney(Number(obligationFormHandler.data.disbursements_sum_amount))}
                        </ItemTitle>
                    </div>

                    <Button
                        type="button"
                        size="sm"
                        onClick={(): void => obligationHandleOpenModal('create-disbursement', obligationFormHandler.data)}
                    >
                        <Coins />
                        <span>Disburse</span>
                    </Button>
                </div>

                {/* List of disbursements */}
                <div className="max-h-[calc(100vh-12rem)] space-y-4 overflow-y-auto px-4">
                    {disbursements.length > 0 ? (
                        disbursements.map(
                            (disbursement: Disbursement): JSX.Element => (
                                <Item variant="outline" className="group px-0" key={disbursement.id}>
                                    <ItemHeader className="border-b px-4 pb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 text-xs font-medium">
                                                <Calendar className="size-3 text-muted-foreground" />
                                                <p
                                                    className={`${disbursement.check_date ? 'text-sm leading-snug font-medium text-foreground' : 'text-center text-xs text-muted-foreground italic'}`}
                                                >
                                                    {disbursement.check_date
                                                        ? FormatShortDate(String(disbursement.check_date))
                                                        : 'Check date not yet available'}
                                                </p>
                                            </div>

                                            <Badge variant="secondary">
                                                <CreditCard />
                                                <p
                                                    className={`${disbursement.check_number ? 'text-sm leading-snug font-medium text-foreground' : 'text-center text-xs text-muted-foreground italic'}`}
                                                >
                                                    {disbursement.check_number ?? '######'}
                                                </p>
                                            </Badge>
                                        </div>

                                        <div className="invisible flex items-center gap-1 group-hover:visible">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 has-[>svg]:px-1.5"
                                                title="Edit Disbursement"
                                                onClick={(): void => disbursementHandleOpenModal('edit-disbursement', disbursement)}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 has-[>svg]:px-1.5"
                                                title="Delete Disbursement"
                                                onClick={(): void => disbursementHandleOpenModal('delete-disbursement', disbursement)}
                                            >
                                                <Trash2 className="text-destructive" />
                                            </Button>
                                        </div>
                                    </ItemHeader>
                                    <ItemContent className="px-4">
                                        <div className="grid gap-3">
                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <ItemDescription className="text-xs font-medium">Net Payout</ItemDescription>
                                                    <ItemTitle className="text-lg font-semibold text-primary">
                                                        {FormatMoney(Number(disbursement.net_amount))}
                                                    </ItemTitle>
                                                </div>

                                                <div className="text-right">
                                                    <ItemDescription className="text-xs font-medium">Gross Amount</ItemDescription>
                                                    <ItemTitle>{FormatMoney(Number(disbursement.total_amount))}</ItemTitle>
                                                </div>
                                            </div>

                                            <ItemSeparator />

                                            <div className="grid grid-cols-3 gap-2 [&:has(>*)]:mb-3">
                                                {disbursement.tax && <DeductionPill label="Tax" amount={Number(disbursement.tax)} />}
                                                {disbursement.retention && (
                                                    <DeductionPill label="Retention" amount={Number(disbursement.retention)} />
                                                )}
                                                {disbursement.penalty && <DeductionPill label="Penalty" amount={Number(disbursement.penalty)} />}
                                                {disbursement.absences && <DeductionPill label="Absences" amount={Number(disbursement.absences)} />}
                                                {disbursement.other_deductions && (
                                                    <DeductionPill label="Other Deductions" amount={Number(disbursement.other_deductions)} />
                                                )}
                                            </div>
                                        </div>

                                        <Item variant="muted" className="group">
                                            <ItemHeader className="justify-start border-b pb-2">
                                                <Quote className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                                                <ItemDescription className="text-xs">Remarks</ItemDescription>
                                            </ItemHeader>
                                            <ItemContent>
                                                <p
                                                    className={`${disbursement.remarks ? 'text-sm leading-snug font-medium text-foreground' : 'text-center text-xs text-muted-foreground italic'}`}
                                                >
                                                    {disbursement.remarks ?? 'No document technical justifications or audit trails details.'}
                                                </p>
                                            </ItemContent>
                                        </Item>
                                    </ItemContent>
                                </Item>
                            ),
                        )
                    ) : (
                        <Empty className="h-full border border-dashed">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <Coins />
                                </EmptyMedia>
                                <EmptyTitle>No disbursements yet</EmptyTitle>
                                <EmptyDescription>Start by processing financial obligations to initiate the disbursement workflow.</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    )}
                </div>
            </div>
        </SheetModal>
    );
};

function DeductionPill({ label, amount }: { label: string; amount: number }): JSX.Element {
    return (
        <Item variant="outline" className="py-2">
            <ItemContent className="gap-0">
                <ItemDescription className="text-xs font-medium">{label}</ItemDescription>
                <ItemTitle className="text-destructive">{FormatMoney(amount)}</ItemTitle>
            </ItemContent>
        </Item>
    );
}

export default DisbursementSheet;
