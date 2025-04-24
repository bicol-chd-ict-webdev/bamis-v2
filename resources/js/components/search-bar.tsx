import { Plus } from 'lucide-react';
import React from 'react';
import SearchInput from './search-input';
import { Button } from './ui/button';

interface SearchBarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    onCreate: () => void;
}

const SearchBar = ({ search, setSearch, onCreate }: SearchBarProps) => {
    return (
        <div className="flex items-center justify-between space-x-4">
            <SearchInput id="search" name="search" search={search} setSearch={setSearch} />

            <Button type="button" onClick={onCreate}>
                <Plus />
                <span>Create</span>
            </Button>
        </div>
    );
};

export default SearchBar;
