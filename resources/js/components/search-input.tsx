import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';

interface SearchInputProps {
    search: string;
    setSearch: (value: string) => void;
    [key: string]: unknown;
}

export default function SearchInput({ search, setSearch, ...props }: SearchInputProps) {
    return (
        <div className="relative flex w-full max-w-xl justify-start sm:max-w-sm md:max-w-xs">
            <Input className="!pl-9" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} {...props} />

            <SearchIcon size={16} className="absolute top-[10px] left-3 z-10 text-gray-400 dark:text-gray-500" />
        </div>
    );
}
