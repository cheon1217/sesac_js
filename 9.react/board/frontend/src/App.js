import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TablePage from "./components/TablePage";
import PostPage from "./components/PostPage";

const App = () => {
    <div className="">
        <Router>
            <Routes>
                <Route path="/" element={<TablePage />}></Route>
                <Route path="/post" element={<PostPage />}></Route>
            </Routes>
        </Router>
    </div>
}

export default App;