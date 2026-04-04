import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
    ArrowRight, Map, Eye, Compass, BookOpen,
    CheckCircle, Settings, Monitor, HeartPulse, Building, Coffee, Leaf, Palette,
    BarChart2, Globe, CalendarCheck, Lightbulb, Star, ChevronRight, GraduationCap,
    TrendingUp, Users, FileText
} from 'lucide-react';
import HeroBanner from '../components/layout/HeroBanner';
import './Home.css';

const Home: React.FC = () => {
    const { t } = useLanguage();

    const quickActions = [
        { title: t('home.quick_actions.pathways_title'), desc: t('home.quick_actions.pathways_desc'), icon: Map, link: "/pathway-finder", color: "blue" },
        { title: t('home.quick_actions.opportunities_title'), desc: t('home.quick_actions.opportunities_desc'), icon: Eye, link: "/opportunities", color: "teal" },
        { title: t('home.quick_actions.fields_title'), desc: t('home.quick_actions.fields_desc'), icon: Compass, link: "/career-fields", color: "amber" },
        { title: t('home.quick_actions.resources_title'), desc: t('home.quick_actions.resources_desc'), icon: BookOpen, link: "/resources", color: "violet" },
    ];

    const awarenessCards = [
        { text: t('home.why_awareness_1'), icon: GraduationCap },
        { text: t('home.why_awareness_2'), icon: TrendingUp },
        { text: t('home.why_awareness_3'), icon: Lightbulb },
        { text: t('home.why_awareness_4'), icon: CheckCircle }
    ];

    const careerFields = [
        { name: t('home.field_1'), icon: Settings, color: "#3B82F6" },
        { name: t('home.field_2'), icon: Monitor, color: "#6366F1" },
        { name: t('home.field_3'), icon: HeartPulse, color: "#EF4444" },
        { name: t('home.field_4'), icon: Building, color: "#F59E0B" },
        { name: t('home.field_5'), icon: Coffee, color: "#10B981" },
        { name: t('home.field_6'), icon: Leaf, color: "#22C55E" },
        { name: t('home.field_7'), icon: Palette, color: "#EC4899" }
    ];

    const stats = [
        { value: "50+", label: t('home.stats_fields'), icon: BarChart2 },
        { value: "100+", label: t('home.stats_opps'), icon: Users },
        { value: "9 Provinces", label: t('home.stats_coverage'), icon: Globe },
        { value: "Monthly", label: t('home.stats_updated'), icon: CalendarCheck }
    ];

    const insights = [
        { title: t('home.insight_1_title'), desc: t('home.insight_1_desc'), icon: Map },
        { title: t('home.insight_2_title'), desc: t('home.insight_2_desc'), icon: GraduationCap },
        { title: t('home.insight_3_title'), desc: t('home.insight_3_desc'), icon: TrendingUp }
    ];

    return (
        <div className="home-page">

            {/* ─── HERO BANNER ──────────────────────────────────── */}
            <HeroBanner />

            {/* ─── QUICK ACTIONS ────────────────────────────────── */}
            <section className="quick-section">
                <div className="container">
                    <div className="quick-grid">
                        {quickActions.map((a, i) => (
                            <Link key={i} to={a.link} className={`quick-card quick-card-${a.color}`}>
                                <div className="quick-card-icon">
                                    <a.icon size={26} />
                                </div>
                                <div className="quick-card-body">
                                    <h3>{a.title}</h3>
                                    <p>{a.desc}</p>
                                </div>
                                <ChevronRight className="quick-card-arrow" size={18} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── WHY CAREER AWARENESS ─────────────────────────── */}
            <section className="awareness-section">
                <div className="container">
                    <div className="section-label">
                        <Lightbulb size={16} /> Why It Matters
                    </div>
                    <h2 className="section-heading">{t('home.why_awareness_title')}</h2>
                    <p className="section-sub">{t('home.why_awareness_subtitle')}</p>

                    <div className="awareness-cards">
                        {awarenessCards.map((c, i) => (
                            <div key={i} className="awareness-card-premium">
                                <div className="ac-icon-wrap">
                                    <c.icon size={28} />
                                </div>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CAREER FIELDS ────────────────────────────────── */}
            <section className="fields-section">
                <div className="fields-section-bg" />
                <div className="container">
                    <div className="section-label">
                        <Compass size={16} /> Explore Fields
                    </div>
                    <h2 className="section-heading">{t('home.career_fields_title')}</h2>

                    <div className="fields-mosaic">
                        {careerFields.map((f, i) => (
                            <div key={i} className="field-tile" style={{ '--field-color': f.color } as React.CSSProperties}>
                                <div className="field-tile-icon">
                                    <f.icon size={30} />
                                </div>
                                <span>{f.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="fields-cta">
                        <Link to="/fields" className="cta-btn cta-btn-primary">
                            {t('home.btn_explore_fields')} <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── STATS ────────────────────────────────────────── */}
            <section className="stats-banner">
                <div className="container">
                    <div className="stats-row">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-item">
                                <div className="stat-icon-wrap">
                                    <s.icon size={28} />
                                </div>
                                <h3 className="stat-num">{s.value}</h3>
                                <p className="stat-lbl">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── INSIGHTS ─────────────────────────────────────── */}
            <section className="insights-section">
                <div className="container">
                    <div className="section-label">
                        <FileText size={16} /> Resources
                    </div>
                    <h2 className="section-heading">{t('home.insights_title')}</h2>

                    <div className="insights-cards">
                        {insights.map((ins, i) => (
                            <div key={i} className="insight-card-premium">
                                <div className="insight-number">0{i + 1}</div>
                                <div className="insight-icon-wrap">
                                    <ins.icon size={24} />
                                </div>
                                <h3>{ins.title}</h3>
                                <p>{ins.desc}</p>
                                <Link to="/resources" className="insight-read-link">
                                    Read More <ChevronRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="insights-cta">
                        <Link to="/resources" className="cta-btn cta-btn-outline">
                            {t('home.btn_all_resources')} <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── SUCCESS STORIES ──────────────────────────────── */}
            <section className="stories-section">
                <div className="container">
                    <div className="section-label">
                        <Star size={16} /> Stories
                    </div>
                    <h2 className="section-heading">{t('home.success_title')}</h2>

                    <div className="stories-grid">
                        <div className="story-card-premium">
                            <div className="story-stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="filled-star" />)}
                            </div>
                            <p className="story-quote">"{t('home.success_quote_1')}"</p>
                            <div className="story-author">
                                <div className="story-avatar">S</div>
                                <div>
                                    <strong>School Leaver</strong>
                                    <span>Sri Lanka</span>
                                </div>
                            </div>
                        </div>
                        <div className="story-card-premium">
                            <div className="story-stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="filled-star" />)}
                            </div>
                            <p className="story-quote">"{t('home.success_quote_2')}"</p>
                            <div className="story-author">
                                <div className="story-avatar">A</div>
                                <div>
                                    <strong>A/L Graduate</strong>
                                    <span>Sri Lanka</span>
                                </div>
                            </div>
                        </div>
                        <div className="story-cta-card">
                            <GraduationCap className="story-cta-icon" size={48} />
                            <h3>Your Story Starts Here</h3>
                            <p>Thousands of students found their path. Discover yours today.</p>
                            <Link to="/pathway-finder" className="cta-btn cta-btn-white">
                                Start Your Journey <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
