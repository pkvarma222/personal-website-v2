import React, { useState, useEffect } from 'react';
import { ScrubbedSplitText, ScrubbedReveal } from './ScrollReveal';
import '../styles/TravelVlogs.css';

const TravelVlogs = () => {
    const [vlogs, setVlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVlogs = async () => {
            try {
                const playlistUrl = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLkovMRyuaL5jv6KISIgyziwfVNbCKkWxR';
                const rssUrl = encodeURIComponent(playlistUrl);
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch YouTube feed');
                }

                const data = await response.json();

                if (data.status === 'ok' && data.items) {
                    const parsedVlogs = data.items.map(item => {
                        // Extract video ID from guid, which looks like "yt:video:H_dB8E4maZE"
                        const videoId = item.guid.replace('yt:video:', '');

                        return {
                            title: item.title,
                            link: item.link,
                            id: videoId
                        };
                    });

                    setVlogs(parsedVlogs);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (err) {
                console.error('Error fetching Travel Vlogs:', err);
                setError('Failed to load vlogs.');
            } finally {
                setLoading(false);
            }
        };

        fetchVlogs();
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
                    <span style={{ display: 'block' }}>
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
