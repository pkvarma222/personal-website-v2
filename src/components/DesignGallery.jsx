import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { resolveAssetPath } from '../utils/paths'
import '../styles/RayRayGallery.css'

const DESIGNS = [
    {
        id: 1,
        title: "Knock Knock Bang",
        category: "Posters",
        image: "/assets/design-assets/Knock-Knock-Bang-Poster-2.jpg"
    },
    {
        id: 2,
        title: "Fork",
        category: "Posters",
        image: "/assets/design-assets/Fork-poster.jpg"
    },
    {
        id: 3,
        title: "Draftica",
        category: "Logos",
        image: "/assets/design-assets/Draftica-Logo.png"
    },
    {
        id: 4,
        title: "The Batman",
        category: "Posters",
        image: "/assets/design-assets/The-Batman.jpg"
    },
    {
        id: 5,
        title: "Avengers: Infinity War",
        category: "Posters",
        image: "/assets/design-assets/Avengers-Infinity-War-1.jpg"
    },
    {
        id: 6,
        title: "Ready Player One",
        category: "Posters",
        image: "/assets/design-assets/Ready-Player-One.jpg"
    },
    {
        id: 7,
        title: "Ninnu Cheraga",
        category: "Logos",
        image: "/assets/design-assets/Ninnu-Cheraga-Poster.jpg"
    },
    {
        id: 8,
        title: "Green Lantern",
        category: "Posters",
        image: "/assets/design-assets/Green-Lantern.jpg"
    },
    {
        id: 9,
        title: "Catwoman",
        category: "Posters",
        image: "/assets/design-assets/Haley-Bennet-Catwoman.jpg"
    },
    {
        id: 10,
        title: "Thanos",
        category: "Posters",
        image: "/assets/design-assets/Thanos.jpg"
    },
    {
        id: 11,
        title: "Spider-Man",
        category: "Posters",
        image: "/assets/design-assets/spiderman-homecoming-1.jpg"
    },
    {
        id: 12,
        title: "Poison Ivy",
        category: "Posters",
        image: "/assets/design-assets/stephanie-corneliussen-as poison-ivy.jpg"
    }
]

const LogoBackdrop = React.lazy(() => import('./LogoBackdrop'))

const DesignGallery = () => {
    const containerRef = useRef(null)
    const [filter, setFilter] = React.useState('All')

    const filteredDesigns = filter === 'All'
        ? DESIGNS
        : DESIGNS.filter(d => d.category === filter)

    const { scrollYProgress } = useScroll({
        container: containerRef,
    })

    // Snappier scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 40,
        restDelta: 0.001
    })

    const weightedDesigns = React.useMemo(() => {
        let cumulative = 0;
        return filteredDesigns.map((design) => {
            const weight = 0.625;
            const start = cumulative;
            cumulative += weight;
            return { ...design, weight, start, center: start + weight / 2 };
        });
    }, [filteredDesigns]);

    const totalWeight = weightedDesigns.reduce((acc, d) => acc + d.weight, 0);

    // Use a fixed reference to keep unit distance consistent regardless of filter
    // 12 designs * 2.5 weight = 30 absolute weight units
    const GALLERY_CAPACITY_REF = 30;

    const firstCenter = weightedDesigns.length > 0 ? weightedDesigns[0].center / GALLERY_CAPACITY_REF : 0;
    const lastCenter = weightedDesigns.length > 0 ? weightedDesigns[weightedDesigns.length - 1].center / GALLERY_CAPACITY_REF : 0;

    // Map the 0-1 scroll progress to firstCenter-lastCenter with non-linear speed ramps
    // Calibrated for high density (0.625 weight): 2% ramp, 0.05 visibility buffer
    const activeProgress = useTransform(
        smoothProgress,
        [0, 0.02, 0.98, 1],
        [firstCenter - 0.05, firstCenter, lastCenter, lastCenter + 0.05]
    );

    // Reset scroll on filter change
    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [filter]);

    return (
        <section className="rayray-container">
            {/* 3D Backdrop Layer */}
            <React.Suspense fallback={null}>
                <LogoBackdrop />
            </React.Suspense>

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
                {weightedDesigns.map((design, index) => (
                    <Card
                        key={design.id}
                        design={design}
                        centerPoint={design.center / GALLERY_CAPACITY_REF}
                        progress={activeProgress}
                        onClick={() => {
                            if (containerRef.current) {
                                const targetActiveProgress = design.center / GALLERY_CAPACITY_REF;

                                // Piece-wise inverse calculation for high density mapping
                                let scrollProgress;
                                if (targetActiveProgress < firstCenter) {
                                    scrollProgress = ((targetActiveProgress - (firstCenter - 0.05)) / 0.05) * 0.02;
                                } else if (targetActiveProgress > lastCenter) {
                                    scrollProgress = 0.98 + ((targetActiveProgress - lastCenter) / 0.05) * 0.02;
                                } else {
                                    scrollProgress = 0.02 + ((targetActiveProgress - firstCenter) / (lastCenter - firstCenter || 1)) * 0.96;
                                }

                                const maxScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight;
                                containerRef.current.scrollTo({
                                    top: scrollProgress * maxScroll,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                    />
                ))}
            </div>

            {/* Scroll Proxy */}
            <div className="rayray-scroll-proxy" ref={containerRef}>
                <div className="rayray-scroll-content" style={{ height: `${(totalWeight + 2) * 80}vh` }}>
                    {weightedDesigns.map((_, i) => (
                        <div key={i} className="scroll-anchor" style={{ height: `${weightedDesigns[i].weight * 80}vh` }} />
                    ))}
                    {/* Extra space to scroll past last card */}
                    <div style={{ height: '160vh' }} />
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="rayray-footer">
                {weightedDesigns.map((design, i) => (
                    <NavItem
                        key={design.id}
                        centerPoint={design.center / GALLERY_CAPACITY_REF}
                        progress={activeProgress}
                        image={design.image}
                        onClick={() => {
                            if (containerRef.current) {
                                const targetActiveProgress = design.center / GALLERY_CAPACITY_REF;

                                // Piece-wise inverse calculation for high density mapping
                                let scrollProgress;
                                if (targetActiveProgress < firstCenter) {
                                    scrollProgress = ((targetActiveProgress - (firstCenter - 0.05)) / 0.05) * 0.02;
                                } else if (targetActiveProgress > lastCenter) {
                                    scrollProgress = 0.98 + ((targetActiveProgress - lastCenter) / 0.05) * 0.02;
                                } else {
                                    scrollProgress = 0.02 + ((targetActiveProgress - firstCenter) / (lastCenter - firstCenter || 1)) * 0.96;
                                }

                                const maxScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight;
                                containerRef.current.scrollTo({
                                    top: scrollProgress * maxScroll,
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

const Card = ({ design, centerPoint, progress, onClick }) => {

    // Transforms based on progress
    // We want the card to be at center when progress === centerPoint
    const zIndex = useTransform(
        progress,
        [centerPoint - 0.1, centerPoint, centerPoint + 0.1],
        [1, 10, 1]
    )

    // Calibrated for ultra-dense spacing (weight 0.625)
    const angle = useTransform(
        progress,
        [centerPoint - 0.08, centerPoint, centerPoint + 0.08],
        [-Math.PI * 0.9, 0, Math.PI * 0.9]
    )

    // Tightened Z depth and X offset for a dense helical cylinder
    const offsetX = useTransform(angle, a => Math.sin(a) * 45) // vw
    const z = useTransform(angle, a => Math.cos(a) * 800 - 800)
    const rotateY = useTransform(angle, a => (a * 160) / (Math.PI * 0.9)) // Very aggressive rotation

    // MINIMAL vertical pitch
    const offsetY = useTransform(
        progress,
        [centerPoint - 0.08, centerPoint, centerPoint + 0.08],
        [60, 0, -60] // raw number for vh
    )

    const opacity = useTransform(
        progress,
        [centerPoint - 0.06, centerPoint - 0.02, centerPoint + 0.02, centerPoint + 0.06],
        [0, 1, 1, 0]
    )

    const scale = useTransform(
        progress,
        [centerPoint - 0.06, centerPoint, centerPoint + 0.06],
        [0.8, 1, 0.8]
    )

    // Check if this card is currently in focus
    const isActive = useTransform(
        progress,
        [centerPoint - 0.05, centerPoint, centerPoint + 0.05],
        [false, true, false]
    )

    const [activeClass, setActiveClass] = React.useState("")
    useMotionValueEvent(isActive, "change", (latest) => {
        setActiveClass(latest ? "active" : "")
    })

    return (
        <motion.div
            className={`rayray-card ${activeClass}`}
            onClick={onClick}
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
            <img src={resolveAssetPath(design.image)} alt={design.title} />
        </motion.div>
    )
}

const NavItem = ({ centerPoint, progress, image, onClick }) => {

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
            <img src={resolveAssetPath(image)} alt="" />
        </motion.div>
    )
}

export default DesignGallery
