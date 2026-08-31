import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowLeft, ArrowDown } from 'lucide-react';
import { resolveAssetPath } from '../utils/paths';
import { FILMS } from '../data/films';
import '../styles/SienaGallery.css';

const LaurelBadge = ({ stars, quote }) => {
    const cleanQuote = quote ? quote.replace(/^"|"$/g, '') : '';
    return (
        <div className="film-detail-laurel-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justify: 'center',
            gap: '0.85rem',
            color: '#000',
            padding: '0.4rem 0.2rem'
        }}>
            {/* Left Laurel Branch from user's image */}
            <img
                src={resolveAssetPath('/assets/laurel-left.png')}
                alt=""
                style={{ height: '50px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />

            {/* Center Laurel Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: 1.2
                }}>
                    {stars}
                </span>
                {cleanQuote && (
                    <span style={{
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-wide), var(--font-sans)',
                        fontStyle: 'italic',
                        letterSpacing: '0.04em',
                        opacity: 0.9,
                        marginTop: '0.2rem'
                    }}>
                        "{cleanQuote}"
                    </span>
                )}
            </div>

            {/* Right Laurel Branch from user's image */}
            <img
                src={resolveAssetPath('/assets/laurel-right.png')}
                alt=""
                style={{ height: '50px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
        </div>
    );
};

const FilmDetail = () => {
    const { id } = useParams();
    const film = FILMS.find(f => f.id.toString() === id.toString());
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [id]);

    if (!film) {
        return (
            <div className="siena-theme" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F7F5F0' }}>
                Film not found
            </div>
        );
    }

    const creditEntries = film.credits ? Object.entries(film.credits) : [];
    const topCredit = creditEntries.length > 0 ? creditEntries[0] : ["DIRECTOR", film.director || "MANTHENA PRAMOD KUMAR VARMA"];
    const bottomCredits = creditEntries.length > 1 ? creditEntries.slice(1, 3) : [];

    return (
        <section className="film-detail-screenshot-layout">
            {/* Header Row */}
            <header className="film-detail-screenshot-header">
                <Link to="/film" className="siena-header-link film-detail-back-btn">
                    <span className="siena-header-link-content">
                        <ArrowLeft size={16} style={{ marginRight: '0.4rem' }} /> ALL WORK
                    </span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        className="film-detail-watch-btn"
                        onClick={() => {
                            const videoEl = document.getElementById('watch-video-section');
                            if (videoEl) videoEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                            background: '#fff', border: '1px solid #000', borderRadius: '4px',
                            padding: '0.4rem 0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                            boxShadow: '4px 4px 0px rgba(0,0,0,1)', cursor: 'pointer',
                            fontFamily: 'inherit'
                        }}
                    >
                        <img src={resolveAssetPath(film.image)} alt="" style={{ width: '20px', height: '20px', borderRadius: '2px', objectFit: 'cover' }} />
                        <span style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em' }}>WATCH FILM</span>
                        <ArrowDown size={14} />
                    </button>
                </div>
            </header>

            {/* Title Hero */}
            <div className="film-detail-screenshot-hero">
                <div className="film-detail-screenshot-meta">
                    {film.category || "SHORT"} • {film.year || "2022"}
                </div>
                {film.titleImage && !imageError ? (
                    <img
                        className="film-detail-screenshot-title-img"
                        src={resolveAssetPath(film.titleImage)}
                        alt={film.title}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <h1 className="film-detail-screenshot-title-text">
                        {film.title}
                    </h1>
                )}
            </div>

            {/* Divider Line */}
            <div className="film-detail-screenshot-divider"></div>

            {/* Middle Grid (Synopsis Left, Cast & Crew Right) */}
            <div className="film-detail-screenshot-mid">
                {/* Synopsis Left */}
                <div className="film-detail-screenshot-synopsis-col">
                    <div className="film-detail-screenshot-label">SYNOPSIS</div>
                    <div className="film-detail-screenshot-synopsis-text">
                        {film.description}
                    </div>

                    {/* Accolades placed directly below Synopsis as Film Festival Laurels */}
                    {film.acclaim && film.acclaim.length > 0 && (
                        <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
                            {film.acclaim.map((item, idx) => (
                                <LaurelBadge key={idx} stars={item.stars} quote={item.quote} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Cast & Crew Right (Matching Screenshot 2) */}
                <div className="film-detail-screenshot-credits-col">
                    <div className="film-detail-screenshot-label">CAST & CREW</div>
                    <div className="film-detail-screenshot-credits-wrapper">
                        {/* Top Full-Width Black Credit Cell */}
                        <div className="film-detail-screenshot-credit-top">
                            <div className="film-detail-screenshot-role">{topCredit[0]}</div>
                            <div className="film-detail-screenshot-name">{topCredit[1]}</div>
                        </div>

                        {/* Bottom Split 2-Column Dashed Cells */}
                        <div className="film-detail-screenshot-credit-bottom-grid">
                            {bottomCredits.map(([role, name], idx) => (
                                <div
                                    key={idx}
                                    className={`film-detail-screenshot-credit-cell ${idx === 0 ? 'left-cell' : ''}`}
                                >
                                    <div className="film-detail-screenshot-role">{role}</div>
                                    <div className="film-detail-screenshot-name">{name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stacked Sections (Top: Watch Video 16:9 Youtube proportions, Bottom: Full-width Gallery) */}
            <div className="film-detail-screenshot-bottom-stacked">
                {/* 1. Watch Film Video Card (Top: Centered 16:9 Youtube thumbnail proportions) */}
                <div id="watch-video-section" className="film-detail-screenshot-video-card-full">
                    {film.trailerUrl ? (
                        <iframe
                            src={film.trailerUrl}
                            title={film.title}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                    ) : (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <img
                                src={resolveAssetPath(film.image)}
                                alt={film.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </div>

                {/* 2. Gallery / Stills Card (Bottom: Full Width) */}
                <div className="film-detail-screenshot-stills-card-full">
                    {film.stills && film.stills.length > 0 ? (
                        <div style={{ display: 'flex', gap: '1.5rem', height: '100%', width: '100%', alignItems: 'center', overflowX: 'auto' }}>
                            {film.stills.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt={`Still ${idx + 1}`}
                                    style={{ height: '240px', width: 'auto', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 6px 15px rgba(0,0,0,0.3)' }}
                                />
                            ))}
                        </div>
                    ) : (
                        <img
                            src={resolveAssetPath("/assets/cinema-theatre.jpg")}
                            alt="Cinema theatre"
                            onError={(e) => { e.target.style.display = 'none'; }}
                            style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '12px', opacity: 0.85 }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default FilmDetail;
