import React, { useState, useEffect } from 'react';
import './Zone1.css';

// Zone1 events API base URL, set in .env (mounted in server.js via
// app.use('/api/zone1', zone1Routes)).
const EVENTS_ENDPOINT = import.meta.env.VITE_ZONE1_API_BASE;

// Clubs that can host a Zone1 event. `match` is compared against each
// event's `clubName` field (case-insensitively); `label` is the short text
// shown on the filter tab.
const CLUBS = [
    { label: 'CSEA', match: 'Computer Science and Engineering Association (CSEA)' },
    { label: 'GitHub Campus Club', match: 'GitHub Campus Club' },
    { label: 'The Eye', match: 'The Eye' },
];

export default function Zone1() {
    const [allItems, setAllItems] = useState([]);
    const [items, setItems] = useState([]);
    const [activeClub, setActiveClub] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sliderClass, setSliderClass] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function fetchEvents() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(EVENTS_ENDPOINT);
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }
                const data = await res.json();

                // Normalize backend documents to the shape the carousel expects.
                // Backend schema (models/zone1.js) uses `eventName` / `photo`,
                // while the carousel UI historically expected `topic` / an
                // /img/zone1/{id}.png asset. Map with sensible fallbacks so the
                // component keeps working regardless of which fields are set.
                const normalized = (Array.isArray(data) ? data : []).map(ev => ({
                    id: ev.id,
                    category: ev.category,
                    title: ev.title,
                    topic: ev.eventName || ev.title,
                    description: ev.description,
                    image: ev.photo || `/img/zone1/${ev.id}.png`,
                    clubName: ev.clubName,
                    websiteLink: ev.websiteLink,
                    date: ev.date,
                    video: ev.video,
                    specifications: Array.isArray(ev.specifications) ? ev.specifications : [],
                }));

                if (!cancelled) {
                    setAllItems(normalized);
                    setItems(normalized);
                }
            } catch (err) {
                console.error('Failed to fetch Zone1 events:', err);
                if (!cancelled) {
                    setError('Could not load events. Please try again later.');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchEvents();
        return () => { cancelled = true; };
    }, []);

    const handleNext = () => {
        if (isAnimating || items.length === 0) return;
        setIsAnimating(true);
        setSliderClass('next');
        setItems(prev => {
            const newItems = [...prev];
            const first = newItems.shift();
            newItems.push(first);
            return newItems;
        });
        setTimeout(() => {
            setSliderClass('');
            setIsAnimating(false);
        }, 1200); // Wait for transition
    };

    const handlePrev = () => {
        if (isAnimating || items.length === 0) return;
        setIsAnimating(true);
        setSliderClass('prev');
        setItems(prev => {
            const newItems = [...prev];
            const last = newItems.pop();
            newItems.unshift(last);
            return newItems;
        });
        setTimeout(() => {
            setSliderClass('');
            setIsAnimating(false);
        }, 1200); // Wait for transition
    };

    const handleSeeMore = () => {
        setSliderClass('showDetail');
    };

    const handleBack = () => {
        setSliderClass('');
    };

    const handleFilterClub = (club) => {
        if (isAnimating) return;
        setActiveClub(club);
        setSliderClass('');
        if (club === 'All') {
            setItems(allItems);
        } else {
            setItems(allItems.filter(
                item => (item.clubName || '').toLowerCase() === club.match.toLowerCase()
            ));
        }
    };

    if (loading) {
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text)' }}>
                Loading events…
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text)' }}>
                {error}
            </div>
        );
    }

    if (allItems.length === 0) {
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text)' }}>
                No events found.
            </div>
        );
    }

    return (
        <div style={{width: '100%', height: 'calc(100vh - 70px)', overflow: 'hidden', position: 'relative', background: 'var(--bg)'}}>
            <div className="zone1-club-filters" style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '16px 0 0', position: 'relative', zIndex: 100, flexWrap: 'wrap' }}>
                {['All', ...CLUBS].map(club => {
                    const label = club === 'All' ? 'All' : club.label;
                    const isActive = activeClub === 'All' ? club === 'All' : (club !== 'All' && activeClub.label === club.label);
                    return (
                        <button
                            key={label}
                            onClick={() => handleFilterClub(club)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '999px',
                                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                                background: isActive ? 'var(--accent)' : 'transparent',
                                color: isActive ? '#fff' : 'var(--text)',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
            {items.length === 0 ? (
                <div style={{ width: '100%', height: 'calc(100% - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>
                    No events found for {activeClub === 'All' ? 'All' : activeClub.label}.
                </div>
            ) : (
            <div className={`zone1-carousel ${sliderClass}`}>
                <div className="list">
                    {items.map((item) => {
                        return (
                            <div className="item" key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <div className="introduce">
                                    <div className="title" style={{color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase'}}>{item.category}</div>
                                    <div className="topic" style={{color: 'var(--text-h)'}}>{item.topic}</div>
                                    <div className="des" style={{color: 'var(--text)'}}>{item.description}</div>
                                    <button className="seeMore" onClick={handleSeeMore} style={{color: 'var(--accent)', borderColor: 'var(--accent)'}}>
                                        SEE MORE &#8599;
                                    </button>
                                </div>
                                <div className="detail">
                                    <div className="title" style={{color: 'var(--text-h)'}}>{item.title}</div>
                                    <div className="des" style={{color: 'var(--text)'}}>{item.description}</div>
                                    <div className="specifications" style={{color: 'var(--text)', borderColor: 'var(--border)'}}>
                                        {item.specifications.map((spec, i) => (
                                            <div key={i}>
                                                <p style={{color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em'}}>{spec.label}</p>
                                                <p style={{color: 'var(--text-h)', fontWeight: 800}}>{spec.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="checkout">
                                        <button style={{color: 'var(--text-h)', borderColor: 'var(--border)', background: '#fff', fontWeight: 700}}>REGISTER</button>
                                        <button style={{backgroundColor: 'var(--accent)', color: '#fff', border: 'none', fontWeight: 700, boxShadow: '0 4px 14px rgba(37,99,235,0.3)'}}>SCHEDULE</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="arrows">
                    <button id="prev" onClick={handlePrev}>&lt;</button>
                    <button id="next" onClick={handleNext}>&gt;</button>
                    <button id="back" onClick={handleBack} style={{color: 'var(--accent)', borderColor: 'var(--accent)'}}>See All Highlights &#8599;</button>
                </div>
            </div>
            )}
        </div>
    );
}