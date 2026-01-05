import React from 'react';

const FilmListItem = ({ film, onHover }) => {
    return (
        <div
            className="film-list-item"
            onMouseEnter={() => onHover(film.id)}
            onMouseLeave={() => onHover(null)}
        >
            <div className="film-item-content">
                <span className="film-year">{film.year}</span>
                <h3 className="film-title">{film.title}</h3>
                <span className="film-category">{film.category}</span>
            </div>
        </div>
    );
};

export default FilmListItem;
