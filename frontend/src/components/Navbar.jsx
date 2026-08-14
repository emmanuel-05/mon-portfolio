import "./Navbar.css";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__brand">
                <NavLink to="/" >Gnamien</NavLink>
            </div>
            <ul className="navbar__links">
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            isActive ? "navbar__link navbar__link--active" : "navbar__link"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink 
                        to="/projects" 
                        className={({ isActive }) => 
                            isActive ? "navbar__link navbar__link--active" : "navbar__link"
                        }
                    >
                        Projects
                    </NavLink>
                </li> */}
                <li>
                    <NavLink 
                        to="/contact" 
                        className={({ isActive }) => 
                            isActive ? "navbar__link navbar__link--active" : "navbar__link"
                        }
                    >
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
