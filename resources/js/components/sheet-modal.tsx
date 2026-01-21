import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { JSX, ReactNode } from 'react';

interface SheetModalProps {
    openModal: boolean;
    closeModal: () => void;
    children: ReactNode;
    title?: string;
    description?: ReactNode;
}

export default function SheetModal({ openModal = false, closeModal, children, title, description }: SheetModalProps): JSX.Element {
    return (
        <Sheet open={openModal} onOpenChange={(open: boolean): false | void => !open && closeModal()}>
            <SheetContent className="flex max-h-full w-full max-w-lg! min-w-0 flex-col bg-card/60 pl-2 shadow-xs backdrop-blur-[5px] transition-all duration-300">
                <div className="relative isolate h-full border border-border bg-card transition-all duration-300">
                    <SheetHeader className="px-0">
                        <SheetTitle className="px-4">{title}</SheetTitle>
                        {description && (
                            <SheetDescription className="flex items-center gap-1 px-4 text-xs font-medium">{description}</SheetDescription>
                        )}
                    </SheetHeader>
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
}
