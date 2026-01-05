import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Filmmaker from '../pages/Filmmaker';
import Designer from '../pages/Designer';
import FilmDetail from '../pages/FilmDetail';
import PageTransition from './PageTransition';
import FloatingNav from './FloatingNav';

// Routes order for transitions
const getPageIndex = (pathname) => {
    if (pathname === '/film') return 0;
    if (pathname.startsWith('/film/')) return 1; // Detail on top of Gallery
    if (pathname === '/') return 2;
    if (pathname === '/design') return 3;
    return 2;
};

const AnimatedRoutes = () => {
    const location = useLocation();
    const pageIndex = getPageIndex(location.pathname);

    // We need a ref or state to track "previous" page index effectively
    const prevIndex = React.useRef(pageIndex);
    const direction = pageIndex > prevIndex.current ? 1 : -1;

    // Update logic
    React.useEffect(() => {
        prevIndex.current = pageIndex;
    }, [pageIndex]);

    return (
        <>
            <AnimatePresence mode="popLayout" custom={direction}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <PageTransition direction={direction} id="home-scroll-container"><Home /></PageTransition>
                    } />
                    <Route path="/film" element={
                        <PageTransition direction={direction} id="film-scroll-container"><Filmmaker /></PageTransition>
                    } />
                    <Route path="/film/:id" element={
                        <PageTransition direction={direction} id="film-detail-container"><FilmDetail /></PageTransition>
                    } />
                    <Route path="/design" element={
                        <PageTransition direction={direction}><Designer /></PageTransition>
                    } />
                </Routes>
            </AnimatePresence>
            <FloatingNav isVisible={false} />
        </>
    );
};

export default AnimatedRoutes;
