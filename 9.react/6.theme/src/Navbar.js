import { useTheme } from "./ThemeContext";

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <nav className={`navbar navbar-expand-md ${isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
            <div className="container-fluid">
                <span className="navbar-brand" href="#">제품로고</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link" aria-current="page" href="#">User</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" href="#">Order</span>
                        </li>
                        <li class="nav-item">
                            <span className="nav-link" href="#">OrderItem</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" href="#">Item</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" href="#">Store</span>
                        </li>
                    </ul>
                    <button className="btn btn-outline-secondary" onClick={toggleTheme}>
                        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;