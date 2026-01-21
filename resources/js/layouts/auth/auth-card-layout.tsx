import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JSX, type PropsWithChildren } from 'react';
import DOHLogo from '../../../../public/images/doh-logo.png';
import SSBLogo from '../../../../public/images/ssb-logo.png';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>): JSX.Element {
    return (
        <main className="relative">
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>

            <div className="relative mx-auto flex min-h-screen max-w-xl items-center justify-between px-4 sm:px-12">
                <div className="flex w-full max-w-md flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <Card className="rounded-xl">
                            <CardHeader className="px-10 pt-8 pb-0 text-center">
                                <div className="flex items-center justify-center">
                                    <img src={DOHLogo} alt="Department of Health Official Seal" className="mr-1 size-14 select-none" />
                                    <img src={SSBLogo} alt="Salud Bikolnon Official Logo" className="size-13 select-none" />
                                </div>
                                <CardTitle className="text-xl">{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent className="px-10 pt-4">{children}</CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
