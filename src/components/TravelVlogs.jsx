import React, { useState, useEffect } from 'react';
import { ScrubbedSplitText, ScrubbedReveal } from './ScrollReveal';
import '../styles/TravelVlogs.css';

const TravelVlogs = () => {
    const [vlogs, setVlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // YouTube deprecated playlist_id in RSS feeds, and rss2json no longer works for them.
        // Hardcoding the playlist video IDs to ensure the section always loads successfully.
        const playlistVlogs = [
            { id: 'H_dB8E4maZE', title: 'Travel Vlog 1' },
            { id: 'yBtWvyBkgOQ', title: 'Travel Vlog 2' },
            { id: 'sVVREKZwwMo', title: 'Travel Vlog 3' },
            { id: '3UZq4YPSr-8', title: 'Travel Vlog 4' },
            { id: 'Yf5piNpWbbE', title: 'Travel Vlog 5' },
            { id: 'xmOJeirAAdg', title: 'Travel Vlog 6' },
            { id: '4HpACPhwYf8', title: 'Travel Vlog 7' },
            { id: '58BFljy5BuI', title: 'Travel Vlog 8' },
            { id: 'DkMFFxEKrwY', title: 'Travel Vlog 9' },
            { id: 'JF6qqUNeVPY', title: 'Travel Vlog 10' }
        ];
        
        setVlogs(playlistVlogs);
        setLoading(false);
    }, []);

    if (error) {
        return null; // Fail silently or show error
    }

    return (
        <section className="vlogs-section">
            <div className="vlogs-header">
                <h2 className="vlogs-title">
                    <span style={{ display: 'block', fontSize: '0.55em', opacity: 0.9, letterSpacing: '0.15em', marginBottom: '0.2em' }}>
                        <ScrubbedSplitText offset={["start 85%", "start 60%"]}>I also made a few</ScrubbedSplitText>
                    </span>
                    <span style={{ display: 'block', color: 'var(--color-accent)' }}>
                        <ScrubbedSplitText offset={["start 65%", "start 40%"]}>travel vlogs</ScrubbedSplitText>
                    </span>
                </h2>
            </div>

            {loading ? (
                <div className="vlogs-loading">Loading vlogs...</div>
            ) : (
                <ScrubbedReveal>
                    <div className="vlogs-scroll-container">
                        {vlogs.map((vlog) => (
                            <div key={vlog.id} className="vlog-card">
                                <iframe
                                    className="vlog-iframe"
                                    src={`https://www.youtube.com/embed/${vlog.id}`}
                                    title={vlog.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </ScrubbedReveal>
            )}
        </section>
    );
};

export default TravelVlogs;
