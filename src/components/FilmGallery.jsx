import React from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import SienaStubCard from './SienaStubCard'
import { FILMS } from '../data/films'
import '../styles/Gallery.css'
import '../styles/SienaGallery.css'
import { ArrowRight } from 'lucide-react';
import { resolveAssetPath } from '../utils/paths';

let savedScrollPosition = 0;

const FilmGallery = () => {
    const [activeFilm, setActiveFilm] = React.useState(FILMS[0]);
    const containerRef = React.useRef(null);

    // Restore scroll position on mount
    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = savedScrollPosition;
            // Trigger update to ensure correct badge
            // We can't call handleScroll directly if it relies on stale closures, 
            // but the logic below is safe to duplicate or extract.
            // Let's just run the logic manually here or let the scroll event fire?
            // Programmatic scrollTop DOES NOT fire onScroll in React/Browsers usually.
            // So we must manually update state.

            const container = containerRef.current;
            const firstCard = container.firstElementChild;
            if (firstCard) {
                const step = firstCard.getBoundingClientRect().height + 32;
                const index = Math.round(container.scrollTop / step);
                const safeIndex = Math.min(Math.max(0, index), FILMS.length - 1);
                setActiveFilm(FILMS[safeIndex]);
            }
        }
    }, []);

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        // Save position globally
        savedScrollPosition = container.scrollTop;

        // Determine active index based on scroll position
        const firstCard = container.firstElementChild;
        if (!firstCard) return;

        const cardHeight = firstCard.getBoundingClientRect().height;
        const step = cardHeight + 32;

        // Calculate index
        const index = Math.round(container.scrollTop / step);
        const safeIndex = Math.min(Math.max(0, index), FILMS.length - 1);

        if (FILMS[safeIndex].id !== activeFilm.id) {
            setActiveFilm(FILMS[safeIndex]);
        }
    };

    return (
        <section className="siena-theme siena-fixed-layout">
            {/* Ticket Badge (Fixed Top Right) */}
            {/* Ticket Badge (Fixed Top Right) */}
            <div className="ticket-badge fixed-badge">
                <div className="ticket-top-row">
                    <img src={resolveAssetPath(activeFilm.image)} alt="" className="ticket-thumb" />
                    <span className="ticket-title-text">{activeFilm.title}</span>
                    <div style={{ flex: 1 }}></div>
                    <ArrowRight size={16} style={{ transform: 'rotate(90deg)' }} /> {/* Chevron Down-ish */}
                </div>

                <div className="ticket-bottom-row">
                    <div className="ticket-col">{activeFilm.category}</div>
                    <div className="ticket-col border-lr">{activeFilm.year}</div>
                    <div className="ticket-col">{activeFilm.duration}</div>
                </div>
            </div>



            {/* Intro Content */}
            <div className="siena-intro">
                <h1>FILMMAKER</h1>
            </div>

            {/* Vertical Stack of Stub Cards */}
            <div
                className="siena-vertical-stack"
                ref={containerRef}
                onScroll={handleScroll}
            >
                {FILMS.map((film, index) => (
                    <SienaStubCard
                        key={film.id}
                        item={film}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}

export default FilmGallery
