import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './PathwayFinder.css';

type Step = 1 | 2 | 3 | 4;
type ExamLevel = 'OL' | 'AL' | '';
type OLResult = 'passed' | 'some' | 'failed' | '';

// ── OL Failed / Some courses ─────────────────────────────────────────────
const NAITA_COURSES_FAILED = [
    'Tailor',
    'Supermarket Customer Service',
    'Hair Dresser',
    'Plumber',
    'Construction Craftsman',
    'Plant Nursery Development Assistant',
];

const VTA_COURSES_FAILED = [
    'Aluminium Fabrication with Interior Decoration',
    'Apparel Design Technician',
    'Baker / Commis I (Pastry & Bakery)',
    'Beautician',
    'Child Caregiver',
    'Fabricator (Metal)',
    'Hair Dresser',
    'Industrial Sewing Machine Operator',
    'Landscaping Technician',
    'Mobile Phone Repairer',
    'Professional Cookery (Commis)',
    'Automobile Electrician',
    'Motorcycle Technician',
    'Three Wheeler Mechanic',
    'Assistant Food & Beverage Associate',
    'Jewellery Stone Setter',
    'Tailor',
    'Welder',
    'Plumber',
];

const KOREAN_TECH_COURSES_FAILED = [
    'Automobile Painter',
    'Baker',
];

// ── OL Passed courses ────────────────────────────────────────────────────
const AL_STREAMS = [
    'Mathematics Stream',
    'Biology Stream',
    'Art Stream',
    'Commerce Stream',
    'Technology Stream',
];

const PROF_QUAL_COURSES = [
    'AAT (Association of Accounting Technicians)',
    'CIMA (Chartered Institute of Management Accountants)',
];

const NAITA_COURSES_PASSED = [
    'Automobile Mechanic',
    'Welder',
    'Tailor',
    'Professional Cookery',
    'Solar Photovoltaic Systems Technician',
    'Beautician',
    'Electrician',
    'Care Giver',
    'Preschool Teacher',
    'ICT Technician',
    'Graphic Designer',
    'Supermarket Customer Service',
    'Hair Dresser',
    'Plumber',
    'Automobile Air Conditioning Mechanic',
    'Computer Hardware Technician',
    'Field Assistant',
    'Construction Craftsman',
    'Plant Nursery Development Assistant',
];

const VTA_COURSES_PASSED = [
    'Aluminium Fabrication with Interior Decoration – NVQ IV',
    'Automobile Air Conditioning Technician – NVQ IV',
    'Automobile Technician – NVQ IV',
    'Electrician – NVQ IV',
    'Graphic Designer – NVQ IV',
    'Information and Communication Technology Technician – NVQ IV',
    'Pattern Maker',
    'Solar Photovoltaic Systems Technician',
    'Apparel Design Technician – NVQ IV',
    'Baker / Commis I (Pastry & Bakery) – NVQ IV',
    'Beautician – NVQ IV',
    'Child Caregiver – NVQ IV',
    'Fabricator (Metal) – NVQ IV',
    'Hair Dresser – NVQ III',
    'Industrial Sewing Machine Operator – NVQ IV',
    'Landscaping Technician – NVQ III',
    'Mobile Phone Repairer – NVQ IV',
    'Professional Cookery (Commis) – NVQ IV',
    'Automobile Electrician – NVQ IV',
    'Motorcycle Technician – NVQ IV',
    'Three Wheeler Mechanic – NVQ III',
    'Assistant Food & Beverage Associate – NVQ III',
    'Jewellery Stone Setter – NVQ IV',
    'Secretary (Secretarial Practices) – NVQ IV',
    'Electronic Appliances Technician – NVQ IV',
    'Tailor – NVQ IV',
    'Computer Hardware Technician with CISCO IT Essentials / A+ – NVQ IV',
    'Welder – NVQ IV',
    'Plumber – NVQ IV',
    'Refrigeration & Air Conditioning Technician',
];

const GERMAN_TECH_COURSES = [
    'Automobile Mechanic – NVQ III',
    'Diesel Mechanic – NVQ III',
    'Electrician – NVQ IV',
    'Machinist – NVQ III',
    'Millwright Fitter',
    'Motor Vehicle Body Repair & Painter',
    'Power Electrician',
    'Refrigeration & Air Conditioning Mechanic',
    'Welder',
    'Industrial Mechatronic Technician',
];

const KOREAN_TECH_COURSES_PASSED = [
    'Electrician (NVQ 3 or 4)',
    'Pneumatic Technician (NVQ 3 or 4)',
    'Machinist (NVQ 3 or 4)',
    'Welding (NVQ 3 or 4)',
    'ICT Technician (NVQ 3 or 4)',
    'Draftsperson (NVQ 3 or 4)',
    'Computer Application Assistant (NVQ 3 or 4)',
    'Industrial Electronic Technician (NVQ 3 or 4)',
    'Robotics Basic Programming (NVQ 3 or 4)',
];

// ── AL courses ────────────────────────────────────────────────────────
const AL_KOREAN_TECH_COURSES = [
    'Automation and Robotics Technology – NVQ VI',
    'Electronic Technology – NVQ VI',
    'National Diploma in CNC Technology – NVQ V',
    'National Diploma in Electrical Technology – NVQ V',
    'National Diploma in Fluid Power Technology – NVQ V',
    'National Diploma in Mechatronic Technology – NVQ V',
    'National Diploma in Welding Technology – NVQ V',
    'National Diploma in Refrigeration & Air Conditioning Technology – NVQ V',
];

const AL_NAITA_COURSES = [
    'Nurse Assistant',
    'Clerk',
];

const AL_VTA_COURSES = [
    'Construction Craftsman (Masonry) – NVQ IV',
    'Preschool Teacher',
];

// Professional Qualification sub-categories for AL
const AL_PROF_ACCOUNTING = [
    'Accounting Technician (AAT) – NVQ IV',
    'Chartered Accountancy (CA)',
    'Management Accounting (CIMA)',
    'Executive Diploma in HRM',
    'Professional Graduate Diploma in Marketing',
];

const AL_PROF_IT = [
    'Higher National Diploma in Software Engineering',
    'Higher National Diploma in Network Engineering',
    'Diploma in Computer System Design',
    'BCS HEQ (Higher Education Qualifications)',
];

const AL_PROF_BANKING = [
    'Intermediate Applied Banking & Finance (IABF)',
    'Diploma in Applied Banking & Finance (DABF)',
    'Diploma in Insurance',
];

const AL_PROF_HEALTHCARE = [
    'Diploma in Nursing',
    'Diploma in Pharmacy',
    'Diploma in Medical Laboratory Technology',
];

const AL_PROF_OTHER = [
    'Attorney-at-Law (Law Entrance)',
    'Diploma in Hotel Management',
    'Diploma in Logistics & Supply Chain Management',
];

const PathwayFinder: React.FC = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState<Step>(1);
    const [examLevel, setExamLevel] = useState<ExamLevel>('');
    const [olResult, setOlResult] = useState<OLResult>('');
    const [interest, setInterest] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);

    const handleNext = () => setStep((s) => Math.min(s + 1, 4) as Step);
    const handlePrev = () => setStep((s) => Math.max(s - 1, 1) as Step);

    const getPredeterminedResults = () => ({
        'OL': {
            'IT': { title: t('pathwayFinder.results_data.ol_it.title'), desc: t('pathwayFinder.results_data.ol_it.desc') },
            'Engineering': { title: t('pathwayFinder.results_data.ol_eng.title'), desc: t('pathwayFinder.results_data.ol_eng.desc') },
        },
        'AL': {
            'IT': { title: t('pathwayFinder.results_data.al_it.title'), desc: t('pathwayFinder.results_data.al_it.desc') },
            'Engineering': { title: t('pathwayFinder.results_data.al_eng.title'), desc: t('pathwayFinder.results_data.al_eng.desc') },
            'Business': { title: t('pathwayFinder.results_data.al_bus.title'), desc: t('pathwayFinder.results_data.al_bus.desc') },
        }
    });

    // Determine which interest fields to show in step 3
    const getInterestFields = (): string[] => {
        if (examLevel === 'OL' && olResult === 'passed') {
            return ['GCE A/L', 'Professional Qualification Courses', 'Vocational Qualifications'];
        }
        if (examLevel === 'AL') {
            return ['University Education', 'Professional Qualification Courses', 'Vocational Qualifications'];
        }
        return ['IT', 'Engineering', 'Business', 'Healthcare', 'Creative', 'Vocational Training'];
    };

    const calculateResults = () => {
        // ── AL ──────────────────────────────────────────────────────────
        if (examLevel === 'AL') {
            if (interest === 'University Education') {
                setResults([{
                    title: 'University Education',
                    desc: 'Apply for state university admission via the UGC based on your A/L Z-score. Courses available in Arts, Science, Commerce, and Technology streams at universities island-wide.',
                }]);
                handleNext();
                return;
            }
            if (interest === 'Professional Qualification Courses') {
                setResults([
                    { title: 'Accounting & Management', isVocational: true, courses: AL_PROF_ACCOUNTING },
                    { title: 'Information Technology', isVocational: true, courses: AL_PROF_IT },
                    { title: 'Banking & Insurance', isVocational: true, courses: AL_PROF_BANKING },
                    { title: 'Healthcare', isVocational: true, courses: AL_PROF_HEALTHCARE },
                    { title: 'Other', isVocational: true, courses: AL_PROF_OTHER },
                ]);
                handleNext();
                return;
            }
            if (interest === 'Vocational Qualifications') {
                setResults([
                    { title: 'Korean Tech (Korea–Sri Lanka Technical Training Centre)', isVocational: true, courses: AL_KOREAN_TECH_COURSES },
                    { title: 'NAITA – National Apprentice & Industrial Training Authority', isVocational: true, courses: AL_NAITA_COURSES },
                    { title: 'VTA – Vocational Training Authority', isVocational: true, courses: AL_VTA_COURSES },
                ]);
                handleNext();
                return;
            }
        }

        // ── OL + Passed ──────────────────────────────────────────────────────
        if (examLevel === 'OL' && olResult === 'passed') {
            if (interest === 'GCE A/L') {
                setResults([{
                    title: 'GCE Advanced Level (A/L) – Choose Your Stream',
                    isVocational: true,
                    courses: AL_STREAMS,
                }]);
                handleNext();
                return;
            }
            if (interest === 'Professional Qualification Courses') {
                setResults([{
                    title: 'Professional Qualification Courses',
                    isVocational: true,
                    courses: PROF_QUAL_COURSES,
                }]);
                handleNext();
                return;
            }
            if (interest === 'Vocational Qualifications') {
                setResults([
                    { title: 'NAITA – National Apprentice & Industrial Training Authority', isVocational: true, courses: NAITA_COURSES_PASSED },
                    { title: 'VTA – Vocational Training Authority', isVocational: true, courses: VTA_COURSES_PASSED },
                    { title: 'German Tech (CGTTI – Ceylon German Technical Training Institute)', isVocational: true, courses: GERMAN_TECH_COURSES },
                    { title: 'Korean Tech (Korea–Sri Lanka Technical Training Centre) – NVQ 3 or 4', isVocational: true, courses: KOREAN_TECH_COURSES_PASSED },
                ]);
                handleNext();
                return;
            }
        }

        // ── OL + Failed / Some + Vocational Training ─────────────────────────
        if (examLevel === 'OL' && (olResult === 'failed' || olResult === 'some') && interest === 'Vocational Training') {
            setResults([
                { title: 'NAITA – National Apprentice & Industrial Training Authority', isVocational: true, courses: NAITA_COURSES_FAILED },
                { title: 'VTA – Vocational Training Authority', isVocational: true, courses: VTA_COURSES_FAILED },
                { title: 'Korean Tech (CGTTI / Korea–Sri Lanka Technical Training Centre)', isVocational: true, courses: KOREAN_TECH_COURSES_FAILED },
            ]);
            handleNext();
            return;
        }

        // ── Default logic ────────────────────────────────────────────────────
        const PREDETERMINED_RESULTSMap = getPredeterminedResults();
        const levelData: any = PREDETERMINED_RESULTSMap[examLevel as keyof typeof PREDETERMINED_RESULTSMap] || {};
        const exactMatch = levelData[interest as keyof typeof levelData];

        let generatedResults: any[] = [
            { title: t('pathwayFinder.results_data.fallback_counseling.title'), desc: t('pathwayFinder.results_data.fallback_counseling.desc') }
        ];

        if (exactMatch) {
            generatedResults.unshift(exactMatch);
        } else if (examLevel === 'AL') {
            generatedResults.unshift({ title: t('pathwayFinder.results_data.fallback_al.title'), desc: t('pathwayFinder.results_data.fallback_al.desc') });
        } else {
            generatedResults.unshift({ title: t('pathwayFinder.results_data.fallback_ol.title'), desc: t('pathwayFinder.results_data.fallback_ol.desc') });
        }

        setResults(generatedResults);
        handleNext();
    };

    return (
        <div className="container pathway-container">
            <div className="wizard-header text-center">
                <h1 className="section-title mb-2">{t('pathwayFinder.title')}</h1>
                <p className="text-secondary mb-8">{t('pathwayFinder.subtitle')}</p>

                {/* Progress Bar */}
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>
                <div className="steps-indicator">
                    <span className={step >= 1 ? 'active' : ''}>{t('pathwayFinder.steps.focus')}</span>
                    <span className={step >= 2 ? 'active' : ''}>{t('pathwayFinder.steps.academics')}</span>
                    <span className={step >= 3 ? 'active' : ''}>{t('pathwayFinder.steps.interests')}</span>
                    <span className={step >= 4 ? 'active' : ''}>{t('pathwayFinder.steps.results')}</span>
                </div>
            </div>

            <div className="wizard-card box-shadow-md">

                {step === 1 && (
                    <div className="wizard-step step-1">
                        <h2 className="step-title">{t('pathwayFinder.step1.title')}</h2>
                        <div className="options-grid">
                            <button
                                className={`option-card ${examLevel === 'OL' ? 'selected' : ''}`}
                                onClick={() => setExamLevel('OL')}
                            >
                                <div className="option-content">
                                    <h3>{t('pathwayFinder.step1.ol.title')}</h3>
                                    <p>{t('pathwayFinder.step1.ol.desc')}</p>
                                </div>
                                {examLevel === 'OL' && <CheckCircle2 className="check-icon" />}
                            </button>
                            <button
                                className={`option-card ${examLevel === 'AL' ? 'selected' : ''}`}
                                onClick={() => setExamLevel('AL')}
                            >
                                <div className="option-content">
                                    <h3>{t('pathwayFinder.step1.al.title')}</h3>
                                    <p>{t('pathwayFinder.step1.al.desc')}</p>
                                </div>
                                {examLevel === 'AL' && <CheckCircle2 className="check-icon" />}
                            </button>
                        </div>
                        <div className="wizard-actions right">
                            <button className="btn btn-primary" onClick={handleNext} disabled={!examLevel}>
                                {t('pathwayFinder.step1.next')} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="wizard-step step-2">
                        <h2 className="step-title">{t('pathwayFinder.step2.title')}</h2>
                        <p className="step-desc">{t('pathwayFinder.step2.desc')}</p>

                        <div className="form-group mt-4">
                            <label>{t('pathwayFinder.step2.label')}</label>
                            <select
                                className="form-select"
                                value={olResult}
                                onChange={(e) => setOlResult(e.target.value as OLResult)}
                            >
                                <option value="">{t('pathwayFinder.step2.options.default')}</option>
                                <option value="passed">{t('pathwayFinder.step2.options.passed')}</option>
                                <option value="some">{t('pathwayFinder.step2.options.some')}</option>
                                <option value="failed">{t('pathwayFinder.step2.options.failed')}</option>
                            </select>
                        </div>

                        <div className="info-alert mt-4">
                            <strong>{t('pathwayFinder.step2.alert_title')}</strong> {t('pathwayFinder.step2.alert_desc')}
                        </div>

                        <div className="wizard-actions space-between mt-8">
                            <button className="btn btn-secondary" onClick={handlePrev}>
                                <ArrowLeft size={18} /> {t('pathwayFinder.step2.back')}
                            </button>
                            <button className="btn btn-primary" onClick={handleNext}>
                                {t('pathwayFinder.step2.next')} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="wizard-step step-3">
                        <h2 className="step-title">{t('pathwayFinder.step3.title')}</h2>

                        <div className="options-grid three-cols">
                            {getInterestFields().map((field) => (
                                <button
                                    key={field}
                                    className={`option-card compact ${interest === field ? 'selected' : ''}`}
                                    onClick={() => setInterest(field)}
                                >
                                    <div className="option-content text-center">
                                        <h3>{t(`pathwayFinder.step3.fields.${field}`) || field}</h3>
                                    </div>
                                    {interest === field && <CheckCircle2 className="check-icon compact-check" />}
                                </button>
                            ))}
                        </div>

                        <div className="wizard-actions space-between mt-8">
                            <button className="btn btn-secondary" onClick={handlePrev}>
                                <ArrowLeft size={18} /> {t('pathwayFinder.step3.back')}
                            </button>
                            <button className="btn btn-primary" onClick={calculateResults} disabled={!interest}>
                                {t('pathwayFinder.step3.next')} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="wizard-step step-4 results-step">
                        <div className="success-header text-center mb-8">
                            <div className="success-icon-wrapper mb-4">
                                <CheckCircle2 size={48} className="text-primary" />
                            </div>
                            <h2 className="step-title">{t('pathwayFinder.step4.title')}</h2>
                            <p>{t('pathwayFinder.step4.subtitle')}</p>
                        </div>

                        <div className="results-list">
                            {results.map((result, idx) => (
                                <div key={idx} className={`result-card box-shadow-sm${result.isVocational ? ' vocational-card' : ''}`}>
                                    <div className="result-badge">{t('pathwayFinder.step4.badge_prefix')}{idx + 1}</div>
                                    <h3 className="result-title">{result.title}</h3>
                                    {result.isVocational && result.courses ? (
                                        <ul className="vocational-courses-list">
                                            {result.courses.map((course: string, cIdx: number) => (
                                                <li key={cIdx} className="vocational-course-item">
                                                    <span className="course-bullet">▸</span> {course}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="result-desc">{result.desc}</p>
                                    )}
                                    <button className="btn btn-secondary mt-4 btn-sm">{t('pathwayFinder.step4.learn_more')}</button>
                                </div>
                            ))}
                        </div>

                        <div className="wizard-actions center mt-8 text-center pt-8 border-t">
                            <p className="mb-4">{t('pathwayFinder.step4.explore_more')}</p>
                            <button className="btn btn-secondary" onClick={() => { setStep(1); setExamLevel(''); setOlResult(''); setInterest(''); }}>
                                {t('pathwayFinder.step4.start_over')}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PathwayFinder;
