import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { useEffect, useMemo, useRef, useState } from 'react';

export function useFormDirtyTracker<T extends Record<string, any>>(
    formHandler: { data: T },
    openModal: boolean,
    resetOnClose: boolean = true,
): boolean {
    // store snapshot
    const [originalData, setOriginalData] = useState<T>(() => cloneDeep(formHandler.data));

    // keep a ref to the latest data so the "openModal" effect doesn't need to depend on formHandler.data
    const dataRef = useRef<T>(formHandler.data);
    useEffect(() => {
        dataRef.current = formHandler.data;
    }, [formHandler.data]);

    // take a deep-clone snapshot once when modal opens
    useEffect(() => {
        if (openModal) {
            // defer to avoid sync setState warnings
            queueMicrotask(() => setOriginalData(cloneDeep(dataRef.current)));
        }
    }, [openModal]);

    // optional: reset snapshot on close (useful so reopened modal starts fresh)
    useEffect(() => {
        if (!openModal && resetOnClose) {
            queueMicrotask(() => setOriginalData(cloneDeep(dataRef.current)));
        }
    }, [openModal, resetOnClose]);

    // compare current vs snapshot
    return useMemo((): boolean => !isEqual(formHandler.data, originalData), [formHandler.data, originalData]);
}
