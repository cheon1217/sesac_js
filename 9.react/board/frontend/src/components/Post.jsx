import { Button } from "react-bootstrap";

const Post = ({ id, title, content, image, postedAt }) => {
    async function deletePost(id) {
        const response = await fetch(`http://localhost:3001/post/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            alert("삭제 완료");
            window.location.reload();
        } else {
            alert("삭제 실패");
        }
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{title}</td>
            <td>{content}</td>
            <td>
                {image ? (
                    <img
                        src={`http://localhost:3001/uploads/${image}`}
                        alt="이미지"
                        style={{ width: "100px" }}
                    />
                ) : (
                    "없음"
                )}
            </td>
            <td>{postedAt}</td>
            <td>
                <Button size="lg" onClick={() => {deletePost(id)}}>
                    삭제
                </Button>
            </td>
        </tr>
    )
}

export default Post;