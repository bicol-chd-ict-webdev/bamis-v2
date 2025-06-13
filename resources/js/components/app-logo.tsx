import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-8 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-3xl">
                <span className="mb-0.5 truncate text-[14px] font-medium">Budget Allocation</span>
                <span className="truncate text-[10.7px] font-medium">Management Information System</span>
            </div>
        </>
    );
}
