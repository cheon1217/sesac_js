import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import Post from "./Post";

const TablePage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const fetchPosts = async() => {
        const response = await fetch("http://localhost:3001/api/posts");
        const data = await response.json();
        console.log(data);
        setPosts(data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <header className="m-4">
                <h1>게시판</h1>
            </header>
            <main>
                <Container>
                    <section>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>내용</th>
                                    <th>썸네일</th>
                                    <th>작성일</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {posts.map((post) => (
                                    <Post key={post.id} {...post} />
                                ))}
                            </tbody>
                        </Table>
                    </section>

                    <section>
                        <div className="d-grid">
                            <Button variant="outline-success" size="lg" onClick={() => {navigate("/post");}}>글작성</Button>
                        </div>
                    </section>
                </Container>
            </main>
        </div>
    )
}

export default TablePage;