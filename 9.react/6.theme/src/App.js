import { useEffect } from "react";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import Table from "./Table";
import { useTheme } from "./ThemeContext";

const App = () => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        document.body.className = isDarkMode ? "bg-dark text-light" : "bg-light text-dark";
    }, [isDarkMode]);

    return (
        <div>
            <Navbar />

            <main className="container mt-4">
                <Table />
            </main>

            <Pagination />
        </div>
    );
};

export default App;