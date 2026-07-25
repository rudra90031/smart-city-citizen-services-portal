import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Smart City Logo" className="logo-img" />
                <h2>Smart City</h2>
            </div>

            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Emergency Contact</Link></li>
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