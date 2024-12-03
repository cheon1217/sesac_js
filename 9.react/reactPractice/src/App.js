import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Counter from "./Counter";
import Message from "./Message";
import Input from "./Input";


const App = () => {
    const pageTitle = "Welcome to my Website";
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");

    return (
        <div>
            <Header title={pageTitle}/>
            <main>
                <p>This is the main content area.</p>
                <Counter count={count} setCount={setCount} />
                <Message count={count} message={message} />
                <Input setMessage={setMessage} />
            </main>
            <Footer />
        </div>
    );
}

export default App;