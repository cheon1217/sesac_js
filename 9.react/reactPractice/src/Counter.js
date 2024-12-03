import { useEffect, useState } from "react";
import Message from "./Message";

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => setCount(count + 1);
    const handleDecrement = () => setCount(count - 1);

    useEffect(() => {
        console.log(`Count has changed: ${count}`);

        return () => {
            console.log(`Cleanup before next effect or unmount.`);
        };
    }, [count]);

    return (
        <div>
            <h2>Counter</h2>
            <Message count={count} />
            <button onClick={handleIncrement}>Increase</button>
            <button onClick={handleDecrement}>Decrease</button>
        </div>
    );
};

export default Counter;