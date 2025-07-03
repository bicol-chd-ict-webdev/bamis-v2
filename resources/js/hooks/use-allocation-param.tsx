import { route } from 'ziggy-js';

export type AllocationKey = 'general_appropriation' | 'sub_allotment' | 'special_allotment';

const allocationMeta: Record<
    AllocationKey,
    {
        title: string;
        indexRoute: Parameters<typeof route>[0];
    }
> = {
    general_appropriation: {
        title: 'General Appropriations',
        indexRoute: 'budget.general-appropriations.index',
    },
    sub_allotment: {
        title: 'Sub Allotments',
        indexRoute: 'budget.sub-allotments.index',
    },
    special_allotment: {
        title: 'Special Allotments',
        indexRoute: 'budget.special-allotments.index',
    },
};

export function useAllocationParam() {
    const params = new URLSearchParams(window.location.search);

    for (const key of Object.keys(allocationMeta) as AllocationKey[]) {
        const id = params.get(key);
        if (id) {
            const meta = allocationMeta[key];
            return {
                key,
                id,
                title: meta.title,
                indexRoute: meta.indexRoute,
            };
        }
    }

    return null;
}
