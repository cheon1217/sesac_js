import { useEffect, useState } from "react";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";
import MemoDetail from "./components/MemoDetail";
// import MemoSearch from "./components/MemoSearch";
import "./styles.css";
import MemoSearch from "./components/MemoSearch";
import SortOptions from "./components/SortOptions";
import { deleteAttachmentsByMemoId } from "./utils/indexedDB";

const App = () => {
    const [memos, setMemos] = useState(() => {
        const savedMemos = localStorage.getItem("memos");
        return savedMemos ? JSON.parse(savedMemos) : [];
    });
    const [search, setSearch] = useState("");
    // const [sort, setSort] = useState("oldset"); // 기본값 "oldset"
    const [sort, setSort] = useState(() => {
        return localStorage.getItem("sortOrder") || "manual";
    })
    // const [dragged, setDragged] = useState(null);

    const [selectedMemo, setSelectedMemo] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // useEffect(() => {
    //     if (dragged !== null) {
    //         setSort("manual");
    //         setMemos(dragged);
    //         setDragged(null);
    //     }
    // }, [dragged]);

    // 메모 정렬 
    const sortedMemos = [...memos].sort((a, b) => {
        if (sort === "newest") {
            return b.id - a.id;
        } else if (sort === "oldest") {
            return a.id - b.id;
        } else if (sort === "alphabetical") {
            return a.text.localeCompare(b.text);
        }
        return 0; // "manual"
    });

    // 검색 필터
    const filteredMemos = sortedMemos.filter(memo => memo.text.toLowerCase().includes(search.toLowerCase()));

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

    const addMemo = (text) => {
        const newMemo = { id: Date.now(), text, completed: false }; // 고유 ID와 텍스트 값으로 메모 객체 생성
        setMemos([...memos, newMemo]); // 기존 메모 배열에 새 메모 추가
    }

    // 삭제 함수 구현
    const deleteMemo = async (id) => {
        await deleteAttachmentsByMemoId(id);
        setMemos(memos.filter(memo => memo.id !== id))
    }

    useEffect(() => {
        localStorage.setItem("memos", JSON.stringify(memos));
    }, [memos]);

    useEffect(() => {
        localStorage.setItem("sort", sort);
    }, [sort]);

    // 수정 함수
    const editMemo = (id, changeText, newDetail, newAttachments) => {
        setMemos(memos.map(memo => memo.id === id ? 
            { 
                ...memo, 
                text: changeText !== undefined ? changeText : memo.text, 
                detail: newDetail !== undefined ? newDetail : memo.detail, 
                attachments: newAttachments !== undefined ? newAttachments : memo.attachments, 
            }
            : memo
        ));
    }

    // 특정 메모의 완료 상태 toggle
    const toggleComplete = (id) => {
        setMemos(memos.map(memo => memo.id === id ? { ...memo, completed: !memo.completed } : memo));
    }

    const openMemoDetail = (id) => {
        const memo = memos.find((m) => m.id === id);
        setSelectedMemo(memo);
        setIsDetailOpen(true);
    };

    const closeMemoDetail = () => {
        setSelectedMemo(null);
        setIsDetailOpen(false);
    };

    const saveMemoDetail = (id, changeText, newDetail, newAttachments) => {
        editMemo(id, changeText, newDetail, newAttachments);
        closeMemoDetail();
    };

    return (
        <div className="app">
            <h1>메모앱 (투두리스트)</h1>
            <div className="search-and-sort-container">
                <MemoSearch onSearch={setSearch} />
                <SortOptions sort={sort} onSortChange={setSort} />
            </div>
            <MemoForm addMemo={addMemo} />
            <MemoList 
                memos={filteredMemos}
                // memos={sortedMemos}
                onDelete={deleteMemo}
                onToggle={toggleComplete}
                onEdit={editMemo}
                onReMemos={reMemos}
                onOpenDetail={openMemoDetail}
            />
            {isDetailOpen && selectedMemo && (
                <MemoDetail
                    memo={selectedMemo}
                    onSave={saveMemoDetail}
                    onClose={closeMemoDetail}
                />
            )}
        </div>
    );
}

export default App;