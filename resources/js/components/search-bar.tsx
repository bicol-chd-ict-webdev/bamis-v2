import { Plus } from 'lucide-react';
import React from 'react';
import SearchInput from './search-input';
import { Button } from './ui/button';

interface SearchBarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    onCreate: () => void;
    icon?: React.ReactNode;
    text?: string;
    disabled?: boolean;
}

const SearchBar = ({ search, setSearch, onCreate, icon = <Plus />, text = 'Create', disabled }: SearchBarProps) => {
    return (
        <div className="flex items-center justify-between space-x-4">
            <SearchInput id="search" name="search" search={search} setSearch={setSearch} />

            <Button type="button" onClick={onCreate} disabled={disabled}>
                {icon}
                <span>{text}</span>
            </Button>
        </div>
    );
};

export default SearchBar;
