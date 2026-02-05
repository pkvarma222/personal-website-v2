
import React, { useRef, useContext, useState, useEffect } from 'react'
import { ArrowDown } from 'lucide-react'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import { PageScrollContext } from './PageTransition'
import { resolveAssetPath } from '../utils/paths'
import { useLoading } from '../context/LoadingContext'
import '../styles/Hero.css'

const Hero = () => {
    // Track global window scroll from PageTransition context
    const contextScrollY = useContext(PageScrollContext)
    const fallbackScrollY = useMotionValue(0)
    const scrollY = contextScrollY || fallbackScrollY

    const videoRef = useRef(null)
    const glowVideoRef = useRef(null)
    const canvasRef = useRef(null)
    const [dominantColor, setDominantColor] = useState('rgba(0,0,0,0)')

    const handleVideoSync = () => {
        const video = videoRef.current;
        const glowVideo = glowVideoRef.current;
        if (video && glowVideo) {
            // Mirror play/pause state
            if (video.paused && !glowVideo.paused) glowVideo.pause();
            if (!video.paused && glowVideo.paused) glowVideo.play().catch(() => { });

            const drift = video.currentTime - glowVideo.currentTime;

            // Strict time sync logic
            if (Math.abs(drift) > 0.05) {
                // Hard snap for large drifts
                glowVideo.currentTime = video.currentTime;
                glowVideo.playbackRate = video.playbackRate;
            } else if (Math.abs(drift) > 0.01) {
                // Smooth speed adjustment for tiny drifts
                // If background is behind (drift > 0), speed it up. If ahead, slow it down.
                glowVideo.playbackRate = video.playbackRate * (drift > 0 ? 1.05 : 0.95);
            } else {
                // Perfectly in sync
                glowVideo.playbackRate = video.playbackRate;
            }
        }
    };

    useEffect(() => {
        let requestId;
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext('2d', { medicalUsage: false, willReadFrequently: true });

        const syncAndExtract = () => {
            if (video.readyState >= 2) {
                // Extraction logic
                ctx.drawImage(video, 0, 0, 10, 10);
                const frame = ctx.getImageData(0, 0, 10, 10);
                const length = frame.data.length;
                let r = 0, g = 0, b = 0;
                for (let i = 0; i < length; i += 4) {
                    r += frame.data[i];
                    g += frame.data[i + 1];
                    b += frame.data[i + 2];
                }
                const count = length / 4;
                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);
                setDominantColor(`rgb(${r}, ${g}, ${b})`);

                // Continuous frame-level sync
                handleVideoSync();
            }

            if (video.requestVideoFrameCallback) {
                requestId = video.requestVideoFrameCallback(syncAndExtract);
            } else {
                requestId = requestAnimationFrame(syncAndExtract);
            }
        };

        if (video.requestVideoFrameCallback) {
            requestId = video.requestVideoFrameCallback(syncAndExtract);
        } else {
            requestId = requestAnimationFrame(syncAndExtract);
        }

        return () => {
            if (video.requestVideoFrameCallback) {
                video.cancelVideoFrameCallback(requestId);
            } else {
                cancelAnimationFrame(requestId);
            }
        };
    }, []);

    const { registerAsset, updateAssetProgress } = useLoading()

    React.useEffect(() => {
        registerAsset('hero-video')
    }, [])

    const handleVideoProgress = (e) => {
        const video = e.target
        if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1)
            const duration = video.duration
            if (duration > 0) {
                const percent = Math.round((bufferedEnd / duration) * 100)
                updateAssetProgress('hero-video', percent)
            }
        }
    }

    const handleVideoCanPlay = () => {
        updateAssetProgress('hero-video', 100);
        // Ensure initial sync once both are ready
        if (glowVideoRef.current && videoRef.current) {
            glowVideoRef.current.currentTime = videoRef.current.currentTime;
        }
    }

    // Mirroring events for instant response
    const onVideoPlay = () => glowVideoRef.current?.play().catch(() => { });
    const onVideoPause = () => glowVideoRef.current?.pause();
    const onVideoSeeking = () => {
        if (glowVideoRef.current && videoRef.current) {
            glowVideoRef.current.currentTime = videoRef.current.currentTime;
        }
    };

    // The distance the user scrolls while the hero is sticky
    const stickyDistance = 500

    // Phase 1: Scaling and Hello Entrance (0 to stickyDistance)
    // Video scales down to final size by the end of stickyDistance
    const scale = useTransform(scrollY, [0, stickyDistance], [1.0438, 0.4175])
    const bgScale = useTransform(scrollY, [0, stickyDistance], [2.5, 1])
    const glowScale = useTransform(scale, s => s * 1.02)
    const borderRadius = "0px"
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
                {/* Cinema Scene Stage - Groups background and video to scale together perfectly */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: 'max(100vw, 100vh * 1.77778)', // 16:9 aspect ratio (3840/2160)
                        height: 'max(100vh, 100vw * 0.5625)',
                        top: '50%',
                        left: '50%',
                        x: '-50%',
                        y: '-50%',
                        zIndex: 0,
                        scale: bgScale,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* Background Image */}
                    <img
                        src={resolveAssetPath('assets/cinema-theatre-3.jpg')}
                        alt=""
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            inset: 0
                        }}
                    />

                    {/* Dynamic Color Overlay (inside scene) */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 1,
                            backgroundColor: dominantColor,
                            mixBlendMode: 'overlay',
                            opacity: 0.8,
                            pointerEvents: 'none'
                        }}
                    />

                    {/* Precision-aligned Video Container */}
                    <div style={{
                        position: 'absolute',
                        left: '31.49%',
                        top: '35.36%',
                        width: '37.04%',
                        height: '29.28%',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Glow Layer (Ambilight) */}
                        <motion.div
                            style={{
                                width: '102%',
                                height: '102%',
                                position: 'absolute',
                                zIndex: 0,
                                filter: 'blur(48px) brightness(1.5) saturate(2)',
                                opacity: 0.45,
                            }}
                        >
                            <video
                                ref={glowVideoRef}
                                src={resolveAssetPath('assets/hero-reel.mp4?v=forced_refresh_1')}
                                autoPlay
                                loop
                                muted
                                playsInline
                                onProgress={handleVideoProgress}
                                onCanPlayThrough={handleVideoCanPlay}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </motion.div>

                        {/* Main Video Layer */}
                        <motion.div
                            style={{
                                width: '100%',
                                height: '100%',
                                zIndex: 2,
                                backgroundColor: '#000',
                                overflow: 'hidden',
                                boxSizing: 'border-box',
                                maskImage: 'linear-gradient(to right, transparent, black 1%, black 99%, transparent), linear-gradient(to bottom, transparent, black 1%, black 99%, transparent)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent, black 1%, black 99%, transparent), linear-gradient(to bottom, transparent, black 1%, black 99%, transparent)',
                                maskComposite: 'intersect',
                                WebkitMaskComposite: 'source-in'
                            }}
                        >
                            <video
                                ref={videoRef}
                                src={resolveAssetPath('assets/hero-reel.mp4?v=forced_refresh_1')}
                                autoPlay
                                loop
                                muted
                                playsInline
                                onPlay={onVideoPlay}
                                onPause={onVideoPause}
                                onSeeking={onVideoSeeking}
                                onSeeked={onVideoSeeking}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    filter: 'brightness(1.2) contrast(0.85) sepia(0.05)'
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Hidden Canvas for Color Extraction */}
                <canvas ref={canvasRef} width="10" height="10" style={{ display: 'none' }} />

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
