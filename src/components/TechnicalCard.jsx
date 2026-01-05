import React from 'react';
import '../styles/TechnicalCard.css';

const TechnicalCard = ({ film }) => {
    return (
        <div className="tech-card">
            <div className="tech-card-header">
                <span className="tech-title">{film.title.toUpperCase()}</span>
                <span className="tech-meta">
                    {film.category.toUpperCase()}, {film.year}
                </span>
            </div>
            <div className="tech-media">
                <img src={film.image} alt={film.title} />
            </div>
        </div>
    );
};

export default TechnicalCard;
