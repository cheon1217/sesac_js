import { useEffect, useState } from "react";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";
// import MemoSearch from "./components/MemoSearch";
import "./styles.css";

const App = () => {
    const [memos, setMemos] = useState(() => {
        const savedMemos = localStorage.getItem("memos");
        return savedMemos ? JSON.parse(savedMemos) : [];
    });
    // const [search, setSearch] = useState("");
    const [sort, setSort] = useState("oldset"); // 기본값 "oldset"
    const [dragged, setDragged] = useState(null);

    useEffect(() => {
        if (dragged !== null) {
            setSort("manual");
            setMemos(dragged);
            setDragged(null);
        }
    }, [dragged]);

    useEffect(() => {
        localStorage.setItem("memos", JSON.stringify(memos));
    }, [memos]);

    const addMemo = (text) => {
        const newMemo = {id: Date.now(), text}; // 고유 ID와 텍스트 값으로 메모 객체 생성
        setMemos([...memos, newMemo]); // 기존 메모 배열에 새 메모 추가
    }

    // 수정 함수
    const editMemo = (id, changeText) => {
        setMemos(memos.map(memo => memo.id === id ? { ...memo, text: changeText } : memo));
    }

    // 특정 메모의 완료 상태 toggle
    const toggleComplete = (id) => {
        setMemos(memos.map(memo => memo.id === id ? { ...memo, completed: !memo.completed } : memo));
    }

    // 삭제 함수 구현
    const deleteMemo = (id) => {
        setMemos(memos.filter(memo => memo.id !== id))
    }
    
    // 검색 필터
    // const filteredMemos = memos.filter(memo => memo.text.toLowerCase().includes(search.toLowerCase()));

    const reMemos = (startIndex, endIndex) => {
        console.log("드래그 시작: ", startIndex, "드롭 위치 인덱스: ", endIndex);
        setSort("manual");

        setMemos((prevMemos) => {
            const updatedMemos = Array.from(prevMemos);
            const [removed] = updatedMemos.splice(startIndex, 1);
            updatedMemos.splice(endIndex, 0, removed);
            return updatedMemos;
        });
    };

    // 메모 정렬 
    const sortedMemos = (() => {
        if (sort === "manual") {
            return memos;
        } else if (sort === "newset") {
            return [...memos].sort((a, b) => b.id - a.id);
        } else if (sort === "oldset") {
            return [...memos].sort((a, b) => a.id - b.id);
        } else if (sort === "alphabetical") {
            return [...memos].sort((a, b) => a.text.localeCompare(b.text));
        }
        return memos;
    })();

    return (
        <div className="app">
            <h1>메모앱 (투두리스트)</h1>
            {/* <input
                type="text"
                placeholder="검색어 입력"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            /> */}
            {/* <MemoSearch search={setSearch} /> */}
            {/* 정렬 선택 드롭다운 */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="sort-dropdown"
            >
                <option value="newset">최신</option>
                <option value="oldset">예전</option>
                <option value="alphabetical">알파펫순</option>
                <option value="manual">수동정렬</option>
            </select>
            <MemoForm addMemo={addMemo} />
            <MemoList 
                // memos={filteredMemos}
                memos={sortedMemos}
                onDelete={deleteMemo}
                onToggle={toggleComplete}
                onEdit={editMemo}
                onReMemos={reMemos}
            />
        </div>
    );
}

export default App;