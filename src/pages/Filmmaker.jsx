import React from 'react';
import FilmGallery from '../components/FilmGallery';

const Filmmaker = () => {
    // Scroll restoration is now handled by PageTransition
    return (
        <>
            <div style={{ paddingTop: '80px' }}>
                <FilmGallery />
            </div>
        </>
    );
};

export default Filmmaker;
