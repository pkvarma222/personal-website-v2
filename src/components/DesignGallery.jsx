import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import '../styles/RayRayGallery.css'

const DESIGNS = [
    {
        id: 1,
        title: "Knock Knock Bang",
        category: "Posters",
        image: "/assets/design-assets/Knock-Knock-Bang-Poster-2.jpg",
        client: "Self"
    },
    {
        id: 2,
        title: "Fork",
        category: "Posters",
        image: "/assets/design-assets/Fork-poster.jpg",
        client: "Self"
    },
    {
        id: 3,
        title: "Tech Corp",
        category: "Logos",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2574&auto=format&fit=crop",
        client: "Tech Corp"
    },
    {
        id: 4,
        title: "Fashion Week",
        category: "Posters",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop",
        client: "Mode"
    },
    {
        id: 5,
        title: "Future UI",
        category: "Logos",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        client: "UI Lab"
    },
    {
        id: 6,
        title: "Minimalist Poster",
        category: "Posters",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2564&auto=format&fit=crop",
        client: "Studio 4"
    }
]

const DesignGallery = () => {
    const containerRef = useRef(null)
    const [filter, setFilter] = React.useState('All')

    const filteredDesigns = filter === 'All'
        ? DESIGNS
        : DESIGNS.filter(d => d.category === filter)

    const { scrollYProgress } = useScroll({
        container: containerRef,
    })

    // Smooth scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 40,
        restDelta: 0.001
    })

    return (
        <section className="rayray-container">
            {/* Background Grain/Texture (Inherited from App) */}

            <div className="rayray-header">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    DESIGNER
                </motion.h1>
            </div>

            <div className="rayray-sidebar">
                <div className="filter-group">
                    {['All', 'Logos', 'Posters'].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="rayray-carousel">
                {filteredDesigns.map((design, index) => (
                    <Card
                        key={design.id}
                        design={design}
                        index={index}
                        total={filteredDesigns.length}
                        progress={smoothProgress}
                    />
                ))}
            </div>

            {/* Scroll Proxy */}
            <div className="rayray-scroll-proxy" ref={containerRef}>
                <div className="rayray-scroll-content" style={{ height: `${filteredDesigns.length * 200}vh` }}>
                    {filteredDesigns.map((_, i) => (
                        <div key={i} className="scroll-anchor" style={{ height: '200vh' }} />
                    ))}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="rayray-footer">
                {filteredDesigns.map((design, i) => (
                    <NavItem
                        key={design.id}
                        index={i}
                        total={filteredDesigns.length}
                        progress={smoothProgress}
                        image={design.image}
                        onClick={() => {
                            if (containerRef.current) {
                                const targetScroll = i * (containerRef.current.clientHeight * 2);
                                containerRef.current.scrollTo({
                                    top: targetScroll,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                    />
                ))}
            </div>
        </section>
    )
}

const Card = ({ design, index, total, progress }) => {
    // Calculate relative position (0 is center)
    const centerPoint = index / (total - 1 || 1)

    // Transforms based on progress
    // We want the card to be at center when progress === centerPoint
    const zIndex = useTransform(
        progress,
        [centerPoint - 0.1, centerPoint, centerPoint + 0.1],
        [1, 10, 1]
    )

    // Calculate spiral angle based on progress relative to centerPoint
    const angle = useTransform(
        progress,
        [centerPoint - 1, centerPoint, centerPoint + 1],
        [-Math.PI, 0, Math.PI]
    )

    // Increase X offset to 35vw and Z depth to 800 to create more room
    const offsetX = useTransform(angle, a => Math.sin(a) * 35) // raw number for vw
    const z = useTransform(angle, a => Math.cos(a) * 800 - 800)
    const rotateY = useTransform(angle, a => (a * 90) / Math.PI)

    // Increased range to 500vh for even more vertical clearance
    const offsetY = useTransform(
        progress,
        [centerPoint - 1, centerPoint, centerPoint + 1],
        [500, 0, -500] // raw number for vh
    )

    const opacity = useTransform(
        progress,
        [centerPoint - 0.6, centerPoint - 0.3, centerPoint + 0.3, centerPoint + 0.6],
        [0, 1, 1, 0]
    )

    const scale = useTransform(
        progress,
        [centerPoint - 0.6, centerPoint, centerPoint + 0.6],
        [0.6, 1, 0.6]
    )

    // Check if this card is currently in focus
    const isActive = useTransform(
        progress,
        [centerPoint - 0.1, centerPoint, centerPoint + 0.1],
        [false, true, false]
    )

    const [activeClass, setActiveClass] = React.useState("")
    useMotionValueEvent(isActive, "change", (latest) => {
        setActiveClass(latest ? "active" : "")
    })

    return (
        <motion.div
            className={`rayray-card ${activeClass}`}
            style={{
                left: "50%",
                top: "50%",
                x: useTransform(offsetX, val => `calc(-50% + ${val}vw)`),
                y: useTransform(offsetY, val => `calc(-50% + ${val}vh)`),
                z,
                rotateY,
                opacity,
                scale,
                zIndex
            }}
        >
            <img src={design.image} alt={design.title} />
        </motion.div>
    )
}

const NavItem = ({ index, total, progress, image, onClick }) => {
    const centerPoint = index / (total - 1 || 1)

    // Highlight if near center
    const activeProgress = useTransform(
        progress,
        [centerPoint - 0.05, centerPoint, centerPoint + 0.05],
        [0.4, 1, 0.4]
    )

    const borderColor = useTransform(
        progress,
        [centerPoint - 0.05, centerPoint, centerPoint + 0.05],
        ["rgba(253, 252, 240, 0)", "rgba(253, 252, 240, 1)", "rgba(253, 252, 240, 0)"]
    )

    return (
        <motion.div
            className="rayray-nav-thumb"
            style={{ opacity: 1, borderColor }}
            onClick={onClick}
        >
            <img src={image} alt="" />
        </motion.div>
    )
}

export default DesignGallery
