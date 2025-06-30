// RPG Character Page - Main JavaScript
import Environment3D from './3d-environment.js';

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Character data - this would be populated by the programmer
    const characterData = {
        name: 'Davide the AI-Mancer',
        class: 'AI and Math Sage',
        title: 'Summoner of Intelligent Agents',
        stats: {
            health: 85,
            strength: 60,
            agility: 70,
            speed: 75,
            stealth: 65,
            intelligence: 95,
            wisdom: 90,
            charisma: 75,
            arcane: 95,
            mathematics: 95
        },
        skills: {
            'Machine Learning': 5,
            'Deep Learning': 5,
            'Mathematical Optimization': 5,
            'Reinforcement Learning': 4,
            'Neural Networks': 5,
            'Statistical Analysis': 5,
            'Algorithm Design': 5,
            'Python': 5,
            'TensorFlow': 4,
            'PyTorch': 4,
            'Linear Algebra': 5,
            'Calculus': 5,
            'Probability Theory': 4,
            'Agent Architecture': 5,
            'Problem Solving': 5,
            'Research & Development': 4
        },
        weaknesses: {
            'Physical Combat': 'Prefers intellectual challenges over physical ones',
            'Social Gatherings': 'More comfortable with algorithms than large crowds',
            'Real-time Decisions': 'Takes time to analyze complex situations thoroughly'
        },
        strengths: {
            'Mathematical Intuition': 'Exceptional ability to see patterns in data',
            'Algorithmic Thinking': 'Can break down complex problems into solvable components',
            'AI Agent Design': 'Expert at creating intelligent systems that solve real-world problems',
            'Research Focus': 'Deep understanding of cutting-edge AI and mathematical concepts'
        },
        equipment: [
            { name: 'Neural Network Staff', icon: '🧠', description: 'Primary tool for deep learning and pattern recognition' },
            { name: 'Optimization Orb', icon: '⚡', description: 'Mathematical optimization and algorithm enhancement' },
            { name: 'Agent Summoning Crystal', icon: '🔮', description: 'Creates intelligent agents to solve complex problems' },
            { name: 'TensorFlow Grimoire', icon: '📚', description: 'Advanced machine learning framework mastery' },
            { name: 'PyTorch Catalyst', icon: '🔥', description: 'Dynamic neural network construction and training' },
            { name: 'Mathematical Matrix', icon: '🔢', description: 'Linear algebra and mathematical computation tools' },
            { name: 'Probability Prism', icon: '🎲', description: 'Statistical analysis and probabilistic modeling' },
            { name: 'Reinforcement Learning Relic', icon: '🎯', description: 'Agent training through reward-based learning' }
        ],
        lore: 'Born in the realm of algorithms and mathematical theory, Davide the AI-Mancer has mastered the ancient arts of artificial intelligence and mathematical optimization. As a true sage of the digital age, he possesses the rare ability to summon intelligent agents that can solve complex problems in optimal ways. His journey through the ever-evolving landscape of machine learning and mathematical research has taught him that the most powerful magic lies not in brute force, but in elegant algorithms and intelligent systems. With his deep understanding of neural networks, optimization theory, and agent-based architectures, he can transform any problem into an opportunity for intelligent automation and mathematical insight.'
    };

    // Global variables
    let environment3D = null;
    let is3DSupported = false;

    // Initialize the page
    initializeCharacterPage();

    function initializeCharacterPage() {
        // Check if WebGL is supported
        is3DSupported = checkWebGLSupport();

        if (is3DSupported) {
            initialize3DEnvironment();
        } else {
            // Fallback to 2D version
            showLegacyVersion();
        }

        populateCharacterData();
        setupInteractivity();
        setupAccessibility();
        setupDialogueSystem();
    }

    function checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                     (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    function initialize3DEnvironment() {
        try {
            environment3D = new Environment3D('3d-environment', characterData);

            // Update character info in overlay
            const nameElement = document.querySelector('.environment-overlay .character-name');
            const classElement = document.querySelector('.environment-overlay .character-class');
            const titleElement = document.querySelector('.environment-overlay .character-title');

            if (nameElement) {nameElement.textContent = characterData.name;}
            if (classElement) {classElement.textContent = characterData.class;}
            if (titleElement) {titleElement.textContent = characterData.title;}

            // Store reference for potential future use
            window.environment3D = environment3D;

        } catch (error) {
            // Fallback to legacy version if 3D initialization fails
            showLegacyVersion();
        }
    }

    function showLegacyVersion() {
        // Hide 3D environment and show legacy character sheet
        const environmentContainer = document.getElementById('3d-environment');
        const legacySheet = document.querySelector('.character-sheet');

        if (environmentContainer) {
            environmentContainer.style.display = 'none';
        }

        if (legacySheet) {
            legacySheet.classList.remove('legacy-hidden');
        }
    }

    function setupDialogueSystem() {
        // Setup dialogue window close button
        const closeButton = document.querySelector('.dialogue-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                const dialogueWindow = document.getElementById('dialogue-window');
                dialogueWindow.classList.add('hidden');
            });
        }

        // Setup tab switching
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });

        // Close dialogue on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const dialogueWindow = document.getElementById('dialogue-window');
                if (!dialogueWindow.classList.contains('hidden')) {
                    dialogueWindow.classList.add('hidden');
                }
            }
        });
    }

    function switchTab(targetTab) {
        // Update active tab button
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-tab') === targetTab) {
                button.classList.add('active');
            }
        });

        // Update active tab content
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${targetTab}-tab`) {
                content.classList.add('active');
            }
        });
    }

    function populateCharacterData() {
        // Populate character header (for both 3D and legacy)
        const nameElements = document.querySelectorAll('.character-name');
        const classElements = document.querySelectorAll('.character-class');
        const titleElements = document.querySelectorAll('.character-title');

        nameElements.forEach(element => {
            if (element.textContent === 'Loading...') {
                element.textContent = characterData.name;
            }
        });

        classElements.forEach(element => {
            if (element.textContent === 'Loading...') {
                element.textContent = characterData.class;
            }
        });

        titleElements.forEach(element => {
            if (element.textContent === 'Loading...') {
                element.textContent = characterData.title;
            }
        });

        // Only populate legacy sections if 3D is not supported
        if (!is3DSupported) {
            populateStats();
            populateSkills();
            populateWeaknessesAndStrengths();
            populateEquipment();
            populateLore();
        }
    }

    function populateStats() {
        const statsGrid = document.querySelector('.stats-grid');
        if (!statsGrid) {return;}

        statsGrid.innerHTML = '';

        Object.entries(characterData.stats).forEach(([stat, value]) => {
            const statCard = document.createElement('div');
            statCard.className = 'stat-card';
            statCard.setAttribute('tabindex', '0');
            statCard.setAttribute('role', 'button');
            statCard.setAttribute('aria-label', `${stat}: ${value}`);

            statCard.innerHTML = `
                <div class="stat-name">${formatStatName(stat)}</div>
                <div class="stat-value">${value}</div>
            `;

            // Add detailed tooltip with description
            const statDescription = getStatDescription(stat, value);
            statCard.setAttribute('title', `${formatStatName(stat)}: ${value}/100\n${statDescription}`);

            // Add click handler for detailed modal
            statCard.addEventListener('click', () => showStatModal(stat, value));
            statCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showStatModal(stat, value);
                }
            });

            statsGrid.appendChild(statCard);
        });
    }

    function getStatDescription(stat, value) {
        const descriptions = {
            health: 'Overall physical and mental well-being',
            strength: 'Physical power and endurance',
            agility: 'Flexibility and coordination',
            speed: 'Quickness and reaction time',
            stealth: 'Ability to move unnoticed',
            intelligence: 'Problem-solving and analytical thinking',
            wisdom: 'Experience and decision-making ability',
            charisma: 'Social influence and communication',
            arcane: 'Ability to harness magical energies',
            mathematics: 'Ability to solve complex mathematical problems'
        };

        const description = descriptions[stat] || 'Character attribute';
        const level = value >= 90 ? 'Exceptional' : value >= 80 ? 'Excellent' : value >= 70 ? 'Good' : value >= 60 ? 'Average' : 'Below Average';

        return `${description} - ${level} level`;
    }

    function populateSkills() {
        const skillsSection = document.querySelector('.skills-section');
        if (!skillsSection) {return;}

        const skillsList = skillsSection.querySelector('.skills-list') || skillsSection;
        if (!skillsList) {return;}

        skillsList.innerHTML = '';

        Object.entries(characterData.skills).forEach(([skill, rating]) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.setAttribute('tabindex', '0');

            const stars = generateStars(rating);

            skillItem.innerHTML = `
                <span class="skill-name">${skill}</span>
                <div class="skill-rating" aria-label="Rating: ${rating} out of 5 stars">
                    ${stars}
                </div>
            `;

            // Add tooltip
            skillItem.setAttribute('title', `${skill}: ${rating}/5`);

            skillsList.appendChild(skillItem);
        });
    }

    function populateWeaknessesAndStrengths() {
        // Add weaknesses and strengths section if it doesn't exist
        let weaknessesSection = document.querySelector('.weaknesses-section');
        if (!weaknessesSection) {
            const skillsSection = document.querySelector('.skills-section');
            if (skillsSection) {
                weaknessesSection = document.createElement('section');
                weaknessesSection.className = 'weaknesses-section';
                weaknessesSection.innerHTML = `
                    <h2>Weaknesses & Strengths</h2>
                    <div class="weaknesses-strengths-container">
                        <div class="weaknesses-list">
                            <h3>Weaknesses</h3>
                            <div class="weaknesses-items"></div>
                        </div>
                        <div class="strengths-list">
                            <h3>Strengths</h3>
                            <div class="strengths-items"></div>
                        </div>
                    </div>
                `;
                skillsSection.parentNode.insertBefore(weaknessesSection, skillsSection.nextSibling);
            }
        }

        if (weaknessesSection) {
            const weaknessesItems = weaknessesSection.querySelector('.weaknesses-items');
            const strengthsItems = weaknessesSection.querySelector('.strengths-items');

            // Populate weaknesses
            if (weaknessesItems) {
                weaknessesItems.innerHTML = '';
                Object.entries(characterData.weaknesses).forEach(([weakness, description]) => {
                    const weaknessItem = document.createElement('div');
                    weaknessItem.className = 'weakness-item';
                    weaknessItem.setAttribute('tabindex', '0');
                    weaknessItem.setAttribute('role', 'button');
                    weaknessItem.setAttribute('aria-label', `${weakness}: ${description}`);

                    weaknessItem.innerHTML = `
                        <span class="weakness-name">${weakness}</span>
                        <span class="weakness-icon">⚠️</span>
                    `;

                    weaknessItem.setAttribute('title', `${weakness}: ${description}`);

                    // Add click handler for modal
                    weaknessItem.addEventListener('click', () => showWeaknessModal(weakness, description));
                    weaknessItem.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            showWeaknessModal(weakness, description);
                        }
                    });

                    weaknessesItems.appendChild(weaknessItem);
                });
            }

            // Populate strengths
            if (strengthsItems) {
                strengthsItems.innerHTML = '';
                Object.entries(characterData.strengths).forEach(([strength, description]) => {
                    const strengthItem = document.createElement('div');
                    strengthItem.className = 'strength-item';
                    strengthItem.setAttribute('tabindex', '0');
                    strengthItem.setAttribute('role', 'button');
                    strengthItem.setAttribute('aria-label', `${strength}: ${description}`);

                    strengthItem.innerHTML = `
                        <span class="strength-name">${strength}</span>
                        <span class="strength-icon">✨</span>
                    `;

                    strengthItem.setAttribute('title', `${strength}: ${description}`);

                    // Add click handler for modal
                    strengthItem.addEventListener('click', () => showStrengthModal(strength, description));
                    strengthItem.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            showStrengthModal(strength, description);
                        }
                    });

                    strengthsItems.appendChild(strengthItem);
                });
            }
        }
    }

    function populateEquipment() {
        const equipmentSection = document.querySelector('.equipment-section');
        if (!equipmentSection) {return;}

        const equipmentGrid = equipmentSection.querySelector('.equipment-grid');
        if (!equipmentGrid) {return;}

        equipmentGrid.innerHTML = '';

        characterData.equipment.forEach((item) => {
            const equipmentItem = document.createElement('div');
            equipmentItem.className = 'equipment-item';
            equipmentItem.setAttribute('tabindex', '0');
            equipmentItem.setAttribute('role', 'button');
            equipmentItem.setAttribute('aria-label', `${item.name}: ${item.description}`);

            equipmentItem.innerHTML = `
                <div class="equipment-icon">${item.icon}</div>
                <div class="equipment-name">${item.name}</div>
            `;

            // Add tooltip
            equipmentItem.setAttribute('title', `${item.name}: ${item.description}`);

            // Add click handler for modal
            equipmentItem.addEventListener('click', () => showEquipmentModal(item));
            equipmentItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showEquipmentModal(item);
                }
            });

            equipmentGrid.appendChild(equipmentItem);
        });
    }

    function populateLore() {
        const loreContent = document.querySelector('.lore-content');
        if (loreContent) {
            // Make lore expandable
            loreContent.innerHTML = `
                <div class="lore-preview">
                    ${characterData.lore.substring(0, 150)}...
                </div>
                <div class="lore-full" style="display: none;">
                    ${characterData.lore}
                </div>
                <button class="lore-toggle" aria-label="Expand lore section">
                    <span class="lore-toggle-text">Read More</span>
                    <span class="lore-toggle-icon">▼</span>
                </button>
            `;

            // Add click handler for lore toggle
            const loreToggle = loreContent.querySelector('.lore-toggle');
            const lorePreview = loreContent.querySelector('.lore-preview');
            const loreFull = loreContent.querySelector('.lore-full');
            const toggleText = loreContent.querySelector('.lore-toggle-text');
            const toggleIcon = loreContent.querySelector('.lore-toggle-icon');

            loreToggle.addEventListener('click', () => {
                const isExpanded = loreFull.style.display !== 'none';

                if (isExpanded) {
                    loreFull.style.display = 'none';
                    lorePreview.style.display = 'block';
                    toggleText.textContent = 'Read More';
                    toggleIcon.textContent = '▼';
                    loreToggle.setAttribute('aria-label', 'Expand lore section');
                } else {
                    lorePreview.style.display = 'none';
                    loreFull.style.display = 'block';
                    toggleText.textContent = 'Read Less';
                    toggleIcon.textContent = '▲';
                    loreToggle.setAttribute('aria-label', 'Collapse lore section');
                }
            });

            // Add keyboard support
            loreToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    loreToggle.click();
                }
            });
        }
    }

    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= rating ? 'skill-star' : 'skill-star empty';
            stars += `<span class="${starClass}" aria-hidden="true">★</span>`;
        }
        return stars;
    }

    function formatStatName(stat) {
        return stat.charAt(0).toUpperCase() + stat.slice(1);
    }

    function showStatModal(stat, value) {
        const description = getStatDescription(stat, value);
        const modal = createModal({
            title: formatStatName(stat),
            icon: getStatIcon(stat),
            description: `${formatStatName(stat)}: ${value}/100\n\n${description}`,
            type: 'stat'
        });

        document.body.appendChild(modal);
        setupModal(modal);
    }

    function showWeaknessModal(weakness, description) {
        const modal = createModal({
            title: weakness,
            icon: '⚠️',
            description: description,
            type: 'weakness'
        });

        document.body.appendChild(modal);
        setupModal(modal);
    }

    function showStrengthModal(strength, description) {
        const modal = createModal({
            title: strength,
            icon: '✨',
            description: description,
            type: 'strength'
        });

        document.body.appendChild(modal);
        setupModal(modal);
    }

    function showEquipmentModal(item) {
        const modal = createModal({
            title: item.name,
            icon: item.icon,
            description: item.description,
            type: 'equipment'
        });

        document.body.appendChild(modal);
        setupModal(modal);
    }

    function getStatIcon(stat) {
        const icons = {
            health: '❤️',
            strength: '💪',
            agility: '🏃',
            speed: '⚡',
            stealth: '👤',
            intelligence: '🧠',
            wisdom: '📚',
            charisma: '🎭',
            arcane: '🔮',
            mathematics: '🔢'
        };
        return icons[stat] || '📊';
    }

    function createModal({ title, icon, description, type }) {
        const modal = document.createElement('div');
        modal.className = 'character-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'modal-title');
        modal.setAttribute('aria-describedby', 'modal-description');

        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content modal-${type}">
                <button class="modal-close" aria-label="Close modal">×</button>
                <div class="modal-header">
                    <div class="modal-icon">${icon}</div>
                    <h3 id="modal-title">${title}</h3>
                </div>
                <div class="modal-body">
                    <p id="modal-description">${description}</p>
                </div>
            </div>
        `;

        return modal;
    }

    function setupModal(modal) {
        // Add modal styles if not already present
        if (!document.querySelector('#character-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'character-modal-styles';
            style.textContent = `
                .character-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(2px);
                }
                
                .modal-content {
                    position: relative;
                    background: var(--parchment);
                    border: 3px solid var(--dark-brown);
                    border-radius: 15px;
                    padding: var(--spacing-xl);
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                
                .modal-stat {
                    border-left: 5px solid var(--accent-blue);
                }
                
                .modal-weakness {
                    border-left: 5px solid var(--accent-red);
                }
                
                .modal-strength {
                    border-left: 5px solid var(--accent-green);
                }
                
                .modal-equipment {
                    border-left: 5px solid var(--primary-gold);
                }
                
                .modal-close {
                    position: absolute;
                    top: var(--spacing-md);
                    right: var(--spacing-md);
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: var(--dark-brown);
                    cursor: pointer;
                    padding: var(--spacing-xs);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.2s ease;
                }
                
                .modal-close:hover {
                    background: var(--parchment-dark);
                }
                
                .modal-close:focus {
                    outline: 2px solid var(--primary-gold);
                    outline-offset: 2px;
                }
                
                .modal-header {
                    text-align: center;
                    margin-bottom: var(--spacing-lg);
                }
                
                .modal-icon {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-sm);
                }
                
                .modal-body p {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: var(--text-dark);
                    white-space: pre-line;
                }
            `;
            document.head.appendChild(style);
        }

        // Focus management
        const closeButton = modal.querySelector('.modal-close');
        closeButton.focus();

        // Close modal handlers
        const closeModal = () => {
            document.body.removeChild(modal);
        };

        closeButton.addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    function setupInteractivity() {
        // Add hover effects and animations
        const interactiveElements = document.querySelectorAll('.stat-card, .equipment-item, .skill-item, .weakness-item, .strength-item');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });

        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    function setupAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-gold);
            color: var(--text-light);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });

        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content landmark
        const mainContent = document.querySelector('.character-sheet');
        if (mainContent) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('role', 'main');
        }

        // Add ARIA labels for better screen reader support
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            const statName = card.querySelector('.stat-name').textContent;
            const statValue = card.querySelector('.stat-value').textContent;
            card.setAttribute('aria-label', `${statName}: ${statValue}`);
        });
    }

    // Utility functions
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

    // Handle window resize
    window.addEventListener('resize', debounce(function() {
        // Recalculate any dynamic layouts if needed
    }, 250));

    // Handle visibility change for performance
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden, pause any animations or heavy operations
        } else {
            // Page is visible again
        }
    });
});
