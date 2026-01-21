import { FormEvent, FormEventHandler } from 'react';
import { toast } from 'sonner';

interface UseFormSubmitConfig {
    method: 'post' | 'put' | 'patch' | 'delete';
    url: string;
    successMessage: {
        title: string;
        description: string;
    };
    onSuccess?: () => void;
}

export const useFormSubmit = (formHandler: any, config: UseFormSubmitConfig) => {
    const handleSubmit: FormEventHandler = (e: FormEvent): void => {
        e.preventDefault();

        formHandler[config.method](config.url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (): void => {
                config.onSuccess?.();
                toast.success(config.successMessage.title, {
                    description: config.successMessage.description,
                });
            },
            onError: (errors: any): void => {
                let message: string = 'Something went wrong. Please try again.';

                if (errors && typeof errors === 'object') {
                    const firstFieldError = Object.values(errors).flat()[0] as string;
                    if (firstFieldError) {
                        message = firstFieldError;
                    }
                }

                toast.error(message);
                console.error('Error:', errors);
            },
        });
    };

    return { handleSubmit };
};
