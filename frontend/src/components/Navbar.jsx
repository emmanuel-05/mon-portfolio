import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__brand">Portfolio</div>
            <ul className="navbar__links">
                <li>
                    <a href="#home" className="navbar__link navbar__link--active">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#projects" className="navbar__link">
                        Projects
                    </a>
                </li>
                <li>
                    <a href="#contact" className="navbar__link">
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
