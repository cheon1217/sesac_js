import Navbar from "./Navbar";
import Pagination from "./Pagination";
import Table from "./Table";
import { ThemeProvider } from "./ThemeContext";

const App = () => {


    return (
        <ThemeProvider>
            <Navbar />

            <main className="container mt-4">
                <Table />
            </main>

            <Pagination />
        </ThemeProvider>
    );
};

export default App;