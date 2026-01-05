import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? '100%' : '-25%',
            opacity: 1,
            zIndex: direction > 0 ? 50 : 1 // Incoming page on top if forward
        };
    },
    center: {
        x: 0,
        opacity: 1,
        zIndex: 10
    },
    exit: (direction) => {
        return {
            x: direction < 0 ? '100%' : '-25%',
            opacity: 1, // Keep opacity to avoid fade
            zIndex: direction < 0 ? 50 : 1 // Outgoing page on top if back
        };
    }
};

// Simple in-memory store for scroll positions
const scrollPositions = {};

import { useMotionValue } from 'framer-motion';

// Export context for usage in child components
export const PageScrollContext = React.createContext(null);

const PageTransition = ({ children, direction, id }) => {
    const location = useLocation();
    const scrollContainerRef = useRef(null);
    const pathname = location.pathname;

    // Create MotionValue for scroll position
    const scrollY = useMotionValue(0);

    // Restore scroll position on mount
    useLayoutEffect(() => {
        const el = scrollContainerRef.current;
        if (el && scrollPositions[pathname]) {
            el.scrollTop = scrollPositions[pathname];
            scrollY.set(scrollPositions[pathname]); // Sync motion value
        }
    }, [pathname]);

    // Save scroll position on scroll
    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        scrollPositions[pathname] = scrollTop;
        scrollY.set(scrollTop); // Update motion value
    };

    return (
        <PageScrollContext.Provider value={scrollY}>
            <motion.div
                id={id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    overflowY: 'auto', // Enable scrolling within the page
                    overflowX: 'hidden',
                    WebkitOverflowScrolling: 'touch'
                }}
                ref={scrollContainerRef}
                onScroll={handleScroll}
            >
                {children}
            </motion.div>
        </PageScrollContext.Provider>
    );
};

export default PageTransition;
