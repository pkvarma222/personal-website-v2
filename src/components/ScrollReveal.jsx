import React, { useRef, useContext } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { PageScrollContainerContext } from './PageTransition'

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

export const ScrubbedSplitText = ({ children, className = "", offset = ["start 85%", "start 50%"] }) => {
    const ref = useRef(null)
    const containerRef = useContext(PageScrollContainerContext)
    const { scrollYProgress } = useScroll({
        target: ref,
        container: containerRef,
        offset: offset
    })

    const text = String(children);
    const words = text.split(" ");

    return (
        <span ref={ref} className={`inline-block ${className}`} style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

                return (
                    <span key={i} className="inline-block" style={{ overflow: 'hidden', verticalAlign: 'top', marginRight: '0.25em', paddingBottom: '0.1em' }}>
                        <motion.span
                            style={{ opacity, y, display: 'inline-block' }}
                        >
                            {word}
                        </motion.span>
                    </span>
                )
            })}
        </span>
    )
}

export const ScrubbedReveal = ({ children, width = "100%", offset = ["start 70%", "start 30%"] }) => {
    const ref = useRef(null)
    const containerRef = useContext(PageScrollContainerContext)
    const { scrollYProgress } = useScroll({
        target: ref,
        container: containerRef,
        offset: offset
    })

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], ["50px", "0px"]);

    return (
        <motion.div ref={ref} style={{ opacity, y, width, overflow: 'hidden' }}>
            {children}
        </motion.div>
    )
}

export const Reveal = ({ children, width = "100%", delay = 0 }) => {
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
    const containerRef = useContext(PageScrollContainerContext)
    const { scrollYProgress } = useScroll({
        target: ref,
        container: containerRef,
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
