import { useEffect } from "react"

const Message = ({ count, message }) => {
    useEffect(() => {
        if (count === 10) {
            alert("Count has reached 10!");
        }
    }, [count]);

    useEffect(() => {
        document.body.style.backgroundColor = count % 2 === 0 ? "lightblue" : "lightcoral";

        return () => {
            document.body.style.backgroundColor = "";
        };
    }, [count]);

    useEffect(() => {
        console.log("Component mounted");
        return () => {
            console.log("Component unmounted");
        };
    }, []);

    useEffect(() => {
        document.title = message || "Default Title";
    }, [message]);

    return (
        <div>
            <h2>Message: {message}</h2>
            {count > 10 && <p>You've clicked more than 10 times!</p>}
        </div>
    );
};

export default Message;