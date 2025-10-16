import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { CircleHelp } from 'lucide-react';
import { FC } from 'react';

interface HintItem {
    label: string;
    hint: string | React.ReactNode;
}

interface HoverInstructionProps {
    description?: string;
    items: HintItem[];
}

const HoverInstruction: FC<HoverInstructionProps> = ({ description, items }) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <CircleHelp className="text-muted-foreground size-4 cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent align="start" className="max-w-xs text-sm">
                {description && <div>{description}</div>}
                <ul className="mt-1 inline-flex list-inside list-disc flex-col space-y-0.5">
                    {items.map((item, index) => (
                        <li key={index}>
                            {item.label} <span className="bg-muted inline-flex items-center gap-1 rounded px-2 py-0.5">{item.hint}</span>
                        </li>
                    ))}
                </ul>
            </HoverCardContent>
        </HoverCard>
    );
};

export default HoverInstruction;
