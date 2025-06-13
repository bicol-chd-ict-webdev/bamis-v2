import { InertiaFormProps, useForm } from '@inertiajs/react';
import { createContext, ReactNode, useContext, useReducer } from 'react';

type ModalContextType = {
    modal: ModalType;
    formHandler: InertiaFormProps<FormDefaults>;
    handleOpenModal: (modalType: ModalType, payload?: FormDefaults) => void;
    handleCloseModal: () => void;
};

export type FormDefaults = Record<string, string | number | boolean>;

type ModalType = 'create' | 'edit' | 'delete' | 'view' | 'deactivate' | 'activate' | null;

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};

type ModalProviderProps = {
    children: ReactNode;
    formDefaults: FormDefaults;
};

export const ModalProvider = ({ children, formDefaults }: ModalProviderProps) => {
    const formHandler = useForm<FormDefaults>(formDefaults);
    const [modal, setModal] = useReducer((current, update) => update, null as ModalType);

    const clearForm = () => {
        formHandler.clearErrors();
        formHandler.reset();
    };

    const handleOpenModal = (modalType: ModalType, payload?: FormDefaults) => {
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
};
