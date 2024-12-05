import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    // const users = [
    //     { id: 1, name: "Alice" },
    //     { id: 2, name: "Bob" },
    //     { id: 3, name: "Charlie" },
    // ]
    const [users, setUsers] = useState([]); // 초기값 빈 배열

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then(response => response.json())
            .then(data => {
                setUsers(data)
            })
            .catch (err => {
                console.error("데이터 못 가져옴: ", err);
            })
    }, []);

    return (
        <div>
            <h2>유저 목록</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users;