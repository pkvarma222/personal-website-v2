import React from 'react';
import DesignGallery from '../components/DesignGallery';
import Contact from '../components/Contact';

const Designer = () => {
    // Scroll restoration is now handled by PageTransition
    return (
        <>
            <div style={{ paddingTop: '80px' }}>
                <DesignGallery />
            </div>
            <Contact />
        </>
    );
};

export default Designer;
