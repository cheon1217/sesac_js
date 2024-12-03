const Counter = ({ count, setCount }) => {
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
        </div>
    );
}

export default Counter;