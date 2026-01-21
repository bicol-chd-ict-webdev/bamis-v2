import { Link, Head } from '@inertiajs/react';

interface ErrorProps {
    status: number;
    message?: string;
}

export default function Error({ status, message }: ErrorProps) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status] || 'Error';

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || message || 'An unexpected error occurred.';

    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 selection:bg-[#FF2D20] selection:text-white">
                <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                    <main className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                                {status}
                            </h1>
                            <h2 className="text-2xl font-semibold uppercase tracking-widest text-[#FF2D20]">
                                {title}
                            </h2>
                            <p className="max-w-lg text-lg text-gray-500 dark:text-gray-400">
                                {description}
                            </p>
                            <div className="mt-8">
                                <Link
                                    href="/"
                                    className="rounded-md bg-[#FF2D20] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#ff1f12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2D20] transition-colors duration-200"
                                >
                                    Go Home
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
