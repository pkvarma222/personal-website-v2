import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import LetterboxdScroll from '../components/LetterboxdScroll';
import TravelVlogs from '../components/TravelVlogs';
import PhotographyScroll from '../components/PhotographyScroll';
import Contact from '../components/Contact';

const Home = () => {
    // Scroll detection is now handled in FloatingNav itself
    return (
        <>
            <Hero />
            <About />
            <LetterboxdScroll />
            <TravelVlogs />
            {/* <PhotographyScroll /> - Hidden for now */}
            <Contact />
        </>
    );
};

export default Home;
