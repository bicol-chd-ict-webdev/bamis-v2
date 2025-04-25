import DOHLogo from '../../../public/images/doh-logo.png';

export default function AppLogoIcon({ className }: { className: string }) {
    return <img src={DOHLogo} alt="Department of Health Official Seal" className={className} />;
}
