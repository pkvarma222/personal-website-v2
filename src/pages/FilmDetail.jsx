import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowDown, ArrowLeft, ExternalLink, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { resolveAssetPath } from '../utils/paths';
import { FILMS } from '../data/films';
import '../styles/SienaGallery.css';

const FilmDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const film = FILMS.find(f => f.id.toString() === id.toString());
    const [imageError, setImageError] = React.useState(false);

    useEffect(() => {
        // Force scroll to top of the container
        const container = document.getElementById('film-detail-container');
        if (container) {
            container.scrollTop = 0;
        }
        setImageError(false); // Reset error state when ID changes
    }, [id]);

    if (!film) {
        return <div className="siena-theme" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Film not found</div>;
    }

    // Helper to render credit blocks
    const CreditBlock = ({ role, name, inverse = false }) => (
        <div style={{
            backgroundColor: inverse ? '#000' : 'transparent',
            color: inverse ? '#fff' : 'inherit',
            padding: '2rem',
            textAlign: 'center',
            border: inverse ? 'none' : '1px dashed #333',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px'
        }}>
            <div style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginBottom: '0.5rem',
                opacity: 0.7
            }}>{role}</div>
            <div style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-serif)',
                textTransform: 'uppercase',
                lineHeight: 1
            }}>{name}</div>
        </div>
    );

    return (
        <section className="siena-theme" style={{
            backgroundColor: '#F7F5F0',
            color: '#1a1a1a',
            minHeight: '100vh',
            paddingTop: '0',
            paddingBottom: '5rem',
            overflowX: 'hidden'
        }}>
            {/* Header / Nav */}
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%',
                padding: '2rem', display: 'flex', justifyContent: 'space-between', zIndex: 100, pointerEvents: 'none'
            }}>
                <Link to="/film" className="siena-header-link" style={{ pointerEvents: 'auto' }}>
                    <span className="siena-header-link-content">
                        ALL WORK
                    </span>
                </Link>

                <div style={{ pointerEvents: 'auto', display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => {
                            const section = document.getElementById('watch-film');
                            if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                            background: '#fff', border: '1px solid #000', borderRadius: '4px',
                            padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem',
                            boxShadow: '4px 4px 0px rgba(0,0,0,1)', cursor: 'pointer',
                            fontFamily: 'inherit'
                        }}
                    >
                        <img src={resolveAssetPath(film.image)} alt="" style={{ width: '24px', height: '24px', borderRadius: '2px', objectFit: 'cover' }} />
                        <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>WATCH FILM</span>
                        <ArrowDown size={14} />
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem' }}>

                {/* 1. Title Section (Top) */}
                <div style={{ textAlign: 'center', margin: '10rem 0 3rem 0' }}>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>{film.category} • {film.year}</div>
                    {(film.titleImage && !imageError) ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img
                                src={resolveAssetPath(film.titleImage)}
                                alt={film.title}
                                onError={() => setImageError(true)}
                                style={{
                                    height: '25vh',
                                    width: 'auto',
                                    maxWidth: '90vw',
                                    filter: 'brightness(0)',
                                    opacity: 0.9,
                                    marginBottom: '2rem',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    ) : (
                        <h1 style={{
                            fontSize: '10vw',
                            fontFamily: 'var(--font-serif)',
                            textTransform: 'uppercase',
                            lineHeight: 0.8,
                            marginBottom: '2rem'
                        }}>{film.title}</h1>
                    )}
                    <ArrowDown size={32} style={{ margin: '2rem auto 0 auto', display: 'block', opacity: 0.5 }} />
                </div>

                {/* Divider Line */}
                <div style={{ width: '100%', height: '1px', backgroundColor: '#000', marginBottom: '4rem' }}></div>

                {/* 2. Synopsis */}
                <div style={{ width: '100%', margin: '0 0 6rem 0', fontSize: '1.5rem', lineHeight: 1.6 }}>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '2rem' }}>Synopsis</h3>
                    {film.description}
                </div>

                {/* 3. Credits Grid */}
                <div style={{ marginBottom: '6rem' }}>
                    {/* Top line: Dynamic first credit from object, or fallback to Director */}
                    <div style={{ borderBottom: '1px solid #000' }}>
                        {film.credits && Object.entries(film.credits).length > 0 ? (
                            (() => {
                                const [role, name] = Object.entries(film.credits)[0];
                                return <CreditBlock role={role} name={name} inverse />;
                            })()
                        ) : (
                            <CreditBlock role="Director" name={film.director || "Mani PKV"} inverse />
                        )}
                    </div>
                    {/* Bottom line: All other credits */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        borderBottom: '1px dashed #333'
                    }}>
                        {film.credits && Object.entries(film.credits).slice(1).map(([role, name], idx) => (
                            <div key={idx} style={{
                                borderRight: '1px dashed #333',
                                borderBottom: '1px dashed #333'
                            }}>
                                <CreditBlock role={role} name={name} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Hero Video / Trailer */}
                <div id="watch-film" style={{ padding: '2rem 0', marginBottom: '6rem' }}>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '2rem' }}>Watch Film</h3>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16/9',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}>
                        {film.trailerUrl ? (
                            <iframe
                                src={film.trailerUrl}
                                title={film.title}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                <img src={resolveAssetPath(film.image)} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff'
                                }}>
                                    <Play size={60} fill="#E1251B" stroke="none" />
                                    <span style={{
                                        marginTop: '1rem', fontFamily: 'var(--font-serif)',
                                        textTransform: 'uppercase', letterSpacing: '0.1em',
                                        fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                                    }}>Watch Trailer</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div> {/* Close Content Container for Full Bleed Stills */}

            {/* 5. Stills Gallery (Film Reel - Full Bleed) */}
            {film.stills && film.stills.length > 0 && (
                <div style={{ marginBottom: '6rem', width: '100vw', background: '#000', padding: '3rem 0', overflow: 'hidden' }}>

                    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, color: '#fff' }}>Stills</h3>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <motion.div
                            style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}
                            animate={{ x: "-25%" }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 30
                            }}
                        >
                            {/* Duplicate 4 times to ensure enough length for scrolling */}
                            {[...film.stills, ...film.stills, ...film.stills, ...film.stills].map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt=""
                                    style={{
                                        height: '250px',
                                        width: 'auto',
                                        borderRadius: '2px',
                                        objectFit: 'cover',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            )}

            <div style={{ height: '20vh' }}></div>

        </section>
    );
};

export default FilmDetail;
