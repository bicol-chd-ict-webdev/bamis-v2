import { DialogClose, DialogTitle } from '@radix-ui/react-dialog';
import { LoaderCircle, OctagonAlert } from 'lucide-react';
import { FormEvent, JSX } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from './ui/dialog';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

interface CancelModalProps {
    title: string;
    variant: ButtonVariant;
    openModal: boolean;
    closeModal: () => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isProcessing: boolean;
    cancelText?: string;
    saveText?: string;
    data: string;
    supportingText?: string;
}

const CancelModal = ({
                         title,
                         variant = 'default',
                         openModal = false,
                         closeModal,
                         handleSubmit,
                         isProcessing = false,
                         cancelText = 'Cancel',
                         saveText = 'Save',
                         data,
                         supportingText,
                     }: CancelModalProps): JSX.Element => {
    return (
        <Dialog open={openModal} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent>
                <DialogHeader className="sm:!text-center">
                    <div className="border-destructive/20 bg-destructive/20 mb-3 place-self-center rounded-full border p-4">
                        <OctagonAlert className="size-7 text-red-600" />
                    </div>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to cancel <span className="font-semibold">{data}</span>
                        {supportingText && <span> {supportingText}</span>}? All related data will be permanently cancelled.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" onClick={closeModal} className="w-full">
                            {cancelText}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" variant={variant} onClick={handleSubmit} disabled={isProcessing} className="w-full">
                            {isProcessing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {saveText}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelModal;
