import { DialogClose, DialogTitle } from '@radix-ui/react-dialog';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, JSX, ReactNode } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from './ui/dialog';

interface ModalProps {
    title: string;
    subTitle?: string;
    openModal: boolean;
    closeModal: () => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isProcessing: boolean;
    cancelText?: string;
    saveText?: string;
    children?: ReactNode;
    maxWidth?: string;
}

const Modal = ({
    title,
    subTitle,
    openModal = false,
    closeModal,
    handleSubmit,
    isProcessing = false,
    cancelText = 'Cancel',
    saveText = 'Save',
    children,
}: ModalProps): JSX.Element => {
    return (
        <Dialog open={openModal} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{subTitle}</DialogDescription>
                </DialogHeader>

                {children}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" onClick={closeModal}>
                            {cancelText}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" onClick={handleSubmit} disabled={isProcessing}>
                            {isProcessing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {saveText}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
