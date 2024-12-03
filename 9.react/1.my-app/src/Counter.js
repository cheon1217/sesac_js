import { useState } from "react";
import Message from "./Message";

const Counter = () => {
    // const count = 5;
    const [count, setCount] = useState(5); // State 선언

    const increment = () => setCount(count + 1);

    // function increment() {
    //     setCount(count + 1);
    // }

    function decrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <h2>Counter: {count}</h2>

            {/* <button onClick={() => setCount(count + 1)}>증가</button>
            <button onClick={() => setCount(count - 1)}>감소</button> */}

            <button onClick={increment}>증가</button>
            <button onClick={decrement}>감소</button>

            <Message count={count} />
        </div>
    );
}

export default Counter;