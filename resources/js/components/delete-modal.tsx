import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { LoaderCircle, OctagonAlert } from 'lucide-react';
import { FormEvent, JSX } from 'react';

interface ModalProps {
    openModal: boolean;
    closeModal: () => void;
    handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    title: string;
    processing?: boolean;
    maxWidth?: string;
    cancelText?: string;
    saveText?: string;
    data: string;
    supportingText?: string;
    action?: string;
}

export default function DeleteModal({
    openModal = false,
    closeModal,
    title,
    handleSubmit,
    processing = false,
    maxWidth,
    saveText = "Yes, I'm sure!",
    cancelText = 'No, Cancel',
    data,
    supportingText,
    action = 'delete',
}: ModalProps): JSX.Element {
    const content: JSX.Element = (
        <>
            <DialogHeader className="px-5 pt-5 sm:text-center!">
                <div className="mb-3 place-self-center rounded-full border border-destructive/20 bg-destructive/20 p-4">
                    <OctagonAlert className="size-7 text-red-600" />
                </div>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    Are you sure you want to {action} <span className="font-semibold">{data}</span>
                    {supportingText && <span> {supportingText}</span>}? All related data will be permanently removed.
                </DialogDescription>
            </DialogHeader>

            <DialogFooter className="p-5">
                <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={closeModal} className="w-full">
                        {cancelText}
                    </Button>
                </DialogClose>
                <Button type="submit" variant="destructive" disabled={processing} className="w-full">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    {saveText}
                </Button>
            </DialogFooter>
        </>
    );

    const wrappedContent: JSX.Element = handleSubmit ? <form onSubmit={handleSubmit}>{content}</form> : content;

    return (
        <>
            <Dialog open={openModal} onOpenChange={(open: boolean): false | void => !open && closeModal()}>
                <DialogContent
                    className={cn(
                        'flex max-h-full w-full min-w-0 flex-col rounded-2xl bg-card/60 p-2 shadow-xs backdrop-blur-[5px] transition-all duration-300',
                        maxWidth,
                    )}
                >
                    <div className="relative isolate grid gap-4 overflow-y-auto rounded-xl border border-border bg-card transition-all duration-300">
                        {wrappedContent}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
