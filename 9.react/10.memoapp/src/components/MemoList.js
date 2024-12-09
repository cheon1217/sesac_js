import { DragDropContext, Droppable } from "react-beautiful-dnd";
import MemoItem from "./MemoItem";

const MemoList = ({ memos, onDelete, onEdit, onToggle, onReMemos, onOpenDetail }) => {
    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            console.log("드롭 위치가 없습니다.");
            return;
        }

        if (source.index === destination.index) {   
            console.log("같은 위치로 드롭되었습니다.");
            return;
        }

        console.log(`드래그 시작: ${source.index}, 드롭위치: ${destination.index}`);

        onReMemos(source.index, destination.index);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="memo-list">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="memo-list"
                    >
                        {memos.map((memo, index) => (
                            <MemoItem
                                key={memo.id}
                                memo={memo}
                                index={index}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onToggle={onToggle}
                                onOpenDetail={onOpenDetail}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default MemoList;