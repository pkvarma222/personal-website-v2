import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';
import '../styles/Preloader.css';

const Preloader = () => {
    const { progress, isLoading } = useLoading();
    const isReady = progress >= 100;

    // Get current date in "MMM YYYY" format
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    }).toUpperCase();

    // Determine cinematic status label (CAMERA/LIGHTS/ACTION)
    const getCinematicStatus = () => {
        if (progress < 30) return "SOUND";
        if (progress < 60) return "CAMERA";
        return "ACTION!";
    };

    // Play clap sound when ready
    React.useEffect(() => {
        if (isReady) {
            const audio = new Audio('/assets/audio/clap.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio playback blocked:", e));
        }
    }, [isReady]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="preloader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, delay: 0.6, ease: "easeInOut" }
                    }}
                >
                    <div className="clapperboard-container">
                        <div className="clapperboard">
                            {/* Top Clapper Part */}
                            <motion.div
                                className="clapper-top"
                                initial={{ rotate: 30 }}
                                animate={{
                                    rotate: isReady ? 0 : 30
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                    duration: 0.3
                                }}
                            >
                                <div className="clapper-stripes" />
                            </motion.div>

                            {/* Bottom Slate Part */}
                            <div className="clapper-bottom">
                                <div className="clapper-stripes bottom-stripes" />
                                <div className="slate-content">
                                    <div className="slate-row">
                                        <div className="slate-item">
                                            <span className="label">SCENE</span>
                                            <span className="value">08</span>
                                        </div>
                                        <div className="slate-item">
                                            <span className="label">TAKE</span>
                                            <span className="value">07</span>
                                        </div>
                                    </div>
                                    <div className="slate-row">
                                        <div className="slate-item full">
                                            <span className="label">DIRECTOR</span>
                                            <span className="value">M PRAMOD</span>
                                        </div>
                                    </div>
                                    <div className="slate-row">
                                        <div className="slate-item">
                                            <span className="label">DATE</span>
                                            <span className="value">{currentDate}</span>
                                        </div>
                                        <div className="slate-item">
                                            <span className="label">ROLL</span>
                                            <span className="value">A01</span>
                                        </div>
                                    </div>

                                    {/* Thin Progress Bar Integration */}
                                    <div className="slate-progress-container">
                                        <motion.div
                                            className="slate-progress-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                        <div className="cinematic-status">
                                            {getCinematicStatus()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            className="clapper-status"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* {isReady ? "SET_READY" : "BUFFER_INGEST..."} */}
                        </motion.div>
                    </div>

                    <div className="scanline-effect" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
