import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./UserDetail.css";

const UserDetail = () => {
    const { userId } = useParams();

    // const users = [
    //     { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    //     { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
    //     { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 },
    // ]
    // const user = users.find((u) => u.id === parseInt(userId));

    const [user, setUser] = useState([]);
    const [error, setError] = useState(null); // 초기에는 에러 null

    useEffect(() => {
        fetch(`http://localhost:3000/api/users/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("User not found");
                }
                return response.json()
            })
            .then(data => setUser(data))
            .catch(err => {
                setError(err.message);
            });
    }, [userId]);

    if (error) {
        return <p className="error-message">오류: {error}</p>
    }

    return (
        <div>
            <h2>UserDetail</h2>
            <p>유저 상세 페이지: {userId}</p>

            <p><strong>이름:</strong> {user.name}</p>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>나이:</strong> {user.age}</p>
        </div>
    );
};

export default UserDetail;