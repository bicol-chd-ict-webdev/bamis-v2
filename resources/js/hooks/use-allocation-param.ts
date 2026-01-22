import budget from '@/routes/budget';

export type AllocationKey = 'general_appropriation' | 'sub_allotment' | 'special_allotment';

const allocationMeta: Record<
    AllocationKey,
    {
        title: string;
        indexRoute: string;
    }
> = {
    general_appropriation: {
        title: 'General Appropriations',
        indexRoute: budget.generalAppropriations.index().url,
    },
    sub_allotment: {
        title: 'Sub Allotments',
        indexRoute: budget.subAllotments.index().url,
    },
    special_allotment: {
        title: 'Special Allotments',
        indexRoute: budget.specialAllotments.index().url,
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
