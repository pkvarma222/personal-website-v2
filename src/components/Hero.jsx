
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

                {/* Text Layer (Hollow, Above) */}
                <motion.div
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
                        fontWeight: 800,
                        color: 'transparent',
                        WebkitTextStroke: '1px var(--color-text-primary)',
                        filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.6)) drop-shadow(0 10px 20px rgba(0,0,0,1))',
                        lineHeight: 0.8,
                        margin: 0
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
                        src="/assets/hero-reel.mp4?v=forced_refresh_1"
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
                        src="/assets/hero-reel.mp4?v=forced_refresh_1"
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
