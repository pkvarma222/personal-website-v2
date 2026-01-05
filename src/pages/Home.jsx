import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
    // Scroll detection is now handled in FloatingNav itself
    return (
        <>
            <Hero />
            <About />
            <Contact />
        </>
    );
};

export default Home;
