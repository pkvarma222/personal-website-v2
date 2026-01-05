import React from 'react';

const SienaCard = ({ film }) => {
    return (
        <div className="siena-card">
            <img
                src={film.image}
                alt={film.title}
                className="siena-card-image"
            />
            <div className="siena-card-content">
                <span className="siena-category">{film.category}</span>
                <h3 className="siena-title">{film.title}</h3>
                <div className="siena-meta">
                    <span>{film.year}</span>
                    <span>Director / Editor</span> {/* Placeholder role */}
                </div>
            </div>
        </div>
    );
};

export default SienaCard;
