const MemoSearch = ({ memos, search }) => {
    const handleSearch = (e) => {
        search(e.target.value);
    }

    return (
        <input
            type="text"
            placeholder="검색어 입력"
            className="search-bar"
            onChange={handleSearch}
        /> 
    )
}

export default MemoSearch;