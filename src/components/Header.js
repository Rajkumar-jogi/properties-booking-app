import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";  
import { MdOutlineMenu } from "react-icons/md";
import '../styles/Header.css';

import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const [isActive, setIsActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);

    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

    const handleClickOutside = (event) => {
        if (
            (dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
            (menuRef.current && !menuRef.current.contains(event.target))
        ) {
            setIsActive(false);
            setIsMenuOpen(false);
        }
    };

    const handleNavLinkClick = () => {
        setIsMenuOpen(false); // Close the menu when a navigation link is clicked
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header>
            <section className="header-container">
                <div className="logo-container">
                    <button 
                        className="menu-button" 
                        aria-label="Menu" 
                        onClick={() => setIsMenuOpen(prev => !prev)}
                        ref={menuRef}
                    >
                        <MdOutlineMenu className="menu-icon" />
                    </button>
                    <Link to="/" className="nav-link" onClick={handleNavLinkClick}>
                        <h1>Properties App</h1>
                    </Link>
                </div>

                <nav className={`nav-container ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <Link to="/" className="nav-link" onClick={handleNavLinkClick}>Home</Link>
                        </li>
                        <li>
                            <Link to="/properties" className="nav-link" onClick={handleNavLinkClick}>Properties</Link>
                        </li>
                        <li>
                            <Link to="/cartlist" className="nav-link" onClick={handleNavLinkClick}>Cart</Link>
                        </li>
                    </ul>
                </nav>
                {
                    isAuthenticated ? <div className='profile-container'>
                    <button 
                        className="profile-btn" 
                        onClick={() => setIsActive(prev => !prev)} 
                        aria-label="Profile"
                    >
                        <img 
                            className="pro-image" 
                            src='https://cdn.pixabay.com/photo/2024/05/19/19/30/ai-generated-8773212_640.png' 
                            alt='User avatar' 
                        />
                    </button>
                    {isActive && (
                        <div className="profile-drop-box" ref={dropdownRef}>
                            <h3>Hey, {user.nickname.slice(0, 1).toUpperCase() + user.nickname.slice(1)}</h3>
                            <Link className="nav-link" style={{marginBottom: "6px"}} to='/my-orders'>My Orders</Link>
                            <button className="login-logout-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                Logout
                            </button>                           
                        </div>
                    )}
                </div> : (
                    <button className="login-logout-btn" onClick={() => loginWithRedirect()}>Login</button>
                )
                }
                
            </section>            
        </header>
    );
};

export default Header;
