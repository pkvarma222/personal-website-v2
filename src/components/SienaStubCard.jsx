import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { resolveAssetPath } from '../utils/paths';

const SienaStubCard = ({ film, index }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="siena-stub-card"
            style={{
                top: `${index * 10}px`
            }}
        >
            {/* Background Image */}
            <div className="stub-image-container">
                <img
                    src={resolveAssetPath(film.image)}
                    alt={film.title}
                    className="stub-bg-image"
                />
            </div>

            {/* Ticket Badge REMOVED - it's now fixed in parent */}

            {/* Content Overlay */}
            <div className="stub-content">
                {/* Left Side: Main Info */}
                <div className="stub-main-info">
                    <span className="stub-category">{film.category}</span>
                    {film.titleImage ? (
                        <img
                            src={resolveAssetPath(film.titleImage)}
                            alt={film.title}
                            className="stub-title-image"
                        />
                    ) : (
                        <h2 className="stub-title">{film.title}</h2>
                    )}

                    <div className="stub-meta-grid">
                        <div className="meta-item">
                            <label>Director</label>
                            <span>{film.director || "Unknown"}</span>
                        </div>
                        <div className="meta-item">
                            <label>Year</label>
                            <span>{film.year}</span>
                        </div>
                        <div className="meta-item">
                            <label>Role</label>
                            <span>{film.role || "Creative"}</span>
                        </div>
                        <div className="meta-item">
                            <label>Duration</label>
                            <span>{film.duration || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Acclaim & Action */}
                <div className="stub-acclaim-column">
                    {film.acclaim && film.acclaim.map((item, idx) => (
                        <div className="acclaim-item" key={idx}>
                            <div className="stars">{item.stars}</div>
                            <div className="quote">"{item.quote}"</div>
                        </div>
                    ))}

                    <button className="explore-btn" onClick={() => navigate(`/film/${film.id}`)}>
                        Explore <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default SienaStubCard;
