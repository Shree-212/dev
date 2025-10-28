// Documentation Page JavaScript
// Handles navigation, lazy loading, and interactivity

// ===== NAVIGATION HIGHLIGHTING =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.doc-nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Throttled scroll handler for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveNavLink();
    });
});

// ===== LAZY LOADING SECTIONS =====
let currentLoadedSection = 3; // Already loaded: platform, audience, value
const totalSections = 10; // Increased to include new sections

// Make function globally accessible
window.loadNextSection = function() {
    console.log('loadNextSection called, currentLoadedSection:', currentLoadedSection);
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const docContent = document.querySelector('.doc-content');
    
    console.log('loadMoreBtn:', loadMoreBtn);
    console.log('docContent:', docContent);
    
    if (!loadMoreBtn || !docContent) {
        console.error('Button or container not found!');
        return;
    }
    
    if (currentLoadedSection >= totalSections) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    // Show loading state
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = '<span class="loader-spinner" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; margin-right: 8px;"></span> Loading...';
    
    // Simulate loading (in real scenario, this would be an AJAX call)
    setTimeout(() => {
        currentLoadedSection++;
        console.log('Loading section:', currentLoadedSection);
        
        switch(currentLoadedSection) {
            case 4:
                loadArchitectureSection(docContent);
                loadMoreBtn.innerHTML = 'Load Customer Application Details →';
                break;
            case 5:
                loadCustomerAppSection(docContent);
                loadMoreBtn.innerHTML = 'Load Admin Panel Details →';
                break;
            case 6:
                loadAdminPanelSection(docContent);
                loadMoreBtn.innerHTML = 'Load Technical Specifications →';
                break;
            case 7:
                loadTechnicalSpecsSection(docContent);
                loadMoreBtn.innerHTML = 'Load Recommendations & Next Steps →';
                break;
            case 8:
                loadRecommendationsSection(docContent);
                loadMoreBtn.innerHTML = 'Load Appendices & Reference →';
                break;
            case 9:
                loadAppendicesSection(docContent);
                loadMoreBtn.innerHTML = 'Load Platform Features →';
                break;
            case 10:
                loadPlatformFeaturesSection(docContent);
                loadMoreBtn.style.display = 'none';
                break;
        }
        
        loadMoreBtn.disabled = false;
        
        // Smooth scroll to new content
        setTimeout(() => {
            const sections = docContent.querySelectorAll('.doc-section');
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = lastSection.offsetTop - navbarHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
        
    }, 800); // Simulate network delay
};

// ===== SECTION LOADERS =====

function loadArchitectureSection(container) {
    const section = document.createElement('section');
    section.id = 'architecture';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">04</span>
            Architecture Variants Detailed
        </h2>
        
        <div class="content-block">
            <p class="lead-text">Six carefully designed architecture pathways, each optimized for different scales, timelines, and business objectives—spanning from rapid MVP launches to enterprise-grade global deployments.</p>
        </div>

        <div class="info-callout">
            <h4>Architecture Selection Framework</h4>
            <p>Each variant balances three critical dimensions:</p>
            <ul>
                <li><strong>Scalability:</strong> Concurrent user capacity, geographic reach, and data volume handling</li>
                <li><strong>Time-to-Market:</strong> Development timeline from inception to production launch</li>
                <li><strong>Investment:</strong> Initial build cost and 3-year total cost of ownership (TCO)</li>
            </ul>
            <p style="margin-top: 1rem;"><strong>Recommendation:</strong> Variant 4 (Scalable Hybrid) emerges as the balanced baseline with a clear roadmap to Variant 5 as scale accelerates.</p>
        </div>

        <div class="architecture-variants">
            ${generateVariantHTML(1, 'Non-Scalable Web Only', 'React for both user and admin panels with Firebase backend - Web-only access via browsers', 
                '6 weeks', '₹1.5L', '2.75 FTE', '₹2.7L',
                ['React 18 for user panel', 'React 18 for admin panel', 'Firebase Authentication', 'Cloud Firestore', 'Firebase Functions', 'Web-only deployment'],
                ['Rapid MVP launch', 'Market validation', 'Limited geography pilots', 'Quick iteration cycles', 'Firebase ecosystem'])}
            
            ${generateVariantHTML(2, 'Non-Scalable PWA', 'React + Ionic for Android PWA (user) and React web (admin) with Firebase ecosystem', 
                '10 weeks', '₹2.5L', '3.15 FTE', '₹4.5L',
                ['React + Ionic for user PWA','App for android only', 'React web for admin', 'Capacitor PWA deployment', 'Firebase ecosystem', 'Workbox service workers', 'PWA for users, web for admin'],
                ['Mobile adoption testing', 'Quick feature updates', 'App store alternatives', 'Offline capabilities', 'Cross-browser compatibility'])}
            
            ${generateVariantHTML(3, 'Semi-Scalable Hybrid', 'React Native (iOS/Android user app) and React web (admin) with Firebase enhanced services', 
                '16 weeks', '₹4.0L', '5.4 FTE', '₹7.2L',
                ['React Native for iOS/Android user app', 'React web for admin', 'Firebase with enhanced services', 'Cloud Run services', 'Native mobile + web admin deployment'],
                ['Mid-scale operations', 'Native experiences', 'Better performance', 'Regional expansion', 'App store presence'])}
            
            ${generateVariantHTML(4, 'Scalable Hybrid (Recommended)', 'React Native (iOS/Android user app) and React web (admin) with Express.js microservices on Kubernetes GCP', 
                '20 weeks', '₹7.2L', '9.65 FTE', '₹12.5L',
                ['React Native for iOS/Android user app', 'React web for admin', 'Express.js microservices', 'Kubernetes on GCP', 'Native mobile + web admin with scalable infrastructure'],
                ['High availability', 'Multi-region ready', 'Extensible architecture', 'National scale', 'SLA 99.9%', 'Advanced monitoring'], true)}
            
            ${generateVariantHTML(5, 'Fully Scalable', 'React Native for both user and admin (iOS/Android) with Express.js microservices on Kubernetes GCP', 
                '28 weeks', '₹9.5L', '14.65 FTE', '₹16.5L',
                ['React Native for user iOS/Android', 'React Native for admin iOS/Android', 'Express.js microservices', 'Kubernetes on GCP', 'Native apps for all platforms with enterprise backend'],
                ['Geographic expansion', 'Multiple dedicated apps', 'Global reliability', 'AI personalization', 'Low-latency streaming', 'Cross-region active-active'])}
            
            ${generateVariantHTML(6, 'Complete Enterprise', 'React Native for user, agent, and admin panels (iOS/Android) with Express.js microservices on Kubernetes GCP', 
                '36 weeks', '₹17.5L', '21.5 FTE', '₹30L+',
                ['React Native for user iOS/Android', 'React Native for agent iOS/Android', 'React Native for admin iOS/Android', 'Express.js microservices', 'Kubernetes on GCP', 'Native apps for all user types with full enterprise architecture'],
                ['Global scale', 'Enterprise features', 'Advanced analytics', 'Full compliance', 'Regulatory readiness', '24x7 NOC coverage', 'Data mesh architecture'])}
        </div>

        <div class="content-block">
            <h3>Variant Comparison Matrix</h3>
            <div class="comparison-table-wrapper">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Variant</th>
                            <th>Front-End</th>
                            <th>Backend</th>
                            <th>Scalability</th>
                            <th>Timeline</th>
                            <th>Budget</th>
                            <th>TCO</th>
                            <th>Key Trade-Off</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Web Only</strong></td>
                            <td>React (user + admin web)</td>
                            <td>Firebase</td>
                            <td>Low</td>
                            <td>6 weeks</td>
                            <td>₹1.5L</td>
                            <td>₹2.7L</td>
                            <td>Web-only access</td>
                        </tr>
                        <tr>
                            <td><strong>2. PWA</strong></td>
                            <td>React+Ionic PWA + React web</td>
                            <td>Firebase</td>
                            <td>Low-Medium</td>
                            <td>10 weeks</td>
                            <td>₹2.5L</td>
                            <td>₹4.5L</td>
                            <td>PWA iOS limitations</td>
                        </tr>
                        <tr>
                            <td><strong>3. Hybrid</strong></td>
                            <td>React Native + React web</td>
                            <td>Firebase + Cloud Run</td>
                            <td>Medium</td>
                            <td>16 weeks</td>
                            <td>₹4.0L</td>
                            <td>₹7.2L</td>
                            <td>App store dependency</td>
                        </tr>
                        <tr class="recommended-row">
                            <td><strong>4. Scalable ⭐</strong></td>
                            <td>React Native + React web</td>
                            <td>Express + GKE</td>
                            <td>High</td>
                            <td>20 weeks</td>
                            <td>₹7.2L</td>
                            <td>₹12.5L</td>
                            <td>Higher ops complexity</td>
                        </tr>
                        <tr>
                            <td><strong>5. Fully Scalable</strong></td>
                            <td>React Native (user + admin)</td>
                            <td>Express + GKE</td>
                            <td>Very High</td>
                            <td>28 weeks</td>
                            <td>₹9.5L</td>
                            <td>₹16.5L</td>
                            <td>Significant infra spend</td>
                        </tr>
                        <tr>
                            <td><strong>6. Enterprise</strong></td>
                            <td>React Native (user + agent + admin)</td>
                            <td>Express + GKE</td>
                            <td>Enterprise</td>
                            <td>36 weeks</td>
                            <td>₹17.5L</td>
                            <td>₹30L+</td>
                            <td>Heavy governance overhead</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="info-callout info-callout-accent">
            <h4>Risk Assessment & Mitigation Strategies</h4>
            <ul>
                <li><strong>Streaming Reliability (High):</strong> Temple bandwidth variability mitigated through redundant ingest (SRT + WebRTC), real-time monitoring, and offline fallback recordings</li>
                <li><strong>Regulatory Compliance (High):</strong> GDPR, RBI, and data localization obligations addressed via compliance reviews, data residency controls (GCP india-south1), and audit trails</li>
                <li><strong>Security & Privacy (High):</strong> Protected through zero-trust IAM, regular penetration testing, OWASP compliance, and ongoing security training</li>
                <li><strong>Talent Availability (Medium):</strong> Advanced variants require Kubernetes, streaming, and data engineering expertise—mitigated via early hiring and training budgets</li>
                <li><strong>Scope Creep (Medium):</strong> Managed through prioritized roadmap, definition-of-done per epic, and stage-gate approvals</li>
                <li><strong>Budget Overrun (Medium):</strong> Controlled via multi-year vendor contracts, 8-12% contingency buffer, and monthly FinOps reporting</li>
            </ul>
        </div>
    `;
    
    container.insertBefore(section, container.querySelector('.load-more-section'));
}

function generateVariantHTML(number, title, description, timeline, budget, team, tco, techStack, features, recommended = false) {
    return `
        <div class="variant-detail ${recommended ? 'variant-detail-recommended' : ''}">
            ${recommended ? '<div class="recommended-badge-doc">⭐ Recommended</div>' : ''}
            <div class="variant-detail-header">
                <div class="variant-detail-number">${String(number).padStart(2, '0')}</div>
                <div>
                    <h3>${title}</h3>
                    <p class="variant-detail-desc">${description}</p>
                </div>
            </div>
            
            <div class="variant-detail-metrics">
                <div class="metric">
                    <span class="metric-label">Timeline</span>
                    <span class="metric-value">${timeline}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Budget</span>
                    <span class="metric-value">${budget}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Team Size</span>
                    <span class="metric-value">${team}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">3-Year TCO</span>
                    <span class="metric-value">${tco}</span>
                </div>
            </div>
            
            <div class="variant-detail-content">
                <div class="variant-tech">
                    <h4>Key Technologies</h4>
                    <div class="tech-tags">
                        ${techStack.map(tech => `<span class="tech-tag-doc">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="variant-features">
                    <h4>Best Suited For</h4>
                    <ul>
                        ${features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function loadCustomerAppSection(container) {
    const section = document.createElement('section');
    section.id = 'customer-app';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">05</span>
            Customer Mobile Application
        </h2>
        
        <div class="content-block">
            <p class="lead-text">The flagship devotee-facing interface serving as the primary gateway for millions of spiritual seekers worldwide to access authentic temple services—embodying the platform's commitment to delivering an immersive, temple-quality devotional experience.</p>
        </div>

        <div class="info-callout">
            <h4>Platform Integration & Ecosystem Role</h4>
            <p>The customer application serves as the cornerstone of the Dev Poojaan platform, seamlessly integrating with:</p>
            <ul>
                <li><strong>Temple Management Systems:</strong> Real-time puja scheduling and pandit coordination</li>
                <li><strong>Admin Oversight Systems:</strong> Service quality monitoring and devotee support</li>
                <li><strong>Payment Services:</strong> UPI, Razorpay, Cashfree integration for secure transactions</li>
                <li><strong>Streaming Infrastructure:</strong> Live temple connectivity with 4K video quality</li>
            </ul>
        </div>

        <div class="info-callout info-callout-accent">
            <h4>User Experience Philosophy</h4>
            <p>Built on the foundation of devotional principles and cultural sensitivity:</p>
            <ul>
                <li><strong>Spiritual Service Discovery:</strong> Every interface element crafted to minimize friction between devotees and their desired spiritual experiences</li>
                <li><strong>Adaptive Streaming:</strong> Automatically adjusts to network conditions (2G to 5G) and device capabilities</li>
                <li><strong>Offline-First Architecture:</strong> WatermelonDB conflict resolution ensuring uninterrupted access to daily Panchang and saved content</li>
                <li><strong>Cultural Sensitivity:</strong> Regional customization, traditional imagery, and language preferences respected throughout</li>
            </ul>
        </div>

        <div class="app-features">
            <div class="app-feature-card">
                <div class="app-feature-icon">🔐</div>
                <h3>Authentication & Profile System</h3>
                <div class="app-feature-content">
                    <h4>Registration & Login Options</h4>
                    <ul>
                        <li><strong>Phone Number Authentication:</strong> OTP-based verification with international number support for NRI community</li>
                        <li><strong>Social Media Authentication:</strong> Google Account, Facebook Login with spiritual privacy controls</li>
                        <li><strong>Family Account Linking:</strong> Multi-generational account connection with elder care integration</li>
                        <li><strong>Biometric Authentication:</strong> Face ID, Touch ID, fingerprint for secure access (Variant 6)</li>
                        <li><strong>User Type Management:</strong> Automatic classification as "Devotee" with family role specification</li>
                    </ul>
                </div>
            </div>

            <div class="app-feature-card">
                <div class="app-feature-icon">🕉️</div>
                <h3>Spiritual Services & Temple Connectivity</h3>
                <div class="app-feature-content">
                    <h4>Service Discovery & Selection</h4>
                    <ul>
                        <li><strong>Temple-Based Navigation:</strong> Services organized by famous temples (Kashi Vishwanath, Badrinath, Golden Temple, regional temples)</li>
                        <li><strong>Puja Type Classification:</strong> Daily Aarti, Special Havan, Festival Pujas, Personal Ceremonies</li>
                        <li><strong>Regional Temple Integration:</strong> Local temple partnerships with regional deity specialization</li>
                        <li><strong>Advanced Spiritual Search:</strong> Deity-specific services, festival-based filtering, astrological timing integration</li>
                        <li><strong>AI-Powered Recommendations:</strong> Machine learning suggesting relevant pujas based on devotional patterns</li>
                    </ul>
                    <h4>Temple Service Features</h4>
                    <ul>
                        <li><strong>Live Puja Streaming:</strong> Real-time temple ceremonies with 4K Ultra HD quality and clear audio (HLS/WebRTC)</li>
                        <li><strong>Puja Scheduling:</strong> Advanced booking system with astrological timing optimization and muhurat recommendations</li>
                        <li><strong>Pandit Selection:</strong> Verified priest profiles with qualification details, experience, and devotee ratings</li>
                        <li><strong>Offering Management:</strong> Digital chadhava system with physical item selection (flowers, prasadam, clothing, jewelry) and temple delivery tracking</li>
                        <li><strong>Multi-Angle Viewing:</strong> Multiple camera perspectives during important ceremonies (premium feature)</li>
                        <li><strong>Recording Access:</strong> Replay past pujas for family sharing and personal reflection</li>
                    </ul>
                </div>
            </div>

            <div class="app-feature-card">
                <div class="app-feature-icon">📅</div>
                <h3>Astrological & Spiritual Guidance</h3>
                <div class="app-feature-content">
                    <h4>Daily Panchang Integration</h4>
                    <ul>
                        <li><strong>Comprehensive Calendar:</strong> Tithi, Vara, Nakshatra, Yoga, Karana with detailed Hindi and English explanations</li>
                        <li><strong>Auspicious Timing:</strong> Muhurat recommendations for spiritual activities, weddings, business ventures, and life events</li>
                        <li><strong>Festival Calendar:</strong> Automated festival notifications with preparation guidance and regional variations</li>
                        <li><strong>Regional Customization:</strong> Location-based astrological calculations (latitude/longitude) and local traditions</li>
                        <li><strong>Sunrise/Sunset Times:</strong> Accurate timing for morning and evening prayers</li>
                    </ul>
                    <h4>Personal Spiritual Analytics</h4>
                    <ul>
                        <li><strong>Spiritual Journey Tracking:</strong> Worship frequency, festival observance, and spiritual goal progress monitoring</li>
                        <li><strong>Family Spiritual Coordination:</strong> Multi-member spiritual calendar management with synchronized reminders</li>
                        <li><strong>Astrological Consultation:</strong> AI-powered spiritual guidance with human expert backup for complex queries</li>
                        <li><strong>Karma Tracking:</strong> Positive action logging and spiritual merit accumulation with gamification elements</li>
                        <li><strong>Birth Chart Integration:</strong> Personalized recommendations based on individual astrological profiles</li>
                    </ul>
                </div>
            </div>

            <div class="app-feature-card">
                <div class="app-feature-icon">👨‍👩‍👧‍👦</div>
                <h3>Family & Social Features</h3>
                <div class="app-feature-content">
                    <h4>Family Integration</h4>
                    <ul>
                        <li><strong>Multi-Generational Profiles:</strong> Up to 8 individual family member profiles with personalized spiritual preferences</li>
                        <li><strong>Elderly Care Features:</strong> Medication-integrated prayer scheduling and health-spiritual wellness tracking</li>
                        <li><strong>Shared Spiritual Experiences:</strong> Real-time synchronized worship participation across different locations (Party Mode)</li>
                        <li><strong>Spiritual Communication:</strong> Family spiritual discussion threads and shared spiritual milestone celebrations</li>
                        <li><strong>Privacy Controls:</strong> Individual spiritual practice privacy with selective family sharing options</li>
                    </ul>
                    <h4>Community Engagement</h4>
                    <ul>
                        <li><strong>Devotional Social Proof:</strong> Family spiritual activity feeds and shared worship experiences</li>
                        <li><strong>Discussion Forums:</strong> Temple-specific devotee communities and pandit Q&A sessions</li>
                        <li><strong>Cross-Platform Sharing:</strong> WhatsApp family groups, Instagram stories, Facebook community pages integration</li>
                        <li><strong>Community Challenges:</strong> Seasonal worship challenges and community-wide spiritual events</li>
                    </ul>
                </div>
            </div>

            <div class="app-feature-card">
                <div class="app-feature-icon">💳</div>
                <h3>Payment & Commerce</h3>
                <div class="app-feature-content">
                    <h4>Secure Transactions</h4>
                    <ul>
                        <li><strong>Multiple Payment Methods:</strong> UPI, Credit/Debit cards, Digital wallets (Paytm, PhonePe, Google Pay), Net Banking</li>
                        <li><strong>International Support:</strong> Multi-currency for NRI devotees with dynamic exchange rates</li>
                        <li><strong>Subscription Plans:</strong> Various spiritual service tiers (Bhakt, Sevak, Parivar, Dharmic Sansthan)</li>
                        <li><strong>Donation Management:</strong> Temple donations, pandit dakshina, and charitable giving tracking with tax receipts</li>
                        <li><strong>Spiritual Rewards:</strong> Seva credits, dharmic achievements, referral system, and community recognition</li>
                        <li><strong>Auto-Renewal:</strong> Hassle-free subscription continuation with advance notifications</li>
                    </ul>
                </div>
            </div>

            <div class="app-feature-card">
                <div class="app-feature-icon">🔔</div>
                <h3>Notifications & Support</h3>
                <div class="app-feature-content">
                    <h4>Spiritual Alert System</h4>
                    <ul>
                        <li><strong>Festival Reminders:</strong> Advance festival preparation notifications (7 days, 3 days, 1 day) with spiritual guidance</li>
                        <li><strong>Puja Schedule Alerts:</strong> Booked service reminders with preparation instructions (24 hours, 1 hour before)</li>
                        <li><strong>Astrological Timing Notifications:</strong> Auspicious timing alerts for spiritual activities (real-time muhurat)</li>
                        <li><strong>Family Spiritual Updates:</strong> Shared family spiritual activity notifications and milestone celebrations</li>
                        <li><strong>Offering Delivery Status:</strong> Real-time updates on chadhava delivery to temples</li>
                    </ul>
                    <h4>Support System</h4>
                    <ul>
                        <li><strong>Spiritual Help Center:</strong> Comprehensive FAQ, video tutorials, and practice guidance</li>
                        <li><strong>Pandit Consultation:</strong> Direct in-app messaging with verified priests for spiritual questions</li>
                        <li><strong>Community Support:</strong> Peer devotee support forums and spiritual practice sharing</li>
                        <li><strong>24x7 Chat Support:</strong> Technical assistance and booking help (premium tiers)</li>
                        <li><strong>Emergency Spiritual Services:</strong> Rapid spiritual support for urgent family needs (same-day pujas)</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="user-tiers">
            <h3>User Classification & Journey Management</h3>
            <p class="tier-intro">Tiered user experience designed to serve devotees at every stage of their spiritual journey:</p>
            <div class="tier-grid">
                <div class="tier-card">
                    <div class="tier-badge">Free</div>
                    <h4>Bhakt (Basic Devotee)</h4>
                    <ul>
                        <li>Daily Panchang and basic astrological information</li>
                        <li>Limited temple aarti live streaming (2 per month)</li>
                        <li>Basic offering services with standard delivery confirmation</li>
                        <li>Community features with limited discussion participation</li>
                        <li>Monthly free puja service credits for trial experiences</li>
                        <li>Standard definition streaming quality</li>
                    </ul>
                </div>
                <div class="tier-card">
                    <div class="tier-badge tier-premium">Premium</div>
                    <h4>Sevak (Dedicated Devotee)</h4>
                    <ul>
                        <li>Unlimited access to all temple services and live puja streams</li>
                        <li>Priority puja scheduling with preferred pandit selection</li>
                        <li>Advanced astrological consultations and personalized muhurat</li>
                        <li>High-definition (1080p) streaming with recording access</li>
                        <li>Enhanced offering services with detailed photo/video documentation</li>
                        <li>Ad-free experience with priority customer support</li>
                    </ul>
                </div>
                <div class="tier-card">
                    <div class="tier-badge tier-family">Family</div>
                    <h4>Parivar (Family Plan)</h4>
                    <ul>
                        <li>Up to 8 individual family member profiles</li>
                        <li>Comprehensive elderly care features with health integration</li>
                        <li>Simultaneous temple service access across multiple locations</li>
                        <li>Shared spiritual calendar with family event coordination</li>
                        <li>Enhanced privacy controls for individual devotional practices</li>
                        <li>Family dashboard with collective spiritual journey tracking</li>
                    </ul>
                </div>
                <div class="tier-card">
                    <div class="tier-badge tier-institutional">Institutional</div>
                    <h4>Dharmic Sansthan (Organizations)</h4>
                    <ul>
                        <li>Bulk spiritual service coordination for community events</li>
                        <li>Custom temple partnership integration for organization needs</li>
                        <li>Advanced analytics for community engagement tracking</li>
                        <li>Dedicated customer support with spiritual consultation</li>
                        <li>White-label solutions for religious organizations</li>
                        <li>Custom API access for third-party integrations</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="info-callout">
            <h4>Advanced Personalization & AI Integration</h4>
            <p>Machine learning algorithms delivering personalized temple service recommendations:</p>
            <ul>
                <li><strong>Devotional Pattern Analysis:</strong> Tracking worship frequency, preferred deities, ceremony types, and spiritual engagement levels</li>
                <li><strong>Festival Preference Learning:</strong> Automatic detection of regional festivals and family traditions observed over time</li>
                <li><strong>Astrological Integration:</strong> Birth chart analysis for personalized muhurat recommendations and spiritual timing</li>
                <li><strong>Family Coordination Intelligence:</strong> Smart scheduling considering multiple family members' preferences and timezones</li>
                <li><strong>Regional Adaptation:</strong> Content automatically customized to local traditions, languages, deities, and cultural practices</li>
                <li><strong>Predictive Recommendations:</strong> Proactive suggestions for upcoming festivals, auspicious timings, and relevant spiritual services</li>
            </ul>
        </div>

        <div class="info-callout info-callout-accent">
            <h4>Optional Accessibility & Inclusive Design</h4>
            <p>Universal spiritual access principles ensuring devotees of all abilities can participate:</p>
            <ul>
                <li><strong>Multi-Language Support:</strong> Temple services in 15+ Indian languages (Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, Urdu, and regional dialects)</li>
                <li><strong>Audio Spiritual Description:</strong> Detailed audio narration of ceremonies for visually impaired devotees</li>
                <li><strong>Enhanced Subtitles:</strong> Real-time mantra transcription and translation for hearing impaired devotees</li>
                <li><strong>Elder-Friendly Design:</strong> Large text options (up to 200%), simplified navigation modes, voice-controlled spiritual service access</li>
                <li><strong>Cognitive Accessibility:</strong> Simplified interface modes with guided spiritual practice support and reduced visual complexity</li>
                <li><strong>Screen Reader Compatibility:</strong> Full VoiceOver (iOS) and TalkBack (Android) support throughout the app</li>
            </ul>
        </div>
    `;
    
    container.insertBefore(section, container.querySelector('.load-more-section'));
}

function loadAdminPanelSection(container) {
    const section = document.createElement('section');
    section.id = 'admin-panel';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">06</span>
            Admin Panel System
        </h2>
        
        <div class="content-block">
            <p class="lead-text">The comprehensive command and control center for the entire Dev Poojaan platform ecosystem—providing sophisticated management capabilities that ensure seamless operation across all devotee touchpoints, temple service workflows, and spiritual business operations.</p>
        </div>

        <div class="info-callout">
            <h4>Centralized Spiritual Platform Governance</h4>
            <p>The Admin Panel represents the operational nerve center, integrating all platform components:</p>
            <ul>
                <li><strong>Strategic Command Center:</strong> Unified management interface for devotee mobile app, temple systems, pandit tools, and payment processing</li>
                <li><strong>Real-Time Operations Control:</strong> Monitor platform health, manage devotee experiences, drive strategic decisions through comprehensive analytics</li>
                <li><strong>Enterprise-Scale Management:</strong> Built to handle millions of concurrent devotees, thousands of temple partners, and vast spiritual service catalogs</li>
                <li><strong>Cloud-Native Architecture:</strong> Auto-scaling capabilities ensuring consistent performance during peak spiritual seasons and major festivals</li>
            </ul>
        </div>

        <div class="admin-roles">
            <h3>Hierarchical Administration Structure</h3>
            <p class="tier-intro">Multi-dimensional administrative framework with role-based access controls mirroring traditional spiritual institution hierarchies:</p>
            <div class="role-grid">
                <div class="role-card role-super">
                    <div class="role-icon">👑</div>
                    <h4>Dharmadhikari (Super Administrator)</h4>
                    <p class="role-desc">Platform Spiritual Oversight - Ultimate decision-making authority</p>
                    <ul>
                        <li><strong>Complete Platform Authority:</strong> Ultimate control over all spiritual platform aspects including religious authenticity and policy</li>
                        <li><strong>Global Configuration Management:</strong> Platform-wide spiritual settings, feature management, dharmic policy enforcement</li>
                        <li><strong>Financial & Spiritual Oversight:</strong> Revenue monitoring, temple partnership management, investment decisions</li>
                        <li><strong>Religious Compliance:</strong> Vedic authenticity oversight, spiritual content policy, tradition maintenance</li>
                        <li><strong>Strategic Analytics:</strong> High-level engagement metrics, devotee growth analysis, service optimization insights</li>
                        <li><strong>Emergency Response:</strong> Crisis management protocols and rapid incident resolution authority</li>
                    </ul>
                </div>
                <div class="role-card role-temple">
                    <div class="role-icon">🛕</div>
                    <h4>Temple Partnership Administrator</h4>
                    <p class="role-desc">Sacred Institution Operations - Temple network and service quality</p>
                    <ul>
                        <li><strong>Temple Network Management:</strong> Comprehensive oversight of all temple partnerships, onboarding, quality control</li>
                        <li><strong>Pandit Relationship Management:</strong> Direct priest communication, verification, spiritual quality assurance programs</li>
                        <li><strong>Spiritual Service Strategy:</strong> Religious ceremony planning, festival coordination, exclusive content development</li>
                        <li><strong>Sacred Quality Assurance:</strong> Service moderation workflows, religious authenticity enforcement, content standards</li>
                        <li><strong>Devotional Trend Analysis:</strong> Service performance monitoring, devotee preference analysis, practice optimization</li>
                        <li><strong>Partnership Development:</strong> New temple acquisition, relationship cultivation, revenue optimization</li>
                    </ul>
                </div>
                <div class="role-card role-devotee">
                    <div class="role-icon">👥</div>
                    <h4>Devotee Experience Administrator</h4>
                    <p class="role-desc">Spiritual Customer Journey - Devotee satisfaction and community management</p>
                    <ul>
                        <li><strong>Customer Service Excellence:</strong> Comprehensive devotee support management, spiritual consultation, satisfaction optimization</li>
                        <li><strong>Community Management:</strong> Devotee community oversight, spiritual forum moderation, discussion facilitation</li>
                        <li><strong>UX Optimization:</strong> Interface improvement recommendations for devotional accessibility and journey enhancement</li>
                        <li><strong>Crisis Management:</strong> Rapid response to spiritual service issues, devotee concern escalation, emergency support</li>
                        <li><strong>Feedback Integration:</strong> Spiritual experience analysis, religious service improvement requests, devotee-driven enhancements</li>
                        <li><strong>Retention Strategies:</strong> Churn prediction, proactive intervention, devotee lifecycle management</li>
                    </ul>
                </div>
                <div class="role-card role-analytics">
                    <div class="role-icon">📊</div>
                    <h4>Spiritual Analytics Administrator</h4>
                    <p class="role-desc">Dharmic Data Intelligence - Business intelligence and performance insights</p>
                    <ul>
                        <li><strong>Business Intelligence:</strong> Comprehensive platform performance analysis, devotee behavior insights, engagement interpretation</li>
                        <li><strong>Performance Monitoring:</strong> Real-time platform health for spiritual services, temple connectivity, predictive maintenance</li>
                        <li><strong>Revenue & Donation Analytics:</strong> Financial performance tracking, temple partnership optimization, revenue forecasting</li>
                        <li><strong>Devotee Research:</strong> Spiritual audience segmentation analysis, devotional journey mapping, behavioral pattern identification</li>
                        <li><strong>Competitive Intelligence:</strong> Spiritual market analysis, religious platform positioning, dharmic industry trend monitoring</li>
                        <li><strong>Executive Reporting:</strong> Board-ready presentations, KPI dashboards, strategic decision support</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="admin-features">
            <h3>Core Admin Features & Capabilities</h3>
            <div class="feature-boxes">
                <div class="feature-box">
                    <div class="feature-box-icon">🔐</div>
                    <h4>Authentication & Access Control</h4>
                    <ul>
                        <li><strong>Role-Based Login:</strong> Dharmadhikari, Temple Admin, Devotee Admin, Analytics Admin classifications</li>
                        <li><strong>Multi-Factor Security:</strong> 2FA/MFA mandatory for all admin access with authenticator app support</li>
                        <li><strong>Access Control Matrix:</strong> Granular permission levels for spiritual content, temple management, devotee oversight</li>
                        <li><strong>IP Whitelisting:</strong> Restricted access from approved locations and networks</li>
                        <li><strong>Religious Activity Logging:</strong> Comprehensive audit trails for all administrative actions</li>
                        <li><strong>Time-Based Access:</strong> Scheduled access windows for contractors and temporary staff</li>
                        <li><strong>Emergency Access Protocols:</strong> Break-glass procedures for critical spiritual service incidents</li>
                    </ul>
                </div>
                <div class="feature-box">
                    <div class="feature-box-icon">🛕</div>
                    <h4>Temple & Service Management</h4>
                    <ul>
                        <li><strong>Temple Onboarding:</strong> Verification workflow, partnership agreements, spiritual service integration</li>
                        <li><strong>Puja Scheduling System:</strong> Advanced calendar management, conflict resolution, capacity planning</li>
                        <li><strong>Pandit Management:</strong> Priest verification, performance tracking, dakshina distribution, quality ratings</li>
                        <li><strong>Live Streaming Setup:</strong> Camera configuration, stream quality monitoring, broadcast scheduling</li>
                        <li><strong>Sacred Content Organization:</strong> Religious ceremony categorization, festival scheduling, quality control</li>
                        <li><strong>Offering Fulfillment:</strong> Chadhava order management, delivery tracking, photo/video proof upload</li>
                        <li><strong>Temple Analytics:</strong> Service popularity, revenue per temple, devotee satisfaction scores</li>
                    </ul>
                </div>
                <div class="feature-box">
                    <div class="feature-box-icon">👥</div>
                    <h4>Devotee Management</h4>
                    <ul>
                        <li><strong>Complete User Registry:</strong> Full devotee database with advanced search and filtering</li>
                        <li><strong>Engagement Filtering:</strong> Active, dormant, churned user segmentation</li>
                        <li><strong>Account Management:</strong> Subscription modifications, tier upgrades, account suspensions</li>
                        <li><strong>User Categorization:</strong> Regular devotees, premium subscribers, family plans, institutional users</li>
                        <li><strong>Support Integration:</strong> Ticket management, devotee communication history, issue resolution tracking</li>
                        <li><strong>Devotee Lifetime Value:</strong> CLV calculations, retention predictions, personalization recommendations</li>
                        <li><strong>Behavioral Segmentation:</strong> Worship patterns, spending habits, feature usage analytics</li>
                    </ul>
                </div>
                <div class="feature-box">
                    <div class="feature-box-icon">📈</div>
                    <h4>Analytics & Reporting</h4>
                    <ul>
                        <li><strong>Devotee Engagement Metrics:</strong> Daily active users, session duration, temple service consumption patterns</li>
                        <li><strong>Sacred Service Performance:</strong> Puja booking rates, streaming engagement, satisfaction ratings, trending services</li>
                        <li><strong>Spiritual Revenue Analytics:</strong> Temple partnership earnings, subscription metrics, donation tracking, revenue forecasting</li>
                        <li><strong>System Monitoring:</strong> Temple connectivity status, streaming quality metrics, API response times, error rates</li>
                        <li><strong>Executive Dashboards:</strong> High-level KPIs, growth trends, financial summaries for leadership</li>
                        <li><strong>Custom Report Builder:</strong> Ad-hoc query tool for specific data analysis needs</li>
                        <li><strong>Export Capabilities:</strong> CSV, Excel, PDF export for offline analysis and presentations</li>
                    </ul>
                </div>
                <div class="feature-box">
                    <div class="feature-box-icon">💰</div>
                    <h4>Financial Management</h4>
                    <ul>
                        <li><strong>Subscription Oversight:</strong> Plan management, billing cycle monitoring, payment processing status</li>
                        <li><strong>Temple Partnership Payments:</strong> Revenue sharing calculations, automated payouts, settlement tracking</li>
                        <li><strong>Pandit Dakshina Processing:</strong> Spiritual service provider compensation, performance-based bonuses</li>
                        <li><strong>Financial Reporting:</strong> Revenue reports, expense tracking, profit analysis, tax compliance documentation</li>
                        <li><strong>Payment Gateway Management:</strong> Multiple payment methods, fraud prevention, chargeback handling</li>
                        <li><strong>Refund Processing:</strong> Automated refund workflows, dispute resolution, devotee satisfaction protection</li>
                        <li><strong>FinOps Dashboard:</strong> Cost optimization, budget tracking, ROI analysis by service type</li>
                    </ul>
                </div>
                <div class="feature-box">
                    <div class="feature-box-icon">💬</div>
                    <h4>Communication & Support</h4>
                    <ul>
                        <li><strong>Temple Partnership Messaging:</strong> Direct communication channels with temple administrators and pandits</li>
                        <li><strong>Devotee Support Tickets:</strong> Comprehensive ticket system with priority queues and SLA tracking</li>
                        <li><strong>Internal Team Coordination:</strong> Admin-to-admin messaging, task assignment, status updates</li>
                        <li><strong>Platform Announcements:</strong> Broadcast notifications to all users or specific segments</li>
                        <li><strong>Festival Alert System:</strong> Automated campaign management for upcoming religious events</li>
                        <li><strong>Email/SMS Campaigns:</strong> Marketing automation for devotee engagement and retention</li>
                        <li><strong>Push Notification Management:</strong> Targeted notifications with A/B testing capabilities</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="info-callout">
            <h4>Operational Intelligence & System Monitoring</h4>
            <p>Real-time platform health monitoring and business intelligence capabilities:</p>
            <ul>
                <li><strong>System Performance Analytics:</strong> Temple connectivity monitoring (uptime 99.9% target), streaming quality analysis, platform response times</li>
                <li><strong>Devotee Experience Monitoring:</strong> Real-time UX tracking, devotional bottleneck identification, service optimization recommendations</li>
                <li><strong>Content Delivery Optimization:</strong> Temple streaming performance, spiritual content quality analysis, global delivery optimization</li>
                <li><strong>Security Monitoring:</strong> Intrusion detection, spiritual service protection, devotional data safeguards, real-time threat alerts</li>
                <li><strong>Scalability Management:</strong> Automatic resource scaling for festivals, peak load management, infrastructure cost optimization</li>
                <li><strong>SLA Compliance Tracking:</strong> Service level objective monitoring, error budget management, incident response metrics</li>
            </ul>
        </div>

        <div class="info-callout info-callout-accent">
            <h4>Religious Compliance & Spiritual Governance</h4>
            <p>Ensuring cultural sensitivity and regulatory adherence across all operations:</p>
            <ul>
                <li><strong>Cultural & Religious Sensitivity:</strong> Regional religious practice adherence, cultural authenticity monitoring, traditional compliance tracking</li>
                <li><strong>Content Regulation Compliance:</strong> Religious content standards, spiritual age appropriateness, cultural sensitivity oversight</li>
                <li><strong>Financial Regulation Adherence:</strong> Donation processing compliance (80G tax exemption documentation), transaction monitoring, reporting requirements</li>
                <li><strong>Accessibility Standards:</strong> WCAG 2.1 AA compliance monitoring, inclusive spiritual design implementation, accessibility feature optimization</li>
                <li><strong>Data Privacy Compliance:</strong> GDPR for international users, data localization for Indian regulations, consent management</li>
                <li><strong>Audit Trail Maintenance:</strong> Immutable logs for all administrative actions, regulatory reporting capability, forensic analysis support</li>
            </ul>
        </div>
    `;
    
    container.insertBefore(section, container.querySelector('.load-more-section'));
}

function loadTechnicalSpecsSection(container) {
    const section = document.createElement('section');
    section.id = 'technical-specs';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">07</span>
            Technical Specifications & Infrastructure
        </h2>
        
        <div class="content-block">
            <p class="lead-text">Comprehensive technical infrastructure covering security, performance, compliance, and operational excellence—designed to support millions of devotees across global spiritual journeys.</p>
        </div>

        <div class="info-callout">
            <h4>Infrastructure Philosophy</h4>
            <p>Built on cloud-native principles with enterprise-grade reliability:</p>
            <ul>
                <li><strong>Scalability:</strong> Auto-scaling architecture handling festival traffic spikes (10x normal load) without degradation</li>
                <li><strong>Reliability:</strong> Multi-region deployment with 99.9% uptime SLA and automated failover capabilities</li>
                <li><strong>Performance:</strong> Sub-second API responses, <2s page loads, and <1s video streaming latency for premium services</li>
                <li><strong>Security:</strong> Zero-trust architecture, end-to-end encryption, and continuous security monitoring</li>
            </ul>
        </div>

        <div class="tech-spec-grid">
            <div class="tech-spec-card">
                <h3>🔒 Security & Compliance</h3>
                <div class="spec-content">
                    <h4>Security Measures</h4>
                    <ul>
                        <li><strong>End-to-End Encryption:</strong> TLS 1.3 for all data in transit, AES-256 for data at rest</li>
                        <li><strong>Multi-Factor Authentication:</strong> Mandatory 2FA/MFA for all admin access, optional for devotees</li>
                        <li><strong>Role-Based Access Control:</strong> Granular RBAC with least-privilege principle across all systems</li>
                        <li><strong>Security Audits:</strong> Quarterly penetration testing, annual security audits, continuous vulnerability scanning</li>
                        <li><strong>DDoS Protection:</strong> Google Cloud Armor WAF with rate limiting and bot detection</li>
                        <li><strong>Data Encryption:</strong> Customer-managed encryption keys (CMEK) via Cloud KMS, encrypted backups</li>
                        <li><strong>Secrets Management:</strong> HashiCorp Vault or Google Secret Manager for API keys, credentials</li>
                        <li><strong>Security Monitoring:</strong> Real-time intrusion detection, SIEM integration, automated incident response</li>
                    </ul>
                    <h4>Compliance Standards</h4>
                    <ul>
                        <li><strong>GDPR Compliance:</strong> EU data protection for international users, right to erasure, data portability</li>
                        <li><strong>PCI DSS Level 1:</strong> Payment card industry standards for secure payment processing</li>
                        <li><strong>SOC 2 Type II:</strong> Certification for enterprise variants demonstrating security, availability, confidentiality</li>
                        <li><strong>ISO 27001:</strong> Information security management system certification (roadmap for Variant 6)</li>
                        <li><strong>Religious Content Guidelines:</strong> Cultural sensitivity standards, regional compliance, content moderation policies</li>
                        <li><strong>Accessibility Standards:</strong> WCAG 2.1 AA compliance for inclusive spiritual experiences</li>
                        <li><strong>Data Localization:</strong> Compliance with Indian data residency requirements (RBI, MEITY guidelines)</li>
                        <li><strong>80G Tax Compliance:</strong> Donation receipt management, audit trail for charitable contributions</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>⚡ Performance & Scalability</h3>
                <div class="spec-content">
                    <h4>Performance Targets</h4>
                    <ul>
                        <li><strong>Page Load Time:</strong> <1.5s Largest Contentful Paint (LCP) on 4G connections</li>
                        <li><strong>API Response Time:</strong> <150ms p95, <200ms p99 for all REST/GraphQL endpoints</li>
                        <li><strong>Video Streaming Latency:</strong> <3 seconds for standard HLS streams, <1s for WebRTC premium</li>
                        <li><strong>Time to Interactive (TTI):</strong> <3.5s on mid-tier devices ensuring responsive devotee interactions</li>
                        <li><strong>First Input Delay (FID):</strong> <100ms for instant user interaction feedback</li>
                        <li><strong>Cumulative Layout Shift:</strong> <0.1 for stable visual spiritual experience</li>
                        <li><strong>Database Query Performance:</strong> <50ms for 95% of queries with proper indexing</li>
                        <li><strong>Mobile App Cold Start:</strong> <2s on React Native with optimized bundles</li>
                    </ul>
                    <h4>Scalability Architecture</h4>
                    <ul>
                        <li><strong>Auto-Scaling:</strong> Horizontal pod autoscaling on GKE based on CPU/memory/custom metrics</li>
                        <li><strong>Multi-Region Deployment:</strong> Primary in asia-south1 (Mumbai), replica in us-central1 for global NRIs</li>
                        <li><strong>CDN Distribution:</strong> Google Cloud CDN + Cloudflare multi-CDN for 99.99% availability</li>
                        <li><strong>Database Sharding:</strong> Horizontal partitioning for devotee data supporting 10M+ users</li>
                        <li><strong>Load Balancing:</strong> Global load balancer with health checks and automatic failover</li>
                        <li><strong>Caching Strategy:</strong> Multi-tier caching (Redis, CDN, browser) for <100ms response times</li>
                        <li><strong>Festival Traffic Handling:</strong> Pre-scaling during major festivals (Diwali, Navratri) supporting 10x load</li>
                        <li><strong>Queue Management:</strong> Cloud Pub/Sub for async processing, preventing service degradation</li>
                    </ul>
                    <h4>SLA Commitments</h4>
                    <ul>
                        <li><strong>Uptime:</strong> 99.9% for Variants 4-6 (8.76 hours downtime/year), 99.5% for Variants 1-3</li>
                        <li><strong>Recovery Time Objective (RTO):</strong> <1 hour for critical spiritual services</li>
                        <li><strong>Recovery Point Objective (RPO):</strong> <15 minutes data loss tolerance with continuous replication</li>
                        <li><strong>Mean Time to Recovery (MTTR):</strong> <30 minutes for P1 incidents during festivals</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>🎥 Streaming Architecture</h3>
                <div class="spec-content">
                    <h4>Video Delivery Infrastructure</h4>
                    <ul>
                        <li><strong>Adaptive Bitrate Streaming:</strong> Multiple quality tiers (360p, 480p, 720p, 1080p, 4K) with automatic switching</li>
                        <li><strong>Multiple Quality Options:</strong> Bandwidth-optimized for 2G (360p) through 5G (4K) networks</li>
                        <li><strong>DRM Protection:</strong> Widevine (Android), FairPlay (iOS), PlayReady (Windows) for premium content</li>
                        <li><strong>Live Streaming:</strong> Real-time temple ceremonies with DVR capabilities, pause/rewind during live events</li>
                        <li><strong>Recording Capability:</strong> Automatic recording of all live pujas, 30-day retention for premium users</li>
                        <li><strong>Multi-CDN Strategy:</strong> Primary on Google Cloud CDN, fallback to Cloudflare for 99.99% availability</li>
                        <li><strong>AI Upscaling:</strong> ML-based video enhancement for low-light temple environments (Topaz API)</li>
                        <li><strong>Transcoding Pipeline:</strong> Automated video processing (FFmpeg) generating multiple quality variants</li>
                    </ul>
                    <h4>Streaming Protocols</h4>
                    <ul>
                        <li><strong>HLS (HTTP Live Streaming):</strong> Primary protocol for standard live and recorded streaming (3-5s latency)</li>
                        <li><strong>WebRTC:</strong> Ultra-low latency (<1s) for premium interactive darshan experiences</li>
                        <li><strong>DASH:</strong> Dynamic Adaptive Streaming over HTTP for advanced scenarios and offline sync</li>
                        <li><strong>SRT (Secure Reliable Transport):</strong> Temple-side ingest over unreliable networks, 200ms latency</li>
                        <li><strong>RTMP Fallback:</strong> Legacy temple camera support with automatic transcoding to modern formats</li>
                    </ul>
                    <h4>Audio/Video Quality</h4>
                    <ul>
                        <li><strong>Video Codecs:</strong> H.264/AVC for compatibility, H.265/HEVC for 4K with 50% bandwidth savings</li>
                        <li><strong>Audio Codecs:</strong> AAC-LC for efficient audio, Opus for low-latency scenarios</li>
                        <li><strong>Bitrate Range:</strong> 500 Kbps (360p) to 20 Mbps (4K) with dynamic adjustment</li>
                        <li><strong>Frame Rate:</strong> 24-30 fps for standard ceremonies, 60 fps for high-motion festival events</li>
                        <li><strong>Audio Quality:</strong> 128 Kbps stereo ensuring clear mantra and music reproduction</li>
                    </ul>
                    <h4>Monitoring & Analytics</h4>
                    <ul>
                        <li><strong>Quality of Experience (QoE):</strong> Real-time monitoring of buffering ratio, startup time, bitrate distribution</li>
                        <li><strong>Engagement Metrics:</strong> View duration, completion rate, rewind/replay patterns for content optimization</li>
                        <li><strong>Health Monitoring:</strong> Stream uptime, encoder status, CDN performance across global regions</li>
                        <li><strong>Alerting:</strong> Automated alerts for stream failures, quality degradation, abnormal buffering</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>🗄️ Data Management</h3>
                <div class="spec-content">
                    <h4>Database Architecture</h4>
                    <ul>
                        <li><strong>PostgreSQL (Cloud SQL):</strong> Primary transactional database for devotee accounts, bookings, payments (Variants 1-4)</li>
                        <li><strong>Cloud Spanner:</strong> Globally consistent database for multi-region deployments (Variants 5-6), 99.999% availability</li>
                        <li><strong>Redis (Memorystore):</strong> In-memory caching for sessions, frequently accessed spiritual data, sub-millisecond reads</li>
                        <li><strong>Firestore:</strong> Real-time database for live notifications, chat, devotee presence, offline sync</li>
                        <li><strong>BigQuery:</strong> Data warehouse for analytics, devotee behavior analysis, ML feature stores</li>
                        <li><strong>Cloud Storage:</strong> Object storage for media assets (videos, images), lifecycle policies for cost optimization</li>
                        <li><strong>Bigtable:</strong> High-throughput NoSQL for event streams, IoT data from temple sensors (Variant 6)</li>
                        <li><strong>Neo4j:</strong> Graph database for family relationship mapping, recommendation engines (Variant 6)</li>
                    </ul>
                    <h4>Data Protection & Recovery</h4>
                    <ul>
                        <li><strong>Automated Backups:</strong> Daily full backups, hourly incremental backups, 30-day retention</li>
                        <li><strong>Point-in-Time Recovery:</strong> Restore to any second within 7-day window for PostgreSQL/Spanner</li>
                        <li><strong>Cross-Region Replication:</strong> Synchronous replication for Spanner, asynchronous for Cloud SQL read replicas</li>
                        <li><strong>Disaster Recovery Plan:</strong> RPO <1 hour, RTO <1 hour with automated failover to secondary region</li>
                        <li><strong>Data Retention Policies:</strong> 7 years for financial records, 3 years for devotee activity, GDPR-compliant deletion</li>
                        <li><strong>Backup Testing:</strong> Monthly restoration drills, quarterly disaster recovery simulations</li>
                        <li><strong>Data Archival:</strong> Cold storage (Nearline/Coldline) for historical data with 90%+ cost savings</li>
                    </ul>
                    <h4>Data Privacy & Governance</h4>
                    <ul>
                        <li><strong>Data Classification:</strong> Public, internal, confidential, restricted tiers with appropriate access controls</li>
                        <li><strong>PII Protection:</strong> Tokenization of sensitive devotee data, pseudonymization for analytics</li>
                        <li><strong>Data Loss Prevention:</strong> Google DLP API scanning for accidental PII exposure in logs</li>
                        <li><strong>Consent Management:</strong> Granular permissions for marketing, analytics, data sharing with audit trail</li>
                        <li><strong>Right to Erasure:</strong> Automated GDPR deletion workflows completing within 30 days</li>
                        <li><strong>Data Lineage:</strong> Tracking data flow from source to destination for compliance and debugging</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>🔄 CI/CD & DevOps</h3>
                <div class="spec-content">
                    <h4>Continuous Integration</h4>
                    <ul>
                        <li><strong>GitHub Actions:</strong> Automated testing on every commit—unit, integration, E2E test suites</li>
                        <li><strong>Code Quality Checks:</strong> ESLint, Prettier, SonarQube for code standards and technical debt tracking</li>
                        <li><strong>Test Coverage:</strong> 80%+ unit test coverage mandate, 60%+ integration coverage, critical path E2E tests</li>
                        <li><strong>Security Scanning:</strong> Snyk for dependency vulnerabilities, Trivy for container image scanning, GitGuardian for secrets</li>
                        <li><strong>Automated Dependency Updates:</strong> Renovate bot for automated PRs, Dependabot security alerts</li>
                        <li><strong>Build Optimization:</strong> Docker layer caching, incremental builds reducing CI time by 60%</li>
                        <li><strong>Quality Gates:</strong> Passing tests, no critical vulnerabilities, code coverage thresholds enforced pre-merge</li>
                    </ul>
                    <h4>Continuous Deployment</h4>
                    <ul>
                        <li><strong>GitOps Workflow:</strong> Argo CD for declarative deployments, Git as single source of truth</li>
                        <li><strong>Canary Deployments:</strong> Gradual rollout (10% → 25% → 50% → 100%) with automated rollback on errors</li>
                        <li><strong>Blue/Green Deployment:</strong> Zero-downtime releases with instant rollback capability</li>
                        <li><strong>Feature Flags:</strong> LaunchDarkly/ConfigCat for progressive feature rollout, A/B testing, kill switches</li>
                        <li><strong>Automated Rollback:</strong> Triggered on error rate spike, latency degradation, or custom metrics</li>
                        <li><strong>Infrastructure as Code:</strong> Terraform for GCP resources, Helm charts for Kubernetes, version-controlled configs</li>
                        <li><strong>Multi-Environment Strategy:</strong> Dev, staging, production environments with production parity</li>
                        <li><strong>Release Cadence:</strong> Weekly mobile releases (OTA via CodePush), daily backend deployments during non-peak</li>
                    </ul>
                    <h4>Platform Engineering</h4>
                    <ul>
                        <li><strong>Container Orchestration:</strong> Google Kubernetes Engine (GKE) with auto-scaling, self-healing pods</li>
                        <li><strong>Service Mesh:</strong> Istio for traffic management, observability, security (mTLS) between microservices</li>
                        <li><strong>API Gateway:</strong> Kong/Apigee for rate limiting, authentication, request transformation, analytics</li>
                        <li><strong>Configuration Management:</strong> ConfigMaps, Secrets in Kubernetes, external config via Spring Cloud Config</li>
                        <li><strong>Developer Portal:</strong> Internal platform with runbooks, APIs, deployment pipelines, monitoring dashboards</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>📊 Monitoring & Observability</h3>
                <div class="spec-content">
                    <h4>Monitoring Stack</h4>
                    <ul>
                        <li><strong>Google Cloud Monitoring:</strong> Infrastructure metrics, uptime checks, alerting policies</li>
                        <li><strong>Prometheus:</strong> Time-series metrics collection from Kubernetes workloads, custom business metrics</li>
                        <li><strong>Grafana:</strong> Visualization dashboards for ops, executives, temple partners with role-based views</li>
                        <li><strong>Cloud Logging:</strong> Centralized log aggregation, structured logging (JSON), log-based metrics</li>
                        <li><strong>Error Tracking:</strong> Sentry for real-time error reporting, stack traces, breadcrumb trails</li>
                        <li><strong>APM (Application Performance Monitoring):</strong> New Relic/Datadog for transaction tracing, code-level insights</li>
                    </ul>
                    <h4>Observability Capabilities</h4>
                    <ul>
                        <li><strong>Distributed Tracing:</strong> OpenTelemetry instrumentation tracking requests across 20+ microservices</li>
                        <li><strong>Real-Time Alerting:</strong> PagerDuty integration, on-call rotation, escalation policies, incident management</li>
                        <li><strong>SLO/SLI Tracking:</strong> Service level objectives for availability, latency, error rates with error budgets</li>
                        <li><strong>Performance Profiling:</strong> Continuous profiling identifying CPU/memory bottlenecks, flame graphs</li>
                        <li><strong>Real User Monitoring (RUM):</strong> Browser/mobile performance data, Core Web Vitals, user journey analytics</li>
                        <li><strong>Synthetic Monitoring:</strong> Proactive uptime checks from multiple global locations, API health checks</li>
                        <li><strong>Log Analytics:</strong> BigQuery integration for complex log queries, anomaly detection via ML</li>
                    </ul>
                    <h4>Incident Management</h4>
                    <ul>
                        <li><strong>On-Call Rotation:</strong> 24x7 coverage during festivals, 24x5 standard, follow-the-sun model for global teams</li>
                        <li><strong>Incident Response Playbooks:</strong> Runbooks for common scenarios (streaming outage, DB failover, DDoS)</li>
                        <li><strong>Post-Mortem Culture:</strong> Blameless post-mortems for every P1 incident, action items tracked to completion</li>
                        <li><strong>Chaos Engineering:</strong> Quarterly game days testing failover, load handling, degraded service scenarios</li>
                        <li><strong>Status Page:</strong> Public-facing status.devpoojaan.com for transparency on service health</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="platform-compatibility">
            <h3>Platform Compatibility & Device Support</h3>
            <div class="compatibility-grid">
                <div class="compatibility-item">
                    <div class="compatibility-icon">📱</div>
                    <h4>Mobile Platforms</h4>
                    <p><strong>iOS:</strong> 13.0+, iPhone 8 and newer, iPad (all models with iOS 13+), iPadOS optimization</p>
                    <p><strong>Android:</strong> 8.0+ (API 26+), ARMv7/ARM64, x86 support for tablets</p>
                    <p><strong>PWA:</strong> All modern mobile browsers (Chrome, Safari, Firefox, Samsung Internet)</p>
                    <p><strong>Device Coverage:</strong> 95%+ of active Indian smartphones (mid-tier and above)</p>
                </div>
                <div class="compatibility-item">
                    <div class="compatibility-icon">💻</div>
                    <h4>Desktop Platforms</h4>
                    <p><strong>Windows:</strong> Windows 10 (1903+) and Windows 11, Edge/Chrome recommended</p>
                    <p><strong>macOS:</strong> macOS 10.15 Catalina and newer, Safari/Chrome optimized</p>
                    <p><strong>Linux:</strong> Ubuntu 20.04+, Fedora 35+, Chrome/Firefox support</p>
                    <p><strong>Screen Resolution:</strong> Optimized for 1366x768 to 4K displays</p>
                </div>
                <div class="compatibility-item">
                    <div class="compatibility-icon">🌐</div>
                    <h4>Web Browsers</h4>
                    <p><strong>Chrome:</strong> Latest 2 major versions (100+ million Indian users)</p>
                    <p><strong>Safari:</strong> Latest 2 major versions (iOS/macOS primary)</p>
                    <p><strong>Firefox:</strong> Latest 2 major versions (privacy-conscious devotees)</p>
                    <p><strong>Edge:</strong> Latest 2 major versions (Chromium-based, Windows default)</p>
                    <p><strong>Progressive Enhancement:</strong> Graceful degradation for older browsers</p>
                </div>
            </div>
        </div>

    `;
    
    container.insertBefore(section, container.querySelector('.load-more-section'));
}

function loadRecommendationsSection(container) {
    const section = document.createElement('section');
    section.id = 'recommendations';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">08</span>
            Recommendations & Next Steps
        </h2>
        
        <div class="content-block">
            <p class="lead-text">Strategic roadmap for successful Dev Poojaan platform implementation and launch.</p>
        </div>

        <div class="info-callout">
            <h4>Key Recommendations</h4>
            <ul>
                <li><strong>Approve Variant 4 as Baseline:</strong> Scalable Hybrid architecture balances scalability, cost (₹7.2L initial, ₹12.5L 3-year TCO), and 20-week time-to-market while keeping roadmap optionality for Variant 5 as adoption grows</li>
                <li><strong>Pre-Project Mobilization (4 weeks):</strong> Vendor contracting for streaming (Mux/Ant Media), payments (Razorpay/Cashfree), DRM (EZDRM), GCP organization provisioning, and hiring for critical roles (architect, SRE, streaming specialist)</li>
                <li><strong>Governance Structure:</strong> Stand up architecture board, change advisory board, security champions, and FinOps cadence to support development and ensure platform quality</li>
                <li><strong>Discovery Workshops:</strong> Conduct detailed sessions with temple partners and devotee personas to validate priority epics before sprint 0, ensuring product-market fit</li>
                <li><strong>KPI Establishment:</strong> Define uptime (99.9% target), engagement metrics, subscription conversion goals, and instrumentation blueprint for data-driven decision making from day one</li>
            </ul>
        </div>

        <div class="info-callout info-callout-accent">
            <h4>Implementation Roadmap</h4>
            <ul>
                <li><strong>Phase 0 (Weeks 1-2):</strong> Discovery workshops, architecture baseline, GCP project setup, vendor selection finalization</li>
                <li><strong>Phase 1 (Weeks 3-4):</strong> Design system creation, platform scaffolding, security baseline establishment, team onboarding</li>
                <li><strong>Phase 2 (Weeks 5-8):</strong> Core user journeys, admin SSR pages, authentication federation, streaming integration POC</li>
                <li><strong>Phase 3 (Weeks 9-12):</strong> Microservices build-out (catalog, scheduling, payments, streaming), Pub/Sub event bus, Redis caching</li>
                <li><strong>Phase 4 (Weeks 13-16):</strong> Observability stack (Prometheus, Grafana), chaos testing, performance tuning, load testing to 10k+ concurrent</li>
                <li><strong>Phase 5 (Weeks 17-20):</strong> End-to-end regression, localization (15+ languages), compliance readiness, launch preparation, hypercare planning</li>
            </ul>
        </div>

        <div class="content-block">
            <h3>Critical Success Factors</h3>
            <div class="feature-boxes">
                <div class="feature-box">
                    <div class="feature-box-icon">👥</div>
                    <h4>Team Assembly</h4>
                    <ul>
                        <li>Product Manager (0.75 FTE) for roadmap ownership</li>
                        <li>Enterprise Architect (0.75 FTE) for technical leadership</li>
                        <li>3x React Native Engineers for mobile development</li>
                        <li>3x Backend Engineers (Node/Express) for microservices</li>
                        <li>1.5x DevOps/SRE for infrastructure and reliability</li>
                        <li>1.5x QA Engineers (automation + manual)</li>
                        <li>Security Analyst (0.4 FTE) for compliance</li>
                    </ul>
                </div>
                <div class="feature-box">
                    <div class="feature-box-icon">🔧</div>
                    <h4>Technology Stack</h4>
                    <ul>
                        <li>React Native 0.76 with Hermes for mobile apps</li>
                        <li>Next.js with React 18 for admin portal</li>
                        <li>Express.js microservices on GKE with Istio</li>
                        <li>PostgreSQL + Redis + Firestore data layer</li>
                        <li>Ant Media Server for WebRTC streaming</li>
                        <li>Google Cloud Platform (asia-south1 primary)</li>
                    </ul>
                </div>
                <div class="feature-box">
                    <div class="feature-box-icon">🎯</div>
                    <h4>Success Metrics</h4>
                    <ul>
                        <li>99.9% uptime SLA (43.8 minutes downtime/month)</li>
                        <li>< 2s page load time (LCP) on 4G connections</li>
                        <li>< 1s video streaming latency for premium WebRTC</li>
                        <li>10,000+ concurrent users capacity at launch</li>
                        <li>80%+ test coverage (unit + integration)</li>
                        <li>< 30 day devotee onboarding to first puja</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    container.insertBefore(section, container.querySelector('.load-more-section'));
}

function loadAppendicesSection(container) {
    const section = document.createElement('section');
    section.id = 'appendices';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">09</span>
            Appendices & Reference
        </h2>
        
        <div class="content-block">
            <p class="lead-text">Comprehensive reference materials for implementation, including role definitions, quality gates, and dependency management.</p>
        </div>

        <div class="content-block">
            <h3>Appendix A: Role Competency Matrix</h3>
            <div class="info-callout">
                <h4>Core Team Roles & Responsibilities</h4>
                <ul>
                    <li><strong>Product Manager:</strong> Owns roadmap, stakeholder alignment, KPI tracking, sprint planning, and devotee feedback prioritization</li>
                    <li><strong>Solution/Enterprise Architect:</strong> Designs reference architecture, enforces standards, leads threat modeling, technology evaluation</li>
                    <li><strong>React Native Engineer:</strong> Builds cross-platform mobile experiences, integrates native modules, ensures performance budgets, accessibility</li>
                    <li><strong>Backend Engineer (Node/Express):</strong> Implements microservices, API contracts, unit/integration tests, ensures security controls</li>
                    <li><strong>DevOps/SRE:</strong> Automates infrastructure (Terraform), manages CI/CD, observability dashboards, incident response, capacity planning</li>
                    <li><strong>QA Automation:</strong> Develops automated test suites (Detox, Cypress), manages device lab, enforces quality gates</li>
                    <li><strong>Security Engineer:</strong> Conducts threat modeling (STRIDE), manages IAM policies, runs penetration tests, ensures compliance</li>
                    <li><strong>Data Engineer:</strong> Owns analytics pipelines (BigQuery), data warehouse architecture, ML feature stores, ETL processes</li>
                    <li><strong>Streaming Specialist:</strong> Configures ingest pipelines (SRT, WebRTC), monitors latency, optimizes CDN strategy, DRM implementation</li>
                </ul>
            </div>
        </div>

        <div class="content-block">
            <h3>Appendix B: Quality Gates & Exit Criteria</h3>
            <div class="comparison-table-wrapper">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Quality Gate</th>
                            <th>Timing</th>
                            <th>Exit Criteria</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Architecture Review</strong></td>
                            <td>Discovery (Weeks 1-3)</td>
                            <td>Target architecture approved, NFR baseline defined, technology choices validated</td>
                        </tr>
                        <tr>
                            <td><strong>Security Threat Model</strong></td>
                            <td>Prior to development</td>
                            <td>STRIDE documentation complete, mitigation backlog accepted, security controls identified</td>
                        </tr>
                        <tr>
                            <td><strong>Design Playback</strong></td>
                            <td>Before sprint 3</td>
                            <td>UX flows signed off, accessibility acceptance criteria defined (WCAG 2.1 AA)</td>
                        </tr>
                        <tr>
                            <td><strong>API Contract Freeze</strong></td>
                            <td>Mid-build (Week 10)</td>
                            <td>OpenAPI/GraphQL schemas versioned, consumers validated, backward compatibility ensured</td>
                        </tr>
                        <tr>
                            <td><strong>Performance Certification</strong></td>
                            <td>Pre-launch (Week 16)</td>
                            <td>Meets load targets (10k users), latency budgets (<200ms p95), error budgets intact</td>
                        </tr>
                        <tr>
                            <td><strong>Compliance Review</strong></td>
                            <td>Pre-launch (Week 18)</td>
                            <td>Data privacy (GDPR), payments (PCI DSS), accessibility verified, legal sign-off</td>
                        </tr>
                        <tr>
                            <td><strong>Launch Readiness</strong></td>
                            <td>Final sprint (Week 20)</td>
                            <td>Runbooks complete, monitoring dashboards live, on-call rotation assigned, DR tested</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="content-block">
            <h3>Appendix C: Cross-Variant Dependency Matrix</h3>
            <div class="comparison-table-wrapper">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Dependency</th>
                            <th>Variants Impacted</th>
                            <th>Required Timing</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Streaming vendor contract (Mux/Ant Media/Wowza)</td>
                            <td>1-6 (All variants)</td>
                            <td>Before week 5</td>
                            <td>Determines DRM strategy and CDN selection</td>
                        </tr>
                        <tr>
                            <td>Payment gateway compliance (Razorpay/Cashfree)</td>
                            <td>1-6 (All variants)</td>
                            <td>Before week 8</td>
                            <td>KYC, merchant onboarding, SCA requirements</td>
                        </tr>
                        <tr>
                            <td>DRM licensing (EZDRM)</td>
                            <td>4-6 (Advanced variants)</td>
                            <td>Before week 10</td>
                            <td>Mandatory for premium live streams and recorded content</td>
                        </tr>
                        <tr>
                            <td>Cloud infrastructure provisioning (GCP org, IAM)</td>
                            <td>3-6 (Cloud-native)</td>
                            <td>Week 1</td>
                            <td>Enables Infrastructure as Code, security baselines</td>
                        </tr>
                        <tr>
                            <td>App store developer accounts (Apple, Google)</td>
                            <td>3-6 (Native apps)</td>
                            <td>Week 4</td>
                            <td>Required for build distribution and review cycles (7-14 day approval)</td>
                        </tr>
                        <tr>
                            <td>Data privacy legal review</td>
                            <td>4-6 (Multi-region)</td>
                            <td>Week 6</td>
                            <td>Ensures policies for multi-region deployments, GDPR compliance</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="info-callout info-callout-accent">
            <h4>Additional Resources</h4>
            <ul>
                <li><strong>Technical Documentation:</strong> API specifications, database schemas, architecture diagrams available in project wiki</li>
                <li><strong>Development Guidelines:</strong> Coding standards, commit conventions, branching strategy documented in CONTRIBUTING.md</li>
                <li><strong>Deployment Runbooks:</strong> Step-by-step deployment procedures, rollback protocols, incident response playbooks</li>
                <li><strong>Monitoring Dashboards:</strong> Grafana dashboards for infrastructure, application, and business metrics</li>
                <li><strong>Vendor Contacts:</strong> Direct support channels for GCP, streaming providers, payment gateways, third-party services</li>
            </ul>
        </div>
    `;
    
    container.insertBefore(section, container.querySelector('.load-more-section'));
}

function loadPlatformFeaturesSection(container) {
    const section = document.createElement('section');
    section.id = 'platform-features';
    section.className = 'doc-section';
    section.innerHTML = `
        <h2 class="section-heading">
            <span class="heading-number">10</span>
            Platform Core Features
        </h2>
        
        <div class="content-block">
            <p class="lead-text">Comprehensive feature set spanning smart search, AI personalization, social viewing, offline mode, and spiritual rewards—designed to create an immersive devotional experience.</p>
        </div>

        <div class="tech-spec-grid">
            <div class="tech-spec-card">
                <h3>🔍 Smart Search & Filtering</h3>
                <div class="spec-content">
                    <h4>Sacred Text Search</h4>
                    <ul>
                        <li><strong>Temple Search:</strong> Find temples by location, deity specialization, and regional traditions</li>
                        <li><strong>Pandit Search:</strong> Filter by spiritual service provider qualifications, ratings, and experience</li>
                        <li><strong>Puja Search:</strong> Browse by religious ceremony categories, festivals, and occasions</li>
                        <li><strong>Keyword Search:</strong> General spiritual service discovery with autocomplete and suggestions</li>
                    </ul>
                    <h4>Voice Search (NLP)</h4>
                    <ul>
                        <li><strong>Natural Language:</strong> "Show me Ganga Aarti from Kashi tomorrow at 7 PM"</li>
                        <li><strong>Voice Recognition:</strong> Accurate speech-to-text for spiritual queries in multiple Indian languages</li>
                        <li><strong>Context Understanding:</strong> Intelligent religious query interpretation with intent classification</li>
                        <li><strong>Multi-Language Support:</strong> Voice search in Hindi, English, Tamil, Telugu, and 11+ other languages</li>
                    </ul>
                    <h4>Advanced Filtering</h4>
                    <ul>
                        <li><strong>Service Categories:</strong> Puja types, temple locations, regional traditions, spiritual occasions</li>
                        <li><strong>Temporal Filters:</strong> Festival calendar, auspicious timings (muhurat), seasonal observances</li>
                        <li><strong>Quality Filters:</strong> Authenticated temples, verified pandits, premium spiritual services, ratings</li>
                        <li><strong>Price Range:</strong> Filter by donation amount, service tiers, subscription levels</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>🤖 AI & Personalization</h3>
                <div class="spec-content">
                    <h4>AI-Powered Recommendations</h4>
                    <ul>
                        <li><strong>Sacred History Analysis:</strong> Spiritual service suggestions based on past worship patterns and preferences</li>
                        <li><strong>Devotional Mood Detection:</strong> Recommendations adapting to spiritual user behavior and engagement</li>
                        <li><strong>Engagement Patterns:</strong> Learning from devotional interactions, time-of-day preferences, festival participation</li>
                        <li><strong>Personalized Homepage:</strong> Customized spiritual content layout tailored per devotee's journey</li>
                    </ul>
                    <h4>Multi-User Profiles</h4>
                    <ul>
                        <li><strong>Individual Tracking:</strong> Separate spiritual behavior tracking for up to 8 family members</li>
                        <li><strong>Custom Playlists:</strong> Personal spiritual content organization and watchlist management</li>
                        <li><strong>Age-Appropriate Content:</strong> Profile-based religious content filtering for children and elders</li>
                        <li><strong>Viewing Preferences:</strong> Individual religious settings per family member (language, deities, traditions)</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>🔔 Alerts & Notifications</h3>
                <div class="spec-content">
                    <h4>Festival Notifications</h4>
                    <ul>
                        <li><strong>Festival Alerts:</strong> 7-day, 3-day, and 1-day advance notifications for important spiritual observances</li>
                        <li><strong>Preparation Guidance:</strong> Detailed instructions for festival preparations, required materials, timings</li>
                        <li><strong>Regional Festivals:</strong> Localized festival calendar based on user's geographic and cultural preferences</li>
                        <li><strong>Customizable Reminders:</strong> Set custom notification timing for personal spiritual practices</li>
                    </ul>
                    <h4>Service & Timing Alerts</h4>
                    <ul>
                        <li><strong>Puja Schedule Alerts:</strong> 24-hour and 1-hour reminders for booked services with preparation checklist</li>
                        <li><strong>Astrological Notifications:</strong> Real-time muhurat alerts for auspicious spiritual activities</li>
                        <li><strong>Offering Status:</strong> Real-time updates on chadhava delivery to temples with photo proof</li>
                        <li><strong>Family Updates:</strong> Shared family spiritual activity notifications and milestone celebrations</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>👨‍👩‍👧‍👦 Social & Group Viewing</h3>
                <div class="spec-content">
                    <h4>Family Puja Mode</h4>
                    <ul>
                        <li><strong>Synchronized Playback:</strong> Real-time family worship participation across different locations</li>
                        <li><strong>Remote Viewing:</strong> Multiple location spiritual participation support with synchronized audio/video</li>
                        <li><strong>Host Controls:</strong> Spiritual playback management for family coordinator (play, pause, seek)</li>
                        <li><strong>Chat Overlay:</strong> Real-time family chat during live puja with emoji reactions</li>
                    </ul>
                    <h4>Social Sharing</h4>
                    <ul>
                        <li><strong>WhatsApp Integration:</strong> Share to family groups with custom spiritual messages</li>
                        <li><strong>Instagram Stories:</strong> Post spiritual moments with decorative frames and stickers</li>
                        <li><strong>Facebook Communities:</strong> Easy sharing to religious community pages</li>
                        <li><strong>Devotional Status:</strong> "Currently participating in puja" status updates across platforms</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>📥 Offline Mode</h3>
                <div class="spec-content">
                    <h4>Download for Offline Viewing</h4>
                    <ul>
                        <li><strong>Quality Selection:</strong> Choose download resolution (360p, 720p, 1080p) for spiritual content</li>
                        <li><strong>Storage Management:</strong> Monitor device storage for religious content with smart recommendations</li>
                        <li><strong>Download Queue:</strong> Batch spiritual content download capability with progress tracking</li>
                        <li><strong>Expiry Management:</strong> Downloaded content expiry (7/30 days) based on subscription tier</li>
                    </ul>
                    <h4>Offline Access</h4>
                    <ul>
                        <li><strong>Daily Panchang Offline:</strong> Access today's astrological calendar without internet</li>
                        <li><strong>Saved Pujas:</strong> Watch previously attended pujas offline with full playback controls</li>
                        <li><strong>Smart Sync:</strong> Automatic sync when online, uploading spiritual progress and preferences</li>
                        <li><strong>Auto-Delete:</strong> Remove watched spiritual content automatically to free up storage</li>
                    </ul>
                </div>
            </div>

            <div class="tech-spec-card">
                <h3>🎁 Rewards & Referrals</h3>
                <div class="spec-content">
                    <h4>Referral Rewards System</h4>
                    <ul>
                        <li><strong>Family Invitations:</strong> Earn ₹100-500 spiritual credits for successful devotional referrals</li>
                        <li><strong>Sacred Wallet Credits:</strong> Dharmic rewards for spiritual community building and engagement</li>
                        <li><strong>Tracking System:</strong> Monitor spiritual referral status and devotional earnings in real-time</li>
                        <li><strong>Tiered Rewards:</strong> Higher rewards for premium subscription referrals and active user referrals</li>
                    </ul>
                    <h4>Spiritual Achievements</h4>
                    <ul>
                        <li><strong>Devotional Milestones:</strong> Recognition for consistent worship practices (7-day, 30-day, 108-day streaks)</li>
                        <li><strong>Seva Streak Tracking:</strong> Daily spiritual practice maintenance with visual progress indicators</li>
                        <li><strong>Festival Participation:</strong> Badges for completing festival observances and special ceremonies</li>
                        <li><strong>Community Challenges:</strong> Seasonal worship challenges with leaderboards and exclusive rewards</li>
                    </ul>
                </div>
            </div>
        </div>

    `;
    
    container.insertBefore(section, container.querySelector('.load-more-section'));
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after initial content is ready
    const loader = document.getElementById('content-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.remove('active');
        }, 500);
    }
    
    // Initial navigation highlight
    updateActiveNavLink();
    
    // Setup smooth scroll for doc navigation links
    document.querySelectorAll('.doc-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const docSidebar = document.getElementById('docSidebar');

    if (navToggle && docSidebar) {
        navToggle.addEventListener('click', () => {
            docSidebar.classList.toggle('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = docSidebar.classList.contains('active') 
                ? 'rotate(45deg) translateY(8px)' 
                : 'rotate(0) translateY(0)';
            spans[1].style.opacity = docSidebar.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = docSidebar.classList.contains('active') 
                ? 'rotate(-45deg) translateY(-8px)' 
                : 'rotate(0) translateY(0)';
        });
        
        // Close sidebar when clicking on a link (mobile)
        const sidebarLinks = docSidebar.querySelectorAll('.doc-nav-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    docSidebar.classList.remove('active');
                    
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'rotate(0) translateY(0)';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'rotate(0) translateY(0)';
                }
            });
        });
    }
});
