import { InertiaFormProps, InertiaPrecognitiveFormProps, useForm } from '@inertiajs/react';
import { Context, createContext, JSX, ReactNode, useContext, useReducer } from 'react';

type FormDataType = Record<string, any>;

type ModalContextType<T extends FormDataType> = {
    modal: ModalType;
    formHandler: ReturnType<InertiaFormProps<T>['withPrecognition']>;
    handleOpenModal: (modalType: ModalType, payload?: T) => void;
    handleCloseModal: () => void;
};

export type FormDefaults = Record<string, string | number | boolean>;

type ModalType =
    | 'create'
    | 'edit'
    | 'delete'
    | 'view'
    | 'disburse'
    | 'cancel'
    | 'due'
    | 'create-due'
    | 'download'
    | 'create-disbursement'
    | 'edit-disbursement'
    | 'delete-disbursement'
    | null;

const ModalContext: Context<ModalContextType<any> | undefined> = createContext<ModalContextType<any> | undefined>(undefined);

export function useModalContext<T extends FormDataType = FormDataType>(): ModalContextType<T> {
    const context: ModalContextType<any> | undefined = useContext(ModalContext);
    if (!context) throw new Error('useModalContext must be used within a ModalProvider!');
    return context;
}

type ModalProviderProps<T extends FormDataType> = {
    children: ReactNode;
    formDefaults: T;
};

export function ModalProvider<T extends FormDataType>({ children, formDefaults }: ModalProviderProps<T>): JSX.Element {
    const baseForm: InertiaFormProps<T> = useForm<T>(formDefaults);
    const formHandler: InertiaPrecognitiveFormProps<T> = baseForm.withPrecognition({ method: 'post', url: '#' });
    formHandler.setValidationTimeout(500);
    const [modal, setModal] = useReducer((_: ModalType, update: ModalType): ModalType => update, null as ModalType);

    const handleOpenModal = (modalType: ModalType, payload?: T): void => {
        formHandler.resetAndClearErrors();
        if (payload) {
            formHandler.setData(payload);
        }
        setModal(modalType);
    };

    const handleCloseModal = (): void => {
        formHandler.resetAndClearErrors();
        formHandler.setData(formDefaults);
        setModal(null);
    };

    return (
        <ModalContext.Provider
            value={{
                modal,
                formHandler,
                handleOpenModal,
                handleCloseModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
