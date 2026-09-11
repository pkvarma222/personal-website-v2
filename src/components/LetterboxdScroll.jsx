import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import '../styles/LetterboxdScroll.css';

const LetterboxdScroll = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const rssUrl = encodeURIComponent('https://letterboxd.com/mpkv/rss/');
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch Letterboxd feed');
                }

                const data = await response.json();

                if (data.status === 'ok' && data.items) {
                    // Parse the items to extract title, rating, and poster
                    const parsedFilms = data.items.map(item => {
                        // Title usually looks like "Movie Name, 2024 - ★★★★"
                        // Or just "Movie Name, 2024" if no rating
                        let title = item.title;
                        let rating = '';

                        if (title.includes(' - ')) {
                            const parts = title.split(' - ');
                            rating = parts.pop(); // Get the last part (the stars)
                            title = parts.join(' - '); // Rejoin the rest in case title has hyphens
                        }

                        return {
                            title,
                            rating,
                            link: item.link,
                            poster: item.thumbnail,
                            id: item.guid || item.link
                        };
                    });

                    setFilms(parsedFilms);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (err) {
                console.error('Error fetching Letterboxd:', err);
                setError('Failed to load recent films.');
            } finally {
                setLoading(false);
            }
        };

        fetchFilms();
    }, []);

    if (error) {
        return null; // Fail silently or show error
    }

    return (
        <section className="letterboxd-section">
            <div className="letterboxd-header">
                <div className="letterboxd-label">I Recently Watched These Films :</div>
            </div>

            {loading ? (
                <div className="letterboxd-loading">Loading films...</div>
            ) : (
                <div className="letterboxd-scroll-container">
                    {films.map((film) => (
                        <a
                            key={film.id}
                            href={film.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="letterboxd-item"
                        >
                            <div className="letterboxd-card">
                                {film.poster && (
                                    <img
                                        src={film.poster}
                                        alt={film.title}
                                        className="letterboxd-poster"
                                        loading="lazy"
                                    />
                                )}
                                <div className="letterboxd-info">
                                    <h3 className="letterboxd-title">{film.title}</h3>
                                </div>
                            </div>
                            {film.rating && <div className="letterboxd-rating-below">{film.rating}</div>}
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
};

export default LetterboxdScroll;
