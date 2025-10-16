import React from "react";

interface Norsa {
    id: number | string;
    oras_number_reference: string;
}

interface RelatedObligation {
    oras_number_reference: string;
}

interface NorsaListProps {
    taggedObligations?: Norsa[];
    relatedObligation?: RelatedObligation;
}

export function NorsaList({ taggedObligations = [], relatedObligation }: NorsaListProps) {
    const isOriginal = taggedObligations.length === 0;

    return (
        <>
            <p>{isOriginal ? "Original Obligation:" : "List of NORSA:"}</p>
            <ul className="mt-1 inline-flex list-inside list-disc flex-col space-y-0.5">
                {taggedObligations.map((norsa) => (
                        <li key={norsa.id}>
                            <span className="bg-muted inline-flex items-center gap-1 rounded px-2 py-0.5">
                                {norsa.oras_number_reference}
                            </span>
                        </li>
                    ))}

                {relatedObligation && (
                    <li>
                        <span className="bg-muted inline-flex items-center gap-1 rounded px-2 py-0.5">
                            {relatedObligation.oras_number_reference}
                        </span>
                    </li>
                )}
            </ul>
        </>
    );
}
