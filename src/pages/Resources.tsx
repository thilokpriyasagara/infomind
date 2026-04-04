import React, { useState } from 'react';
import { FileQuestion, ChevronDown, ChevronUp, ExternalLink, GraduationCap, Wrench, Briefcase, Plus, Minus, Calendar } from 'lucide-react';
import './Resources.css';

const FAQ_CATEGORIES = [
    {
        category: "🎓 University Path FAQs",
        faqs: [
            {
                question: "What is the Z-score and how does it affect university selection?",
                answer: (
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>The Z-score is a standardized score used in Sri Lanka to rank students for admission to state universities. It is calculated based on a student’s performance in the G.C.E. Advanced Level (A/L) examination compared to other students in the same stream.</li>
                        <li>The University Grants Commission uses the Z-score to determine eligibility and course selection. Each degree program has a minimum Z-score requirement, which varies every year depending on competition and district quota allocation.</li>
                        <li>A higher Z-score increases the chances of being selected for competitive degree programs.</li>
                    </ul>
                )
            },
            {
                question: "Can I enter university if I repeat A/Ls?",
                answer: (
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Yes. Students are allowed to repeat the A/L examination to improve their results and Z-score. The best attempt (according to current regulations) will be considered for university admission.</li>
                        <li>However, students should verify updated admission policies through the University Grants Commission before making a decision.</li>
                        <li>Repeating A/Ls can improve opportunities, but students should also consider alternative pathways while preparing.</li>
                    </ul>
                )
            },
            {
                question: "What are alternative options if I don’t get selected for a state university?",
                answer: (
                    <div className="text-left space-y-2">
                        <p>If you are not selected for a state university, there are several alternative pathways:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Higher National Diploma programs at Sri Lanka Institute of Advanced Technological Education</li>
                            <li>Distance learning through Open University of Sri Lanka</li>
                            <li>Accredited vocational qualifications under Tertiary and Vocational Education Commission</li>
                            <li>Private higher education institutions</li>
                            <li>Professional courses (IT, Accounting, Engineering, etc.)</li>
                        </ul>
                        <p className="pt-2">Not getting selected for a state university does not mean the end of higher education opportunities.</p>
                    </div>
                )
            }
        ]
    },
    {
        category: "🛠 Vocational Training FAQs",
        faqs: [
            {
                question: "Are vocational qualifications recognized internationally?",
                answer: (
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Many vocational qualifications in Sri Lanka are structured under the National Vocational Qualification (NVQ) framework, regulated by the Tertiary and Vocational Education Commission.</li>
                        <li>Certain NVQ qualifications are recognized locally and can support international employment, especially in technical and skilled sectors. However, international recognition may depend on the country and industry.</li>
                        <li>Students are advised to check the specific recognition status of their chosen qualification before enrolling.</li>
                    </ul>
                )
            },
            {
                question: "What is NVQ and how does it work?",
                answer: (
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>NVQ (National Vocational Qualification) is a structured qualification framework in Sri Lanka that certifies practical and technical skills.</li>
                        <li>It is regulated by the Tertiary and Vocational Education Commission and delivered through institutions such as the Vocational Training Authority and the National Apprentice and Industrial Training Authority.</li>
                        <li>NVQ levels range from Level 1 (basic skills) to Level 7 (degree-equivalent qualifications). Students are assessed based on competency and practical ability rather than only written examinations.</li>
                    </ul>
                )
            },
            {
                question: "Can I go to university after completing a vocational qualification?",
                answer: (
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Yes. Certain higher-level NVQ qualifications (such as NVQ Level 5 or 6) may provide pathways to degree programs in selected fields.</li>
                        <li>Some institutions allow credit transfers or lateral entry into degree programs. However, eligibility depends on the institution and course requirements.</li>
                        <li>Students should confirm progression opportunities with the relevant university or institution before enrolling in a vocational program.</li>
                    </ul>
                )
            }
        ]
    },
    {
        category: "💼 Career FAQs",
        faqs: [
            {
                question: "How do I choose between university and vocational training?",
                answer: (
                    <div className="text-left space-y-2">
                        <p>Choosing between university and vocational training depends on:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Your career goals</li>
                            <li>Your learning style</li>
                            <li>Financial situation</li>
                            <li>Interest in theoretical vs practical learning</li>
                        </ul>
                        <p className="pt-2">University education focuses more on academic and theoretical knowledge, while vocational training emphasizes hands-on skills and direct industry readiness.</p>
                        <p>Students are encouraged to research both pathways carefully and consider long-term career goals before deciding.</p>
                    </div>
                )
            },
            {
                question: "What are high-demand careers in Sri Lanka?",
                answer: (
                    <div className="text-left space-y-2">
                        <p>High-demand career fields in Sri Lanka currently include:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Information Technology and Software Development</li>
                            <li>Engineering and Construction</li>
                            <li>Healthcare and Nursing</li>
                            <li>Tourism and Hospitality</li>
                            <li>Skilled Technical Trades (Electricians, Automotive Technicians, etc.)</li>
                        </ul>
                        <p className="pt-2">Market demand can change over time, so students should stay updated through official sources such as the Ministry of Labor.</p>
                    </div>
                )
            },
            {
                question: "Are there government scholarships available?",
                answer: (
                    <div className="text-left space-y-2">
                        <p>Yes. Government scholarships and financial assistance programs are available for eligible students.</p>
                        <p>Scholarships may be offered through:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>State universities</li>
                            <li>Government ministries</li>
                            <li>Provincial councils</li>
                            <li>Foreign-funded programs</li>
                        </ul>
                        <p className="pt-2">Students should regularly check announcements from the Ministry of Education and the University Grants Commission for updated information.</p>
                    </div>
                )
            },
            {
                question: "Can I study part-time while working?",
                answer: (
                    <ul className="list-disc pl-5 space-y-2 text-left">
                        <li>Yes. Several institutions in Sri Lanka offer part-time, evening, weekend, and distance learning programs.</li>
                        <li>For example, the Open University of Sri Lanka provides flexible learning options for working individuals.</li>
                        <li>Balancing work and study requires strong time management, but it is a practical option for many students who need financial independence.</li>
                    </ul>
                )
            }
        ]
    }
];

const TIMELINE_DATA = [
    {
        title: "Month 1: Understand Results & Explore Options",
        danger: false,
        items: [
            "Check A/L results and Z-score",
            "Compare previous years’ cut-off marks",
            "Visit the University Grants Commission website",
            "List eligible degree programs",
            "Explore alternative pathways (HND, vocational, private)",
            "Discuss options with parents or teachers"
        ]
    },
    {
        title: "Month 2: Research & Compare Pathways",
        danger: false,
        items: [
            "Compare university vs vocational training",
            "Research private institutions and accreditation",
            "Understand NVQ levels and progression paths",
            "Check apprenticeship opportunities",
            "Look for government or foreign scholarships"
        ]
    },
    {
        title: "Month 3: Prepare & Submit Applications",
        danger: false,
        items: [
            "Prepare documents (A/L result sheet, NIC, birth certificate)",
            "Register and apply through official university portals",
            "Apply for vocational, private, or distance learning programs",
            "Submit scholarship applications before deadlines"
        ]
    },
    {
        title: "Month 4–5: Skill Development Phase",
        danger: false,
        items: [
            "Improve English communication skills",
            "Develop basic IT and computer skills",
            "Follow short certificate or online courses",
            "Volunteer or complete internships if possible",
            "Build confidence and workplace readiness"
        ]
    },
    {
        title: "Month 6+: Decision & Transition Phase",
        danger: false,
        items: [
            "Confirm and accept selected admissions",
            "Plan accommodation, transport, and finances",
            "Prepare mentally for university or training life",
            "Set personal and career goals for the next year"
        ]
    },
    {
        title: "Common Mistakes to Avoid",
        danger: true,
        items: [
            "Waiting without researching options",
            "Choosing a path only based on friends’ decisions",
            "Ignoring vocational and technical pathways",
            "Not checking course recognition",
            "Missing application deadlines"
        ]
    }
];

const Resources: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<string | null>('0-0');
    const [openTimeline, setOpenTimeline] = useState<number | null>(0);

    return (
        <div className="container page-wrapper">
            <div className="page-header">
                <span className="section-label">Resources</span>
                <h1 className="section-title">Awareness &amp; Guidance Resources</h1>
                <p>Explore articles, videos, and FAQs designed to help you make the right choice for your future.</p>
            </div>

            {/* Myths vs Facts section */}
            <section className="mb-12">
                <h2 className="resources-section-heading">Common Myths vs Facts</h2>
                <div className="grid-2-cols">
                    <div className="card-box bg-red-light">
                        <h3 className="text-danger mb-2">Myth: University is the only path to success.</h3>
                        <p><strong>Fact:</strong> Over 60% of modern high-paying jobs in IT and technical fields require skills and certifications over traditional degrees.</p>
                    </div>
                    <div className="card-box bg-green-light">
                        <h3 className="text-success mb-2">Myth: Vocational training is for dropouts.</h3>
                        <p><strong>Fact:</strong> The NVQ (National Vocational Qualification) framework is internationally recognized and can even lead to a degree (NVQ Level 7).</p>
                    </div>
                </div>
            </section>

            {/* Timeline Checklist section */}
            <section className="mb-12">
                <div className="timeline-section">
                    <h2 className="resources-section-heading mb-2"><Calendar size={22} /> After A/L Timeline Checklist</h2>
                    <p className="timeline-intro">
                        This step-by-step timeline helps Sri Lankan school leavers plan their next steps after receiving A/L results.
                    </p>

                    <div className="timeline-accordion mt-6">
                        {TIMELINE_DATA.map((step, idx) => (
                            <div key={idx} className="timeline-item">
                                <button
                                    className={`timeline-btn ${step.danger ? 'danger' : ''} ${openTimeline === idx ? 'active' : ''}`}
                                    onClick={() => setOpenTimeline(openTimeline === idx ? null : idx)}
                                >
                                    <span>{step.title}</span>
                                    {openTimeline === idx ? <Minus size={18} /> : <Plus size={18} />}
                                </button>
                                {openTimeline === idx && (
                                    <div className={`timeline-content ${step.danger ? 'danger-content' : ''}`}>
                                        <ul>
                                            {step.items.map((item, idy) => (
                                                <li key={idy}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="timeline-note mt-6">
                        This timeline is provided for guidance purposes only. Students are advised to verify information through official institutions before making final decisions.
                    </p>
                </div>
            </section>

            {/* Video Guides */}
            <section className="mb-12">
                <h2 className="resources-section-heading">Video Guides</h2>
                <div className="grid-3-cols">
                    {[
                        {
                            id: "w_YFEKode6M",
                            title: "AETI Orugodawatta Video",
                        },
                        {
                            id: "cDeW1z1W7es",
                            title: "“Be Pro” - VTA Corporate Profile",
                        },
                        {
                            id: "AqSU2UW2V2g",
                            title: "German Tech ගැන ඔබ දැනුවත්ද?",
                        }
                    ].map(video => (
                        <div key={video.id} className="video-card box-shadow-sm flex flex-col">
                            <iframe 
                                className="w-full h-48 bg-gray-100"
                                src={`https://www.youtube.com/embed/${video.id}`} 
                                title={video.title} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                            <div className="video-info flex-grow">
                                <h4>{video.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Official Education & Career Resource Links */}
            <section className="mb-12">
                <h2 className="resources-section-heading"><ExternalLink size={22} /> Official Education &amp; Career Resources</h2>
                <div className="official-links-grid">

                    {/* Category 1 – University & Higher Education */}
                    <div className="official-links-card">
                        <div className="official-links-card-header university">
                            <GraduationCap size={20} />
                            <span>University &amp; Higher Education</span>
                        </div>
                        <ul className="official-links-list">
                            {[
                                { label: 'University Grants Commission', href: 'https://www.ugc.ac.lk/' },
                                { label: 'Ministry of Education', href: 'https://moe.gov.lk/en/welcome/' },
                                { label: 'Sri Lanka Institute of Advanced Technological Education', href: 'https://mohe.gov.lk/' },
                                { label: 'Open University of Sri Lanka', href: 'https://ou.ac.lk/' },
                                { label: 'Institute of Technology University of Moratuwa', href: 'https://itum.mrt.ac.lk/' },
                            ].map(link => (
                                <li key={link.href}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="official-link-item">
                                        <span>{link.label}</span>
                                        <ExternalLink size={14} className="link-arrow" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Category 2 – Vocational & Technical Training */}
                    <div className="official-links-card">
                        <div className="official-links-card-header vocational">
                            <Wrench size={20} />
                            <span>Vocational &amp; Technical Training</span>
                        </div>
                        <ul className="official-links-list">
                            {[
                                { label: 'Tertiary and Vocational Education Commission', href: 'https://www.nvq.gov.lk/Home/index.html' },
                                { label: 'Vocational Training Authority', href: 'https://course.vta.lk/' },
                                { label: 'National Apprentice & Industrial Training Authority', href: 'https://www.naita.gov.lk/' },
                                { label: 'Department of Technical Education and Training', href: 'https://dtet.gov.lk/en/' },
                                { label: 'Ceylon German Technical Training Institute', href: 'https://germantec.lk/' },
                            ].map(link => (
                                <li key={link.href}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="official-link-item">
                                        <span>{link.label}</span>
                                        <ExternalLink size={14} className="link-arrow" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Category 3 – Career & Employment Guidance */}
                    <div className="official-links-card">
                        <div className="official-links-card-header career">
                            <Briefcase size={20} />
                            <span>Career &amp; Employment Guidance</span>
                        </div>
                        <ul className="official-links-list">
                            {[
                                { label: 'Ministry of Labor', href: 'https://labourmin.gov.lk/' },
                                { label: 'National Career Guidance and Counselling Centre', href: 'https://www.globgov.com/LK/' },
                            ].map(link => (
                                <li key={link.href}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="official-link-item">
                                        <span>{link.label}</span>
                                        <ExternalLink size={14} className="link-arrow" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </section>

            {/* FAQs */}
            <section className="mb-8">
                <h2 className="resources-section-heading"><FileQuestion size={22} /> Frequently Asked Questions</h2>

                <div className="faq-categories space-y-8">
                    {FAQ_CATEGORIES.map((categoryGroup, catIdx) => (
                        <div key={catIdx} className="faq-category-group">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">{categoryGroup.category}</h3>
                            <div className="faq-container">
                                {categoryGroup.faqs.map((faq, idx) => {
                                    const faqId = `${catIdx}-${idx}`;
                                    const isOpen = openFaq === faqId;
                                    return (
                                        <div key={faqId} className={`faq-item ${isOpen ? 'open' : ''}`}>
                                            <button className="faq-question" onClick={() => setOpenFaq(isOpen ? null : faqId)}>
                                                <span>{faq.question}</span>
                                                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                            {isOpen && (
                                                <div className="faq-answer">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Resources;
