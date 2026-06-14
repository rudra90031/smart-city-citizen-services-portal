import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Smart City</h2>
            </div>

            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>

            <div className="auth-buttons">
                <a href="#auth">
                    <button className="get-started-btn">
                        Get Started →
                    </button>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;