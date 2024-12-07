import { Button, Col, Container, Form, Row } from "react-bootstrap";

const PostPage = () => {
    return (
        <div>
            <header>
                <h1>글작성</h1>
            </header>
            <main>
                <Container>
                    <Form action="http://localhost:3001/post" method="post" encType="multipart/form-data">
                        <Form.Label size="lg" htmlFor="title">제목</Form.Label>
                        <Form.Control type="text" name="title" id="title" required />

                        <Row>
                            <Col>
                                <Form.Label htmlFor="content">내용</Form.Label>
                                <Form.Control as="textarea" name="content" id="content" required />
                            </Col>
                            <Col xs="auto">
                                <Form.Label htmlFor="image">사진 첨부</Form.Label>
                                <Form.Control type="file" name="image" id="image" />
                            </Col>
                        </Row>
                        <br />
                        <Button type="submit" size="lg">작성</Button>
                    </Form>
                </Container>
            </main>
        </div>
    )
}

export default PostPage;