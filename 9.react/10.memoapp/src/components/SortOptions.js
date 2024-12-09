const SortOptions = ({ sort, onSortChange }) => {
    return (
        <div className="sort-options">
            <select
                id="sort-order"
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="newest">최신</option>
                <option value="oldest">예전</option>
                <option value="alphabetical">알파펫순</option>
                <option value="manual">수동정렬</option>
            </select>
        </div>
    )
}

export default SortOptions;