import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { ScrubbedSplitText } from './ScrollReveal';
import '../styles/PhotographyScroll.css';

const PhotographyScroll = () => {
    const containerRef = useRef(null);
    const dragRef = useRef(null);
    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
    
    // Some high-quality photography placeholders from Unsplash
    // These are formatted in 3:2 aspect ratio typically
    const photos = [
        { id: '1', title: 'Urban Geometry', url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=600&h=400' },
        { id: '2', title: 'Mountain Range', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600&h=400' },
        { id: '3', title: 'Street Portrait', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=400' },
        { id: '4', title: 'Ocean Waves', url: 'https://images.unsplash.com/photo-1505118380757-91f5f5635332?auto=format&fit=crop&q=80&w=600&h=400' },
        { id: '5', title: 'Desert Dunes', url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=600&h=400' },
        { id: '6', title: 'Architecture', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=400' },
        { id: '7', title: 'Forest Path', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600&h=400' },
        { id: '8', title: 'Neon Nights', url: 'https://images.unsplash.com/photo-1555617781-80a6d252a1ba?auto=format&fit=crop&q=80&w=600&h=400' }
    ];

    useEffect(() => {
        const updateConstraints = () => {
            if (dragRef.current) {
                const containerW = dragRef.current.scrollWidth;
                
                // The right edge of the film strip is at 200px from the left screen edge.
                // Left edge of the film strip is at (200 - containerW).
                // We want to stop dragging right when the left edge reaches -600px 
                // (so a buffer of ~2 photos remains inside/behind the canister).
                // 200 - containerW + maxDragRight = -600
                // maxDragRight = containerW - 800
                
                const maxDragRight = Math.max(0, containerW - 800);

                setDragConstraints({
                    left: 0,
                    right: maxDragRight
                });
            }
        };

        updateConstraints();
        window.addEventListener('resize', updateConstraints);
        // Small delay to ensure images load and width is calculated correctly
        setTimeout(updateConstraints, 500);

        return () => window.removeEventListener('resize', updateConstraints);
    }, []);

    const x = useMotionValue(0);
    const controls = useAnimation();

    // Map the drag X to the spool rotation inside the canister
    // As you pull right (x increases), the spool should rotate clockwise
    const spoolRotation = useTransform(x, [0, 1000], [0, 360]);
    // Fade out the pull indicator as you drag
    const indicatorOpacity = useTransform(x, [0, 100], [1, 0]);

    return (
        <section className="photography-section">
            <div className="photography-header">
                <h2 className="vlogs-title" style={{ marginBottom: '1rem' }}>
                    <span style={{ display: 'block', fontSize: '0.55em', opacity: 0.9, letterSpacing: '0.15em', marginBottom: '0.2em' }}>
                        <ScrubbedSplitText offset={["start 85%", "start 60%"]}>Some moments caught on</ScrubbedSplitText>
                    </span>
                    <span className="photography-label">
                        <ScrubbedSplitText offset={["start 65%", "start 40%"]}>35mm film</ScrubbedSplitText>
                    </span>
                </h2>
            </div>

            <div className="photography-interactive-wrapper" ref={containerRef} style={{ height: '380px' }}>
                
                {/* 35mm Canister (Fixed on Left) */}
                <div className="film-canister-wrapper">
                    <div className="canister-knob"></div>
                    <div className="canister-body">
                        <div className="canister-label">
                            <span className="canister-label-text">PORTRA 400</span>
                            <span className="canister-label-sub">Color Negative Film</span>
                        </div>
                        <div className="canister-lip"></div>
                        <div className="canister-spool">
                            {/* Inner spool that rotates when you pull the film */}
                            <motion.div 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    background: 'repeating-linear-gradient(90deg, #111 0px, #111 10px, #222 10px, #222 20px)',
                                    rotateY: spoolRotation
                                }} 
                            />
                        </div>
                    </div>
                </div>

                <motion.div style={{ opacity: indicatorOpacity }} className="photography-pull-indicator">
                    <span>Pull to develop</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </motion.div>

                {/* The drag container is positioned such that its RIGHT edge is at 200px from the left screen edge. 
                    This way, only the first 1-2 photos are visible, sticking out of the canister. */}
                <motion.div
                    ref={dragRef}
                    className="photography-scroll-container"
                    drag="x"
                    dragConstraints={dragConstraints}
                    dragElastic={0.05}
                    dragMomentum={true}
                    style={{ 
                        x, 
                        position: 'absolute', 
                        right: 'calc(100% - 300px)', // Show 300px initially
                        top: '50%',
                        translateY: '-50%'
                    }}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {photos.map((photo) => (
                        <div key={photo.id} className="photography-item">
                            <div className="photography-card">
                                <img
                                    src={photo.url}
                                    alt={photo.title}
                                    className="photography-poster"
                                    loading="lazy"
                                    draggable="false"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PhotographyScroll;
