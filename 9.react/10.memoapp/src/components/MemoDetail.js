import { useEffect, useRef, useState } from "react"
import { addAttachment, deleteAttachment, getAttachments } from "../utils/indexedDB";

const MemoDetail = ({ memo, onSave, onClose }) => {
    const [text, setTitle] = useState(memo.text);
    const [detail, setDetail] = useState(memo.detail);

    const [attachments, setAttachments] = useState(memo.attachments || []);

    const fileInputRef = useRef(null);

    useEffect(() => {
        loadAttachments();
    }, []);

    const loadAttachments = async () => {
        const files = await getAttachments();
        setAttachments(files);
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files); // 업로드된 파일 배열
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = async () => {
                const attachment = {
                    name: file.name,
                    data: reader.result,
                    type: file.type,
                    memoId: memo.id,
                };
                await addAttachment(attachment);
                loadAttachments();
            };
            reader.readAsDataURL(file);
            fileInputRef.current.value = file;
        }
    };

    const handleDeleteAttachment = async (id) => {
        await deleteAttachment(id);
        loadAttachments();
    };

    const handleSave = () => {
        onSave(memo.id, text, detail, attachments);
    };

    return (
        <div className="memo-detail-overlay">
            <div className="memo-detail">
                <h2>메모 상세보기</h2>
                <input 
                    type="text"
                    value={text}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                    className="memo-title-input"
                />
                <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="상세 내용을 입력하세요"
                    className="memo-textarea"
                />
                <div className="attachment-section">
                    <h3>첨푸파일</h3>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        rel={fileInputRef}
                    />
                    <ul className="attachment-list">
                        {attachments.map((file) => (
                            <li key={file.id}>
                                {file.type.startsWith("image/") ? (
                                    <img 
                                        src={file.data}
                                        alt={file.name}
                                        className="attachment-thumbnail"
                                    />
                                ) : (
                                    <a href={file.data} download={file.name}>
                                        {file.name}
                                    </a>
                                )}
                                <button 
                                    className="delete-attachment"
                                    onClick={() => handleDeleteAttachment(file.id)}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="memo-detail-buttons">
                    <button onClick={handleSave}>저장</button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default MemoDetail;