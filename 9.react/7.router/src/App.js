import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Navigation from "./Navigation";

const App = () => {
    return (
        <Router>
            <div>
                <h1>My Website</h1>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} /> 
                    <Route path="/about" element={<About />} /> 
                    <Route path="/contact" element={<Contact />} /> 
                </Routes>
            </div>
        </Router>
    );
};

export default App;