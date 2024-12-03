import React from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Counter from "./Counter";

function App() {
// const App = () => {

    const pageTitle = "Welcome to My Website";

    return (
        <div className="App">
            <Header title={pageTitle} />
            <main className="App-header">
                <h1>Hello, World!</h1>
                <p>안녕하세요, 리엑트 학습자 여러분</p>
                <Counter />
            </main>
            <Footer />
        </div>
    );
}

export default App;