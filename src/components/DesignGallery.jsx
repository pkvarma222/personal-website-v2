import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import '../styles/RayRayGallery.css'

const DESIGNS = [
    {
        id: 1,
        title: "Vogue Redesign",
        category: "Editorial",
        image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=2670&auto=format&fit=crop",
        client: "Vogue",
        orientation: "landscape"
    },
    {
        id: 2,
        title: "Abstract Forms",
        category: "Graphics",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        client: "Art Collective",
        orientation: "portrait"
    },
    {
        id: 3,
        title: "Tech Corp",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2574&auto=format&fit=crop",
        client: "Tech Corp",
        orientation: "landscape"
    },
    {
        id: 4,
        title: "Fashion Week",
        category: "Event",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop",
        client: "Mode",
        orientation: "portrait"
    },
    {
        id: 5,
        title: "Future UI",
        category: "Web Design",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        client: "UI Lab",
        orientation: "landscape"
    },
    {
        id: 6,
        title: "Minimalist Poster",
        category: "Print",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2564&auto=format&fit=crop",
        client: "Studio 4",
        orientation: "portrait"
    }
]

const DesignGallery = () => {
    const containerRef = useRef(null)
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

            <div className="rayray-carousel">
                {DESIGNS.map((design, index) => (
                    <Card
                        key={design.id}
                        design={design}
                        index={index}
                        total={DESIGNS.length}
                        progress={smoothProgress}
                    />
                ))}
            </div>

            {/* Scroll Proxy */}
            <div className="rayray-scroll-proxy" ref={containerRef}>
                <div className="rayray-scroll-content" style={{ height: `${DESIGNS.length * 200}vh` }}>
                    {DESIGNS.map((_, i) => (
                        <div key={i} className="scroll-anchor" style={{ height: '200vh' }} />
                    ))}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="rayray-footer">
                {DESIGNS.map((design, i) => (
                    <NavItem
                        key={design.id}
                        index={i}
                        progress={smoothProgress}
                        title={design.client}
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

    // Restrict X to middle 60% of viewport
    // Using simple offset that will be added to the centered position
    const offsetX = useTransform(angle, a => Math.sin(a) * 25) // raw number for vw
    const z = useTransform(angle, a => Math.cos(a) * 600 - 600)
    const rotateY = useTransform(angle, a => (a * 90) / Math.PI)

    // Reduced range: 300vh is a good middle ground for spacing
    const offsetY = useTransform(
        progress,
        [centerPoint - 1, centerPoint, centerPoint + 1],
        [300, 0, -300] // raw number for vh
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
            className={`rayray-card ${design.orientation} ${activeClass}`}
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
            <div className="rayray-card-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <span className="rayray-card-category">{design.category}</span>
                        <h2 className="rayray-card-title">{design.title}</h2>
                        <div style={{ marginTop: '0.5rem', opacity: 0.6, fontSize: '0.9rem', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
                            CLIENT // {design.client}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const NavItem = ({ index, progress, title }) => {
    const total = DESIGNS.length
    const centerPoint = index / (total - 1 || 1)

    // Highlight if near center
    const isActive = useTransform(
        progress,
        [centerPoint - 0.05, centerPoint, centerPoint + 0.05],
        [0.4, 1, 0.4]
    )

    return (
        <motion.div
            className="rayray-nav-item"
            style={{ opacity: isActive }}
        >
            {title}
        </motion.div>
    )
}

export default DesignGallery
