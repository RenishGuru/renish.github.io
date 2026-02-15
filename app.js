// ===================================
// Dynamic Content Loader from JSON
// ===================================

let portfolioData = null;

// Load portfolio data on page load
async function loadPortfolioData() {
    try {
        const response = await fetch('portfolio-data.json');
        portfolioData = await response.json();
        populateContent();
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fallback to default content if JSON fails to load
    }
}

// Populate all content from JSON
function populateContent() {
    if (!portfolioData) return;

    // Update page title and meta
    updateMetaTags();
    
    // Populate each section
    populateHero();
    populateAbout();
    populateSkills();
    populateWhyHireMe();
    populateProjects();
    populateExperience();
    populateCertifications();
    populateContact();
    populateFooter();
}

// Update meta tags
function updateMetaTags() {
    const { personal } = portfolioData;
    document.title = `${personal.name} - ${personal.title} | Portfolio`;
}

// Populate Hero Section
function populateHero() {
    const { hero, personal } = portfolioData;
    
    // Badge
    const badge = document.querySelector('.hero-badge span:last-child');
    if (badge) badge.textContent = hero.badge;
    
    // Title
    const titleElement = document.querySelector('.hero-title');
    if (titleElement) {
        titleElement.innerHTML = `
            ${hero.title.part1}
            <span class="gradient-text">${hero.title.highlight}</span>
            ${hero.title.part2}
        `;
    }
    
    // Subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) subtitle.textContent = hero.subtitle;
    
    // Stats
    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer && hero.stats) {
        const statsHTML = hero.stats.map((stat, index) => `
            <div class="stat-item">
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
            ${index < hero.stats.length - 1 ? '<div class="stat-divider"></div>' : ''}
        `).join('');
        statsContainer.innerHTML = statsHTML;
    }
}

// Populate About Section
function populateAbout() {
    const { about } = portfolioData;
    
    // Section header
    const label = document.querySelector('.about .section-label');
    const title = document.querySelector('.about .section-title');
    if (label) label.textContent = about.label;
    if (title) title.textContent = about.title;
    
    // Main card
    const cardTitle = document.querySelector('.about-card h3');
    const cardParagraphs = document.querySelector('.about-card');
    if (cardTitle) cardTitle.textContent = about.mainCard.title;
    if (cardParagraphs) {
        const existingH3 = cardParagraphs.querySelector('h3');
        const icon = cardParagraphs.querySelector('.card-icon');
        cardParagraphs.innerHTML = '';
        if (icon) cardParagraphs.appendChild(icon);
        if (existingH3) cardParagraphs.appendChild(existingH3);
        about.mainCard.paragraphs.forEach(p => {
            const pElement = document.createElement('p');
            pElement.innerHTML = p;
            cardParagraphs.appendChild(pElement);
        });
    }
    
    // Highlights
    const highlightsContainer = document.querySelector('.about-highlights');
    if (highlightsContainer && about.highlights) {
        highlightsContainer.innerHTML = about.highlights.map(highlight => `
            <div class="highlight-item">
                <div class="highlight-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76489 14.1003 1.98232 16.07 2.86" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div>
                    <h4>${highlight.title}</h4>
                    <p>${highlight.description}</p>
                </div>
            </div>
        `).join('');
    }
}

// Populate Skills Section
function populateSkills() {
    const { skills } = portfolioData;
    
    const label = document.querySelector('.skills .section-label');
    const title = document.querySelector('.skills .section-title');
    if (label) label.textContent = skills.label;
    if (title) title.textContent = skills.title;
    
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid && skills.categories) {
        skillsGrid.innerHTML = skills.categories.map(category => `
            <div class="skill-category">
                <div class="category-header">
                    <div class="category-icon">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M14 2L2 8L14 14L26 8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 20L14 26L26 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2 14L14 20L26 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>${category.name}</h3>
                </div>
                <div class="skills-list">
                    ${category.skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">${skill.name}</span>
                                <span class="skill-level">${skill.level}</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: ${skill.percentage}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

// Populate Why Hire Me Section
function populateWhyHireMe() {
    const { whyHireMe } = portfolioData;
    
    const label = document.querySelector('.why-hire .section-label');
    const title = document.querySelector('.why-hire .section-title');
    if (label) label.textContent = whyHireMe.label;
    if (title) title.textContent = whyHireMe.title;
    
    const valueProps = document.querySelector('.value-props');
    if (valueProps && whyHireMe.valueProps) {
        valueProps.innerHTML = whyHireMe.valueProps.map(prop => `
            <div class="value-card">
                <div class="value-number">${prop.number}</div>
                <h3>${prop.title}</h3>
                <p>${prop.description}</p>
            </div>
        `).join('');
    }
    
    const testimonialText = document.querySelector('.testimonial-text');
    const testimonialAuthor = document.querySelector('.testimonial-author');
    if (testimonialText) testimonialText.textContent = whyHireMe.testimonial.text;
    if (testimonialAuthor) {
        testimonialAuthor.innerHTML = `
            <strong>${whyHireMe.testimonial.author}</strong>
            <span>${whyHireMe.testimonial.company}</span>
        `;
    }
}

// Populate Projects Section
function populateProjects() {
    const { projects } = portfolioData;
    
    const label = document.querySelector('.projects .section-label');
    const title = document.querySelector('.projects .section-title');
    if (label) label.textContent = projects.label;
    if (title) title.textContent = projects.title;
    
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid && projects.items) {
        projectsGrid.innerHTML = projects.items.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <div class="project-tag">${project.tag}</div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-subtitle">${project.subtitle}</p>
                </div>
                <div class="project-problem">
                    <h4>${project.problem.title}</h4>
                    <p>${project.problem.description}</p>
                </div>
                <div class="project-solution">
                    <h4>${project.solution.title}</h4>
                    <p>${project.solution.description}</p>
                </div>
                <div class="project-tech">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-impact">
                    ${project.impact.map(metric => `
                        <div class="impact-item">
                            <span class="impact-value">${metric.value}</span>
                            <span class="impact-label">${metric.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

// Populate Experience Section
function populateExperience() {
    const { experience } = portfolioData;
    
    const label = document.querySelector('.experience .section-label');
    const title = document.querySelector('.experience .section-title');
    if (label) label.textContent = experience.label;
    if (title) title.textContent = experience.title;
    
    const experienceContent = document.querySelector('.experience-content');
    if (experienceContent && experience.positions) {
        const positionsHTML = experience.positions.map(position => `
            <div class="experience-card">
                <div class="experience-header">
                    <div class="experience-company">
                        <h3>${position.company}</h3>
                        <span class="company-tag">${position.companyTag}</span>
                    </div>
                    <div class="experience-period">
                        <span class="period-badge">${position.period}</span>
                    </div>
                </div>
                <div class="experience-role">
                    <h4>${position.role}</h4>
                </div>
                <div class="experience-description">
                    <p>${position.description}</p>
                </div>
                <div class="experience-achievements">
                    <h5>🏆 Quantified Impact & Key Achievements</h5>
                    <ul>
                        ${position.achievements.map(achievement => `
                            <li>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>${achievement}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="experience-tech">
                    <h5>Technology Stack & Expertise</h5>
                    <div class="tech-cloud">
                        ${position.techStack.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Keep certifications section
        const certSection = experienceContent.querySelector('.certifications');
        experienceContent.innerHTML = positionsHTML;
        if (certSection) experienceContent.appendChild(certSection);
    }
}

// Populate Certifications
function populateCertifications() {
    const { certifications } = portfolioData;
    
    const certHeader = document.querySelector('.certifications h3');
    if (certHeader) certHeader.textContent = certifications.title;
    
    const certList = document.querySelector('.cert-list');
    if (certList && certifications.items) {
        certList.innerHTML = certifications.items.map(cert => `
            <div class="cert-item">
                <div class="cert-badge">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="cert-info">
                    <h4>${cert.name}</h4>
                    <p>${cert.description}</p>
                </div>
            </div>
        `).join('');
    }
}

// Populate Contact Section
function populateContact() {
    const { contact, personal } = portfolioData;
    
    const label = document.querySelector('.contact .section-label');
    const title = document.querySelector('.contact .section-title');
    const description = document.querySelector('.contact .section-description');
    
    if (label) label.textContent = contact.label;
    if (title) title.textContent = contact.title;
    if (description) description.textContent = contact.description;
    
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo && contact.contactMethods) {
        contactInfo.innerHTML = contact.contactMethods.map(method => `
            <div class="contact-card">
                <div class="contact-icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M24 19.5V22.5C24.0011 22.7762 23.9441 23.0494 23.8326 23.3018C23.721 23.5542 23.5573 23.7799 23.3521 23.9638C23.1469 24.1477 22.9046 24.2858 22.6407 24.3688C22.3769 24.4518 22.0974 24.4778 21.822 24.445C18.7428 24.1015 15.7869 23.0668 13.19 21.421C10.7738 19.9247 8.72471 17.8756 7.22838 15.4595C5.57896 12.8512 4.54318 9.88242 4.20396 6.79096C4.17121 6.51645 4.19695 6.23787 4.27932 5.97463C4.36169 5.71139 4.49882 5.46964 4.68146 5.26467C4.86411 5.0597 5.08812 4.89586 5.33891 4.78343C5.5897 4.671 5.86117 4.61287 6.13596 4.61196H9.13596C9.62521 4.60722 10.0997 4.77759 10.4719 5.09255C10.8441 5.4075 11.0894 5.84463 11.162 6.32696C11.2975 7.28995 11.5486 8.23395 11.91 9.13996C12.0428 9.47592 12.0727 9.84424 11.9958 10.1976C11.9189 10.5509 11.7386 10.8741 11.476 11.127L10.178 12.425C11.5766 14.9384 13.6166 16.9784 16.13 18.377L17.428 17.079C17.6809 16.8164 18.0041 16.6361 18.3574 16.5592C18.7108 16.4823 19.0791 16.5122 19.415 16.645C20.321 17.0064 21.265 17.2575 22.228 17.393C22.715 17.4662 23.1557 17.7152 23.4714 18.0928C23.7872 18.4705 23.9556 18.9512 23.946 19.445L24 19.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div>
                    <h4>${method.type}</h4>
                    <a href="${method.link}" ${method.link.startsWith('http') ? 'target="_blank"' : ''}>${method.value}</a>
                </div>
            </div>
        `).join('');
    }
}

// Populate Footer
function populateFooter() {
    const { footer } = portfolioData;
    
    const tagline = document.querySelector('.footer-brand p');
    const copyright = document.querySelector('.footer-bottom p:first-child');
    const designCredit = document.querySelector('.footer-bottom p:last-child');
    
    if (tagline) tagline.textContent = footer.tagline;
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = `© ${currentYear} ${footer.copyright}`;
    }
    if (designCredit) designCredit.textContent = footer.designCredit;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load portfolio data first
    loadPortfolioData();
    
    // Then initialize other functionality
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
});

// ===================================
// Navigation Functions
// ===================================

function initializeNavigation() {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
}

function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Navbar shadow effect
        if (navbar) {
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 2px 8px rgba(9, 30, 66, 0.08)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
        
        // Active navigation highlighting
        highlightNavigation();
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && currentScroll < window.innerHeight) {
            heroBackground.style.transform = `translateY(${currentScroll * 0.5}px)`;
        }
    });
}

function highlightNavigation() {
    const scrollPosition = window.scrollY + 150;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--color-primary-500)';
                } else {
                    link.style.color = '';
                }
            });
        }
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements - delay to allow content to load
    setTimeout(() => {
        const animateElements = document.querySelectorAll('.skill-category, .project-card, .experience-card, .contact-card, .value-card');
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(el);
        });
        
        // Skill bar animation
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }, 500);
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // 🔹 REPLACE THIS WITH YOUR ACTUAL FORM ID
        const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfcKLk5UMgTT9q2z48orCDNazYknLJUzrOnc_RdK6iZl5_ZOQ/formResponse";

        // Disable button while sending
        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        fetch(googleFormURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                "entry.620353301": name,     // Replace with Name entry ID
                "entry.258772459": email,    // Replace with Email entry ID
                "entry.2058090792": subject,  // Replace with Subject entry ID
                "entry.793742881": message   // Replace with Message entry ID
            })
        })
        .then(() => {
            // Success UI
            submitButton.innerHTML = `
                <span>Message Sent!</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            submitButton.style.backgroundColor = '#1F845A';

            setTimeout(() => {
                contactForm.reset();
                submitButton.innerHTML = originalButtonText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        })
        .catch(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            alert("Submission failed. Please try again.");
        });
    });
}


// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
