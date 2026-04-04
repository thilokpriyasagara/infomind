import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, GraduationCap, Star, MapPin, Sparkles,
    ChevronLeft, ChevronRight, BookOpen, TrendingUp
} from 'lucide-react';
import './HeroBanner.css';

/* ─── Slide data ─────────────────────────────────────────── */
const slides = [
    {
        id: 1,
        badge: 'Sri Lanka\'s #1 Career Guidance Platform',
        headline: 'Ready for the\nnext step after',
        highlight: 'O/L & A/L?',
        sub: 'Discover clear pathways in university education, vocational training, and technical courses designed for every Sri Lankan student.',
        cta: { text: 'Start Your Journey', href: '/pathway-finder' },
        ctaSecondary: { text: 'View Opportunities', href: '/opportunities' },
        image: '/image1.png',
        accentColor: '#60A5FA',
        floatBadge1: { icon: '🎓', label: '10+ Career Fields', sub: 'Explored & Mapped' },
        floatBadge2: { icon: '⭐', label: '100% Free', sub: 'Trusted Guidance' },
    },
    {
        id: 2,
        badge: 'Your Future, Your Choice',
        headline: 'Unlock every\nopportunity',
        highlight: 'across Sri Lanka',
        sub: 'Stay updated on the latest course applications and deadlines.',
        cta: { text: 'Start Your Journey', href: '/pathway-finder' },
        ctaSecondary: { text: 'View Opportunities', href: '/opportunities' },
        image: '/image2.png',
        accentColor: '#34D399',
        floatBadge1: { icon: '🚀', label: '100+ Programs', sub: 'Islandwide' },
        floatBadge2: { icon: '🇱🇰', label: 'Made for Sri Lanka', sub: 'All Provinces' },
    },
    {
        id: 3,
        badge: 'Shape Your Tomorrow',
        headline: 'Find your\nperfect path',
        highlight: 'with confidence',
        sub: 'Step-by-step career guidance crafted for O/L and A/L leavers who want to make powerful, informed decisions about their future.',
        cta: { text: 'Start Your Journey', href: '/pathway-finder' },
        ctaSecondary: { text: 'View Opportunities', href: '/opportunities' },
        image: '/image3.png',
        accentColor: '#F59E0B',
        floatBadge1: { icon: '📚', label: 'Expert Guidance', sub: 'Step-by-step' },
        floatBadge2: { icon: '✅', label: 'Trusted Platform', sub: 'School Leavers' },
    },
];

const SLIDE_DURATION = 6000;

/* ─── Particle component ─────────────────────────────────── */
const Particles: React.FC<{ color: string }> = ({ color }) => (
    <div className="hb-particles" aria-hidden>
        {[...Array(20)].map((_, i) => (
            <span
                key={i}
                className="hb-particle"
                style={{
                    left: `${(i * 41 + 3) % 96}%`,
                    animationDelay: `${(i * 0.35) % 5}s`,
                    animationDuration: `${3.5 + (i % 4)}s`,
                    background: color,
                    width: i % 3 === 0 ? '6px' : '4px',
                    height: i % 3 === 0 ? '6px' : '4px',
                }}
            />
        ))}
    </div>
);

/* ─── Main component ─────────────────────────────────────── */
const HeroBanner: React.FC = () => {
    const [active, setActive] = useState(0);
    const [exiting, setExiting] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = (idx: number) => {
        if (idx === active || exiting) return;
        setExiting(true);
        setProgress(0);
        clearTimers();
        setTimeout(() => {
            setActive(idx);
            setExiting(false);
            startTimers();
        }, 500);
    };

    const goNext = () => goTo((active + 1) % slides.length);
    const goPrev = () => goTo((active - 1 + slides.length) % slides.length);

    const clearTimers = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
    };

    const startTimers = () => {
        setProgress(0);
        progressRef.current = setInterval(() => {
            setProgress(p => {
                if (p >= 100) return 0;
                return p + 100 / (SLIDE_DURATION / 50);
            });
        }, 50);
        timerRef.current = setInterval(goNext, SLIDE_DURATION);
    };

    useEffect(() => {
        startTimers();
        return clearTimers;
    }, [active]);

    const slide = slides[active];

    return (
        <section className="hb-root" aria-label="Hero banner">

            {/* ── Background layer ── */}
            <div className="hb-bg" />
            <div className="hb-grid" aria-hidden />
            <div className="hb-blob hb-blob-a" style={{ background: `radial-gradient(circle, ${slide.accentColor}33 0%, transparent 65%)` }} />
            <div className="hb-blob hb-blob-b" />
            <div className="hb-blob hb-blob-c" style={{ background: `radial-gradient(circle, ${slide.accentColor}22 0%, transparent 70%)` }} />

            <Particles color={slide.accentColor} />

            {/* ── Main content ── */}
            <div className={`hb-content container ${exiting ? 'hb-exit' : 'hb-enter'}`}>

                {/* TEXT SIDE */}
                <div className="hb-text">
                    {/* Badge */}
                    <div className="hb-badge">
                        <Sparkles size={13} />
                        {slide.badge}
                    </div>

                    {/* Headline */}
                    <h1 className="hb-headline">
                        {slide.headline.split('\n').map((line, i) => (
                            <span key={i} className="hb-line" style={{ animationDelay: `${i * 0.12}s` }}>
                                {line}
                            </span>
                        ))}
                        <span className="hb-highlight" style={{ color: slide.accentColor }}>
                            {slide.highlight}
                        </span>
                    </h1>

                    {/* Sub */}
                    <p className="hb-sub">{slide.sub}</p>

                    {/* Stats strip */}
                    <div className="hb-stats">
                        <div className="hb-stat">
                            <GraduationCap size={16} className="hb-stat-icon" />
                            <span>50+ Career Fields</span>
                        </div>
                        <div className="hb-stat-divider" />
                        <div className="hb-stat">
                            <MapPin size={16} className="hb-stat-icon" />
                            <span>All 9 Provinces</span>
                        </div>
                        <div className="hb-stat-divider" />
                        <div className="hb-stat">
                            <Star size={16} className="hb-stat-icon" />
                            <span>100% Free</span>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="hb-actions">
                        <Link to={slide.cta.href} className="hb-btn hb-btn-primary" style={{ boxShadow: `0 8px 28px ${slide.accentColor}55` }}>
                            {slide.cta.text}
                            <ArrowRight size={18} />
                        </Link>
                        <Link to={slide.ctaSecondary.href} className="hb-btn hb-btn-ghost">
                            {slide.ctaSecondary.text}
                        </Link>
                    </div>
                </div>

                {/* IMAGE SIDE */}
                <div className="hb-visual">
                    {/* Glow ring */}
                    <div className="hb-glow-ring" style={{ borderColor: `${slide.accentColor}55` }} />
                    <div className="hb-glow-ring hb-glow-ring-2" style={{ borderColor: `${slide.accentColor}22` }} />

                    {/* Rotating orbit dots */}
                    <div className="hb-orbit">
                        {[0, 1, 2, 3].map(i => (
                            <span key={i} className="hb-orbit-dot" style={{ background: slide.accentColor, animationDelay: `${i * 0.25}s` }} />
                        ))}
                    </div>

                    {/* Background subject cards scrolling behind image */}
                    <div className="hb-ribbon-wrap" aria-hidden>
                        <div className="hb-ribbon-track">
                            {[BookOpen, GraduationCap, TrendingUp, Star, BookOpen, GraduationCap, TrendingUp, Star].map((Icon, i) => (
                                <div key={i} className="hb-ribbon-chip" style={{ borderColor: `${slide.accentColor}44` }}>
                                    <Icon size={16} style={{ color: slide.accentColor }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main student image */}
                    <img
                        src={slide.image}
                        alt="student"
                        className={`hb-image ${exiting ? 'hb-img-out' : 'hb-img-in'}`}
                    />

                    {/* Floating badge top-left */}
                    <div className="hb-float-badge hb-float-tl">
                        <span className="hb-float-emoji">{slide.floatBadge1.icon}</span>
                        <div>
                            <strong>{slide.floatBadge1.label}</strong>
                            <span>{slide.floatBadge1.sub}</span>
                        </div>
                    </div>

                    {/* Floating badge bottom-right */}
                    <div className="hb-float-badge hb-float-br" style={{ borderColor: `${slide.accentColor}55` }}>
                        <span className="hb-float-emoji">{slide.floatBadge2.icon}</span>
                        <div>
                            <strong>{slide.floatBadge2.label}</strong>
                            <span>{slide.floatBadge2.sub}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Navigation ── */}
            <div className="hb-nav">
                {/* Prev / Next */}
                <button className="hb-arrow hb-arrow-prev" onClick={goPrev} aria-label="Previous slide">
                    <ChevronLeft size={20} />
                </button>

                {/* Dots + progress */}
                <div className="hb-dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`hb-dot ${i === active ? 'hb-dot-active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        >
                            {i === active && (
                                <span className="hb-dot-progress" style={{ width: `${progress}%`, background: slide.accentColor }} />
                            )}
                        </button>
                    ))}
                </div>

                <button className="hb-arrow hb-arrow-next" onClick={goNext} aria-label="Next slide">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* ── Scroll indicator ── */}
            <div className="hb-scroll-hint" aria-hidden>
                <div className="hb-scroll-mouse">
                    <div className="hb-scroll-wheel" />
                </div>
                <span>Scroll</span>
            </div>

            {/* ── Bottom gradient fade ── */}
            <div className="hb-fade-bottom" />
        </section>
    );
};

export default HeroBanner;
