import { useEffect, useState } from "react";

const MemoSearch = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    return (
        <input
            type="text"
            value={query}
            placeholder="검색어 입력"
            className="search-input"
            onChange={handleSearch}
        /> 
    )
}

export default MemoSearch;