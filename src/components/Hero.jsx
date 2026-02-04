
import React, { useRef, useContext } from 'react'
import { ArrowDown } from 'lucide-react'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import { PageScrollContext } from './PageTransition'
import { resolveAssetPath } from '../utils/paths'
import '../styles/Hero.css'

const Hero = () => {
    // Track global window scroll from PageTransition context
    const contextScrollY = useContext(PageScrollContext)
    const fallbackScrollY = useMotionValue(0)
    const scrollY = contextScrollY || fallbackScrollY

    // The distance the user scrolls while the hero is sticky
    const stickyDistance = 500

    // Phase 1: Scaling and Hello Entrance (0 to stickyDistance)
    // Video scales down to final size by the end of stickyDistance
    const scale = useTransform(scrollY, [0, stickyDistance], [1, 0.4])
    const glowScale = useTransform(scale, s => s * 1.02)
    const borderRadius = useTransform(scrollY, [0, stickyDistance], ["0px", "40px"])
    const gridOpacity = useTransform(scrollY, [100, stickyDistance], [0, 0.05])
    const leakOpacity = useTransform(scrollY, [0, 300], [0.3, 0.1])

    // Hello text slides to middle by the end of stickyDistance
    const textY = useTransform(scrollY, [0, stickyDistance], ["100vh", "0vh"])
    const textOpacity = useTransform(scrollY, [0, 150, stickyDistance], [0, 1, 1])

    // Fill animation happens right at the end of the sticky phase
    const fillWidth = useTransform(scrollY, [stickyDistance - 150, stickyDistance], ["0%", "100%"])

    // Keep video centered during the sticky transition
    const videoY = useMotionValue("0vh")

    return (
        <motion.div className="hero-scroll-track" style={{ height: `calc(100vh + ${stickyDistance}px)`, position: 'relative', backgroundColor: '#0b0b0b' }}>
            <motion.div className="hero-sticky" style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0b0b0b'
            }}>
                {/* Cinematic Noise Overlay (Film Grain) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 15,
                    opacity: 0.4,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                    filter: 'url(#grainyNoise)'
                }} />

                {/* Technical Blueprint Grid */}
                <motion.div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    opacity: gridOpacity,
                    pointerEvents: 'none',
                    backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }} />

                {/* Dynamic Light Leaks */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        opacity: leakOpacity,
                        pointerEvents: 'none',
                        background: 'radial-gradient(circle at 20% 40%, rgba(139, 46, 27, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(239, 234, 215, 0.3) 0%, transparent 50%)',
                        filter: 'blur(80px)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* SVG Filter Definition for Noise */}
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <filter id="grainyNoise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                </svg>

                {/* Projector Gate (The Film Strip Effect) */}
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
                    <motion.h1 style={{
                        fontSize: '16.2vw',
                        fontFamily: 'var(--font-wide)',
                        fontWeight: 900,
                        color: 'transparent',
                        WebkitTextStroke: '4px var(--color-accent)',
                        paintOrder: 'stroke fill',
                        filter: 'drop-shadow(0 0 15px var(--color-accent-soft)) drop-shadow(0 0 2px rgba(0,0,0,0.1))',
                        lineHeight: 0.8,
                        margin: 0,
                        letterSpacing: '0.05em',
                        backgroundImage: 'linear-gradient(rgba(253, 252, 240, 0.5), rgba(253, 252, 240, 0.5))',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'left center',
                        backgroundSize: useTransform(fillWidth, v => `${v} 100%`),
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                    }}>
                        HELLO
                    </motion.h1>

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
                        opacity: 0.75,
                        y: videoY
                    }}
                >
                    <video
                        src={resolveAssetPath('assets/hero-reel.mp4?v=forced_refresh_1')}
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
                        backgroundColor: '#000',
                        overflow: 'hidden',
                        border: '1px solid #ffffff',
                        boxSizing: 'border-box',
                        y: videoY
                    }}
                >
                    <video
                        src={resolveAssetPath('assets/hero-reel.mp4?v=forced_refresh_1')}
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

            </motion.div>
        </motion.div>
    )
}
export default Hero
