import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

/**
 * ScrollReveal Component
 * Replicates the "Hung Design Studio" feel with staggered text reveals and parallax.
 * 
 * Modes:
 * - 'text': Splits text into words/chars and reveals line-by-line (overflow hidden).
 * - 'fade-up': Standard slide up and fade in.
 * - 'zoom': Parallax zoom effect for images.
 * - 'parallax': Vertical parallax shift.
 */

export const SplitText = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" })

    // Ensure children is string
    const text = String(children);
    const words = text.split(" ");

    return (
        <span ref={ref} className={`inline-block ${className}`} style={{ overflow: 'hidden' }}>
            {words.map((word, i) => (
                <span key={i} className="inline-block" style={{ overflow: 'hidden', verticalAlign: 'top', marginRight: '0.25em' }}>
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : { y: "100%" }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1], // Expo ease for snappy feel
                            delay: delay + (i * 0.03) // Stagger per word
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}

export const Reveal = ({ children, width = "fit-content", delay = 0 }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" })

    return (
        <div ref={ref} style={{ overflow: 'hidden', width }}>
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    )
}

export const ParallaxImage = ({ src, alt, className }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Zoom out effect on scroll (1.2 -> 1.0)
    // Or Parallax shift y
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

    return (
        <div ref={ref} className={`overflow-hidden ${className}`} style={{ overflow: 'hidden' }}>
            <motion.div style={{ y, scale, width: '100%', height: '100%' }}>
                <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
        </div>
    )
}
