import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, JSX, ReactNode } from 'react';

interface ModalProps {
    openModal: boolean;
    closeModal: () => void;
    handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    title: string;
    description?: string;
    children: ReactNode;
    processing?: boolean;
    isDirty?: boolean;
    maxWidth?: string;
    cancelText?: string;
    saveText?: string;
    showSaveButton?: boolean;
}

export default function Modal({
    openModal = false,
    closeModal,
    title,
    description,
    handleSubmit,
    children,
    processing = false,
    isDirty = false,
    maxWidth,
    saveText = 'Save',
    cancelText = 'Cancel',
    showSaveButton = true,
}: ModalProps): JSX.Element {
    const content: JSX.Element = (
        <>
            <DialogHeader className="px-5 pt-5">
                <DialogTitle>{title}</DialogTitle>
                {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>

            {children}

            <DialogFooter className="p-5">
                <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={closeModal}>
                        {cancelText}
                    </Button>
                </DialogClose>
                {showSaveButton && (
                    <Button type="submit" disabled={processing || !isDirty}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {saveText}
                    </Button>
                )}
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
