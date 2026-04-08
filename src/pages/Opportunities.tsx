import React, { useState } from 'react';
import { Calendar, MapPin, Building, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Opportunities.css';

const Opportunities: React.FC = () => {
    const { t } = useLanguage();
    const [activeCategoryKey, setActiveCategoryKey] = useState('All');

    const CATEGORY_KEYS = ['All', 'IT', 'Engineering', 'Hospitality', 'Creative', 'Healthcare'];

    const getCategoriesMap = () => {
        const catMap: Record<string, string> = {};
        CATEGORY_KEYS.forEach(k => {
            catMap[k] = t(`opportunities.categories.${k}`);
        });
        return catMap;
    };

    const categoriesMap = getCategoriesMap();

    const getMockOpportunities = () => [
        {
            id: 1,
            title: t('opportunities.mock_data.1.title'),
            institute: t('opportunities.mock_data.1.institute'),
            location: t('opportunities.mock_data.1.location'),
            deadline: '2026-03-15',
            categoryKey: 'IT',
            type: 'Full-Time',
            status: 'urgent',
        },
        {
            id: 2,
            title: t('opportunities.mock_data.2.title'),
            institute: t('opportunities.mock_data.2.institute'),
            location: t('opportunities.mock_data.2.location'),
            deadline: '2026-04-01',
            categoryKey: 'Engineering',
            type: 'Full-Time',
            status: 'open',
        },
        {
            id: 3,
            title: t('opportunities.mock_data.3.title'),
            institute: t('opportunities.mock_data.3.institute'),
            location: t('opportunities.mock_data.3.location'),
            deadline: '2026-03-25',
            categoryKey: 'Hospitality',
            type: 'Part-Time',
            status: 'open',
        },
        {
            id: 4,
            title: t('opportunities.mock_data.4.title'),
            institute: t('opportunities.mock_data.4.institute'),
            location: t('opportunities.mock_data.4.location'),
            deadline: '2026-03-10',
            categoryKey: 'Creative',
            type: 'Full-Time',
            status: 'urgent',
        }
    ];

    const MOCK_OPPORTUNITIES = getMockOpportunities();

    const filteredOpportunities = MOCK_OPPORTUNITIES.filter(
        opp => activeCategoryKey === 'All' || opp.categoryKey === activeCategoryKey
    );

    return (
        <div className="container page-wrapper" style={{ paddingTop: '2rem' }}>
            <div className="page-header" style={{ paddingTop: '1rem' }}>
                <span className="section-label">Opportunities</span>
                <h1 className="section-title">{t('opportunities.title')}</h1>
                <p>{t('opportunities.subtitle')}</p>
            </div>

            <div className="filters-scroll-wrapper mb-8">
                <div className="filters-container">
                    {CATEGORY_KEYS.map(catKey => (
                        <button
                            key={catKey}
                            className={`filter-btn ${activeCategoryKey === catKey ? 'active' : ''}`}
                            onClick={() => setActiveCategoryKey(catKey)}
                        >
                            {categoriesMap[catKey]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="opportunities-grid">
                {filteredOpportunities.map(opp => (
                    <div key={opp.id} className="opportunity-card">
                        <div className="opp-header">
                            <span className={`status-badge ${opp.status}`}>
                                {t(`opportunities.status.${opp.status}`)}
                            </span>
                            <span className="category-badge">{categoriesMap[opp.categoryKey]}</span>
                        </div>

                        <h3 className="opp-title">{opp.title}</h3>

                        <div className="opp-meta-list">
                            <div className="opp-meta">
                                <Building size={16} />
                                <span>{opp.institute}</span>
                            </div>
                            <div className="opp-meta">
                                <MapPin size={16} />
                                <span>{opp.location}</span>
                            </div>
                            <div className="opp-meta">
                                <Calendar size={16} />
                                <span className={opp.status === 'urgent' ? 'text-danger fw-600' : ''}>
                                    {t('opportunities.deadline_prefix')}{new Date(opp.deadline).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="opp-footer mt-4 border-t pt-4 flex-between">
                            <span className="opp-type">{opp.type}</span>
                            <a href="#" className="btn-link">{t('opportunities.view_details')} <ArrowRight size={16} /></a>
                        </div>
                    </div>
                ))}

                {filteredOpportunities.length === 0 && (
                    <div className="empty-state">
                        <p>{t('opportunities.empty_state')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Opportunities;
