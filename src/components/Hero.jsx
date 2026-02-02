
import React, { useRef, useContext } from 'react'
import { ArrowDown } from 'lucide-react'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import { PageScrollContext } from './PageTransition'
import '../styles/Hero.css'

const Hero = () => {
    // Track global window scroll from PageTransition context
    const contextScrollY = useContext(PageScrollContext)
    const fallbackScrollY = useMotionValue(0)
    const scrollY = contextScrollY || fallbackScrollY

    // Animate over first 1200px of scroll
    const scale = useTransform(scrollY, [0, 1200], [1, 0.4])
    const glowScale = useTransform(scale, s => s * 1.02)
    const borderRadius = useTransform(scrollY, [0, 1200], ["0px", "40px"])

    // Text slides up from bottom
    const textY = useTransform(scrollY, [0, 1200], ["100vh", "0vh"])
    const textOpacity = useTransform(scrollY, [0, 1000], [0, 1])

    return (
        <div className="hero-scroll-track" style={{ height: '350vh', position: 'relative', background: '#0b0b0b' }}>
            <div className="hero-sticky" style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                {/* Projector Gates */}
                <div className="projector-gate gate-left" />
                <div className="projector-gate gate-right" />

                {/* Director's Cut Flare */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '60vw',
                        height: '60vw',
                        background: 'radial-gradient(circle, rgba(139, 46, 27, 0.1) 0%, transparent 60%)',
                        filter: 'blur(100px)',
                        zIndex: 1,
                        pointerEvents: 'none',
                        top: '10%',
                        left: '-10%'
                    }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Main Lens Flare */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at 80% 20%, rgba(239, 234, 215, 0.1) 0%, transparent 40%)',
                        zIndex: 11,
                        pointerEvents: 'none'
                    }}
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Text Layer (Hollow, Above) */}
                <motion.div
                    className="title-flicker"
                    style={{
                        position: 'absolute',
                        y: textY,
                        opacity: textOpacity,
                        zIndex: 10,
                        textAlign: 'center',
                        width: '100vw',
                        left: 0,
                        pointerEvents: 'none'
                    }}
                >
                    <h1 style={{
                        fontSize: '18vw',
                        fontFamily: 'var(--font-wide)',
                        fontWeight: 900,
                        color: 'transparent',
                        WebkitTextStroke: '2px var(--color-accent)',
                        filter: 'drop-shadow(0 0 15px var(--color-accent-soft))',
                        lineHeight: 0.8,
                        margin: 0,
                        letterSpacing: '0.05em'
                    }}>
                        HELLO
                    </h1>

                </motion.div>

                {/* Glow Layer (Ambilight) */}
                <motion.div
                    style={{
                        scale: glowScale,
                        borderRadius,
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '3836 / 1698',
                        maxHeight: '100vh',
                        zIndex: 0,
                        position: 'absolute',
                        transformOrigin: 'center center',
                        filter: 'blur(60px) brightness(1.5) saturate(2)',
                        opacity: 0.75
                    }}
                >
                    <video
                        src={`${import.meta.env.BASE_URL}assets/hero-reel.mp4?v=forced_refresh_1`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </motion.div>

                {/* Video Layer (Main) */}
                <motion.div
                    style={{
                        scale,
                        borderRadius,
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '3836 / 1698',
                        maxHeight: '100vh',
                        zIndex: 2,
                        transformOrigin: 'center center',
                        background: '#000',
                        overflow: 'hidden',
                        border: '1px solid #ffffff',
                        boxSizing: 'border-box'
                    }}
                >
                    <video
                        src={`${import.meta.env.BASE_URL}assets/hero-reel.mp4?v=forced_refresh_1`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </motion.div>

                <motion.div
                    className="scroll-indicator"
                    style={{ zIndex: 10 }}
                >
                    <ArrowDown size={32} color="#fff" strokeWidth={1.5} />
                </motion.div>

            </div>
        </div>
    )
}
export default Hero
