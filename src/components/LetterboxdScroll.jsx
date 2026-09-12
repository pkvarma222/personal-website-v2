import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import '../styles/LetterboxdScroll.css';

const LetterboxdScroll = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Physics
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);
    const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
    const x = useMotionValue(0);
    // Calculate container width deterministically
    const containerW = films.length > 0 ? (films.length * 200 + Math.max(0, films.length - 1) * 15 + 48) : 0;

    // Intuitive Reel Physics:
    // When main strip moves LEFT (-x), the spool moves RIGHT (+x) to simulate unwinding from the can.
    // The spool shows the UPCOMING films (shifted by 2 films so there is a 2-film gap before exit).
    // The array is reversed so higher index films enter from the left and exit to the right.
    const spoolX = useTransform(x, (val) => {
        if (containerW === 0) return 0;
        return 1050 - containerW - val;
    });

    // Make the sprockets inside the can move synchronously with the spool
    const spoolBgPosition = useTransform(spoolX, (val) => `${val}px 1px, ${val}px calc(100% - 1px)`);

    // Fade out the pull indicator as the user starts dragging
    const indicatorOpacity = useTransform(x, [0, -100], [1, 0]);

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
                    const parsedFilms = data.items.slice(0, 10).map(item => {
                        let title = item.title;
                        let rating = '';

                        if (title.includes(' - ')) {
                            const parts = title.split(' - ');
                            rating = parts.pop();
                            title = parts.join(' - ');
                        }

                        // Extract image from description CDATA since thumbnail is missing
                        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
                        const poster = imgMatch ? imgMatch[1] : item.thumbnail;

                        return {
                            title,
                            rating,
                            link: item.link,
                            poster: poster,
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

    // Calculate drag constraints deterministically based on film count
    useEffect(() => {
        if (!loading && films.length > 0) {
            // A film card is 200px wide, gap is 15px, padding is 48px (3rem)
            const containerW = films.length * 200 + Math.max(0, films.length - 1) * 15 + 48;

            // The container starts at margin-left: calc(100% - 470px).
            // So at x=0, its right edge is at 100% - 470px + containerW.
            // We want to stop it at 100% - 150px (which is EXACTLY the left edge of the spool).
            // This ensures the last film is 100% visible, but touches the can so it doesn't detach.
            // Solving for maxDragLeft: (100% - 470 + containerW) + maxDragLeft = 100% - 150
            // maxDragLeft = 320 - containerW
            // containerW now includes the 430px padding-right we added in CSS to maintain the 2-film buffer!
            const maxDragLeft = 320 - containerW;

            // Only allow dragging left if maxDragLeft is negative
            setDragConstraints({
                right: 0,
                left: Math.min(0, maxDragLeft)
            });
        }
    }, [films, loading]);

    if (error) {
        return null; // Fail silently or show error
    }

    return (
        <section className="letterboxd-section">
            <div className="letterboxd-header">
                <div className="letterboxd-label">My Recently Watched Films :</div>
            </div>

            {loading ? (
                <div className="letterboxd-loading">Loading films...</div>
            ) : (
                <div className="letterboxd-interactive-wrapper" ref={wrapperRef}>
                    <motion.div
                        className="letterboxd-pull-indicator"
                        style={{ opacity: indicatorOpacity }}
                    >
                        <span className="pull-arrow">←</span> PULL THE REEL TO EXPLORE
                    </motion.div>

                    {/* 3D Edge-on Film Reel Graphics (Horizontal) */}
                    <div className="edge-reel-top" />
                    <motion.div
                        className="edge-reel-spool"
                        style={{ backgroundPosition: spoolBgPosition }}
                    >
                        <motion.div
                            className="spool-inner-strip"
                            style={{ x: spoolX }}
                        >
                            {[...films].reverse().map((film) => (
                                <div key={`spool-${film.id}`} className="letterboxd-item" style={{ transform: 'scaleX(-1)' }}>
                                    <div className="letterboxd-card">
                                        {film.poster && (
                                            <img src={film.poster} alt={film.title} className="letterboxd-poster" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                    <div className="edge-reel-bottom" />

                    {/* Draggable Film Strip */}
                    <motion.div
                        className="letterboxd-scroll-container"
                        ref={containerRef}
                        drag="x"
                        dragConstraints={dragConstraints}
                        dragElastic={0.05}
                        dragTransition={{
                            power: 0.1,
                            timeConstant: 200,
                            bounceStiffness: 300,
                            bounceDamping: 30
                        }}
                        style={{ x }}
                        whileTap={{ cursor: "grabbing" }}
                    >
                        {films.map((film) => (
                            <div
                                key={film.id}
                                className="letterboxd-item"
                            >
                                <div className="letterboxd-card">
                                    {film.poster && (
                                        <img
                                            src={film.poster}
                                            alt={film.title}
                                            className="letterboxd-poster"
                                            loading="lazy"
                                            draggable="false"
                                        />
                                    )}
                                </div>
                                {film.rating && <div className="letterboxd-rating-below">{film.rating}</div>}
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default LetterboxdScroll;
