import { Draggable } from "react-beautiful-dnd";

const MemoItem = ({ memo, index, onDelete, onEdit, onToggle, onOpenDetail }) => {
    return (
        <Draggable draggableId={memo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}    
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`memo-item ${
                       snapshot.isDragging ? "dragging" : "" 
                    } ${memo.completed ? "completed" : ""}`}
                >
                    <input
                        type="checkbox"
                        checked={memo.completed}
                        onChange={(e) => {
                            onToggle(memo.id) 
                        }}
                        className="checkbox"
                    />
                    <input
                        type="text"
                        value={memo.text}
                        onChange={(e) => onEdit(memo.id, e.target.value)}
                        disabled={memo.completed}
                    />
                    <div className="button-group">
                        {/* 상세 버튼 */}
                        <button
                            disabled = {memo.completed}
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenDetail(memo.id);
                            }}
                        >상세</button>
                        {/* 삭제 버튼 */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(memo.id)
                            }}
                        >삭제</button>
                    </div>
                    {/* 햄버거 아이콘 (드래그 핸들) */}
                    <span
                        {...provided.dragHandleProps}
                        className="drag-handle"
                        title="드래그하여 이동"
                    >
                        ≡
                    </span>
                </div>
            )}
        </Draggable>
    )
}

export default MemoItem;