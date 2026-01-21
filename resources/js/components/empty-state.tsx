import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Plus } from 'lucide-react';
import React, { JSX } from 'react';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    actionIcon?: React.ReactNode;
    onAction?: () => void;
}

export default function EmptyState({
    icon,
    title,
    description,
    actionLabel = 'Create',
    actionIcon = <Plus />,
    onAction,
}: EmptyStateProps): JSX.Element {
    return (
        <Empty className="border border-dashed bg-card">
            <EmptyHeader>
                {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
            {onAction && (
                <EmptyContent>
                    <Button onClick={(): void => onAction()}>
                        {actionIcon}
                        <span>{actionLabel}</span>
                    </Button>
                </EmptyContent>
            )}
        </Empty>
    );
}
