import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, Clapperboard, Palette } from 'lucide-react'
import '../styles/FloatingNav.css'

const FloatingNav = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const [scrolledPastHero, setScrolledPastHero] = useState(false);
    const [isLightBackground, setIsLightBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // We only care about scroll if we are on Homepage for visibility toggle
            // On other pages, we are always visible.
            const container = document.getElementById('home-scroll-container');
            if (container) {
                const scrollPos = container.scrollTop;
                setScrolledPastHero(scrollPos > window.innerHeight * 0.15);
                // Threshold matches Hero.jsx background transition [0, 800]
                setIsLightBackground(scrollPos > 600);
            }
        };

        // We need to attach listener to the 'home-scroll-container' if we are on home.
        // Since PageTransition mounts/unmounts, we might need to retry attaching or depend on location

        // Better approach: Use a mutation observer or just interval check? 
        // Or just simple useEffect dependency on location.pathname

        const container = document.getElementById('home-scroll-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
            // Initial check
            handleScroll();
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        }
    }, [location.pathname]); // Re-run when location changes to attach/detach properly

    // Logic: If on Homepage, show only if scrolled past 50% Hero.
    // If NOT on Homepage (Film/Design), ALWAYS be visible.
    const shouldShow = isHomePage ? scrolledPastHero : true;
    const isFilmDetail = location.pathname.startsWith('/film/') && location.pathname !== '/film';
    const isInteriorPage = !isHomePage;

    return (
        <div className={`floating-nav ${shouldShow ? 'visible' : ''} ${isLightBackground && isHomePage ? 'light-background' : ''} ${isFilmDetail ? 'dark-contrast' : ''} ${isInteriorPage ? 'is-interior' : ''}`}>
            <NavLink to="/film" className={({ isActive }) => `floating-nav-link ${isActive ? 'active' : ''}`}>
                <Clapperboard size={20} />
                <span>Filmmaker</span>
            </NavLink>

            <div className="floating-divider" />

            <NavLink to="/" className={({ isActive }) => `floating-nav-link ${isActive ? 'active' : ''}`} end>
                <Home size={20} />
            </NavLink>

            <div className="floating-divider" />

            <NavLink to="/design" className={({ isActive }) => `floating-nav-link ${isActive ? 'active' : ''}`}>
                <Palette size={20} />
                <span>Designer</span>
            </NavLink>
        </div>
    )
}

export default FloatingNav
