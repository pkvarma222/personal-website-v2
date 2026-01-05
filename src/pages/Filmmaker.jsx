import React from 'react';
import FilmGallery from '../components/FilmGallery';
import Contact from '../components/Contact';

const Filmmaker = () => {
    // Scroll restoration is now handled by PageTransition
    return (
        <>
            <div style={{ paddingTop: '80px' }}>
                <FilmGallery />
            </div>
            <Contact />
        </>
    );
};

export default Filmmaker;
