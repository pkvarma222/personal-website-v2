import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { resolveAssetPath } from '../utils/paths';

const SienaStubCard = ({ item, index }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="siena-stub-card"
            style={{
                top: `calc(8vh + ${index * 16}px)`
            }}
        >
            {/* Background Image */}
            <div className="stub-image-container">
                <img
                    src={resolveAssetPath(item.image)}
                    alt={item.title}
                    className="stub-bg-image"
                />
            </div>

            {/* Top Right Acclaim Overlay */}
            {item.acclaim && item.acclaim.length > 0 && (
                <div className="stub-top-acclaim">
                    {item.acclaim.map((acclaimItem, idx) => (
                        <div className="top-acclaim-item" key={idx}>
                            <div className="top-stars">{acclaimItem.stars}</div>
                            <div className="top-quote">"{acclaimItem.quote}"</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Content Overlay */}
            <div className="stub-content">
                {/* Left Side: Main Info */}
                <div className="stub-main-info">
                    {item.titleImage ? (
                        <img
                            src={resolveAssetPath(item.titleImage)}
                            alt={item.title}
                            className="stub-title-image"
                        />
                    ) : (
                        <h2 className="stub-title">{item.title}</h2>
                    )}

                    <div className="stub-meta-rows">
                        <div className="meta-row">
                            <div className="meta-item">
                                <label>Role</label>
                                <span>{item.role || "Lead Designer"}</span>
                            </div>
                        </div>
                        <div className="meta-row split">
                            <div className="meta-item" style={{ visibility: item.year ? 'visible' : 'hidden' }}>
                                <label>Year</label>
                                <span>{item.year || "2024"}</span>
                            </div>
                            <div className="meta-item" style={{ visibility: item.duration ? 'visible' : 'hidden' }}>
                                <label>Duration</label>
                                <span>{item.duration || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Action */}
                <div className="stub-action-column">
                    {item.id && (
                        <button className="explore-btn" onClick={() => navigate(item.director ? `/film/${item.id}` : `/design/${item.id}`)}>
                            Explore <ArrowRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SienaStubCard;
