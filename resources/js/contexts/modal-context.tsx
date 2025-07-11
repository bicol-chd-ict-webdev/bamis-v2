import { InertiaFormProps, useForm } from '@inertiajs/react';
import { createContext, ReactNode, useContext, useReducer } from 'react';

type FormDataType = Record<string, any>;

type ModalContextType<T extends FormDataType> = {
    modal: ModalType;
    formHandler: InertiaFormProps<T>;
    handleOpenModal: (modalType: ModalType, payload?: T) => void;
    handleCloseModal: () => void;
};

export type FormDefaults = Record<string, string | number | boolean>;

type ModalType = 'create' | 'edit' | 'delete' | 'view' | 'disburse' | null;

const ModalContext = createContext<ModalContextType<any> | undefined>(undefined);

export function useModalContext<T extends FormDataType>() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context as ModalContextType<T>;
}

type ModalProviderProps<T> = {
    children: ReactNode;
    formDefaults: T;
};

export function ModalProvider<T extends FormDataType>({ children, formDefaults }: ModalProviderProps<T>) {
    const formHandler = useForm<T>(formDefaults);
    const [modal, setModal] = useReducer((_: ModalType, update: ModalType) => update, null as ModalType);

    const clearForm = () => {
        formHandler.clearErrors();
        formHandler.reset();
    };

    const handleOpenModal = (modalType: ModalType, payload?: T) => {
        clearForm();
        if (payload) formHandler.setData(payload);
        setModal(modalType);
    };

    const handleCloseModal = () => {
        clearForm();
        formHandler.setData(formDefaults);
        setModal(null);
    };

    return <ModalContext.Provider value={{ modal, formHandler, handleOpenModal, handleCloseModal }}>{children}</ModalContext.Provider>;
}
