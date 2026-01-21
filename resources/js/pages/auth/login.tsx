import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import login from '@/routes/login';
import password from '@/routes/password';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import { ChangeEvent, FormEventHandler, JSX } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    release?: string;
}

export default function Login({ status, canResetPassword, release }: LoginProps): JSX.Element {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e): void => {
        e.preventDefault();
        post(login.store().url, {
            onFinish: (): void => reset('password'),
        });
    };

    return (
        <AuthCardLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            {errors && (errors as any).message && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Login failed!</AlertTitle>
                    <AlertDescription>{(errors as any).message}</AlertDescription>
                </Alert>
            )}

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            autoComplete="email"
                            value={data.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => setData('email', e.target.value)}
                            aria-invalid={!!errors.email}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={password.request().url} className="ml-auto text-sm">
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => setData('password', e.target.value)}
                            aria-invalid={!!errors.password}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" checked={data.remember} onClick={(): void => setData('remember', !data.remember)} />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-xs text-muted-foreground">BAMIS {release}</div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthCardLayout>
    );
}
