import React, { useRef, useContext } from 'react'
import { motion, useTransform } from 'framer-motion'
import TechnicalCard from './TechnicalCard'
import { PageScrollContext } from './PageTransition' // Import context
import '../styles/Gallery.css'
import '../styles/TechnicalGrid.css'

const FILMS = [
    {
        id: 1,
        title: "Midnight Echoes",
        category: "Short Film",
        year: "2023",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop",
        gridClass: "pos-1"
    },
    {
        id: 2,
        title: "Urban Rhapsody",
        category: "Documentary",
        year: "2022",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=2628&auto=format&fit=crop",
        gridClass: "pos-2"
    },
    {
        id: 3,
        title: "Neon Dreams",
        category: "Music Video",
        year: "2023",
        image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=2679&auto=format&fit=crop",
        gridClass: "pos-3"
    },
    {
        id: 4,
        title: "Silence Speaks",
        category: "Commercial",
        year: "2021",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
        gridClass: "pos-4"
    },
    {
        id: 5,
        title: "Velvet Noise",
        category: "Experimental",
        year: "2024",
        image: "https://images.unsplash.com/photo-1550100136-e074f01d8cc3?q=80&w=2670&auto=format&fit=crop",
        gridClass: "pos-5"
    },
    {
        id: 6,
        title: "Forgotten Tapes",
        category: "Archival",
        year: "2020",
        image: "https://images.unsplash.com/photo-1598298774000-0870ec485dce?q=80&w=2670&auto=format&fit=crop",
        gridClass: "pos-6"
    },
    {
        id: 7,
        title: "Concrete Jungle",
        category: "Street",
        year: "2023",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2666&auto=format&fit=crop",
        gridClass: "pos-7"
    },
    {
        id: 8,
        title: "Analog Soul",
        category: "Documentary",
        year: "2022",
        image: "https://images.unsplash.com/photo-1533633117518-e4b4aa366a4f?q=80&w=2670&auto=format&fit=crop",
        gridClass: "pos-8"
    },
    {
        id: 9,
        title: "Static Void",
        category: "Sci-Fi",
        year: "2025",
        image: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?q=80&w=2564&auto=format&fit=crop",
        gridClass: "pos-9"
    }
]

const FilmGallery = () => {
    // Consume scrollY from parent page transition
    const scrollY = useContext(PageScrollContext);

    // Fallback if context is missing (though it shouldn't be)
    // Transform scroll pixels (0 to ~800px) to opacity/scale
    const heroOpacity = useTransform(scrollY || { get: () => 0 }, [0, 800], [1, 0.2])
    const heroScale = useTransform(scrollY || { get: () => 0 }, [0, 200], [1, 0.9])

    return (
        <section id="film" className="gallery-section technical-mode">
            {/* Technical Background */}
            <div className="technical-grid" />
            <div className="crosshair ch-tl" />
            <div className="crosshair ch-tr" />
            <div className="crosshair ch-bl" />
            <div className="crosshair ch-br" />

            {/* Hero Title */}
            <div className="film-hero-container">
                <motion.h1
                    className="film-hero-title"
                    style={{ opacity: heroOpacity, scale: heroScale }}
                >
                    FILMMAKER
                </motion.h1>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                {/* Masonry/Grid Layout for Cards */}
                <div className="technical-gallery-grid">
                    {FILMS.map(film => (
                        <motion.div
                            key={film.id}
                            className={`tech-grid-item ${film.gridClass}`}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <TechnicalCard film={film} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FilmGallery
