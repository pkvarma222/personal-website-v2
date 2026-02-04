import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';
import '../styles/Preloader.css';

const Preloader = () => {
    const { progress, isLoading } = useLoading();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="preloader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                >
                    <div className="preloader-content">
                        <div className="preloader-header">
                            <span className="technical-mark">INITIALIZING_V_REEL</span>
                            <span className="status-label">EDIT SUITE READY</span>
                        </div>

                        <div className="progress-container">
                            <div className="progress-track">
                                <motion.div
                                    className="progress-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <div className="progress-details">
                                <span className="percentage">{progress}%</span>
                                <span className="loading-text">SYNCING_ASSETS</span>
                            </div>
                        </div>

                        <div className="preloader-footer">
                            <div className="scanline-effect" />
                            <div className="technical-data">
                                <span>SYSTEM: ARCHIVAL_NOIR</span>
                                <span>FPS: 24.00</span>
                                <span>MODE: CINEMATIC</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
