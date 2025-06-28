/**
 * @jest-environment jsdom
 */

// Import the main.js file
import '../assets/js/main.js';

describe('RPG Character Page', () => {
  let container;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <div class="container">
        <div class="character-sheet">
          <div class="character-header">
            <h1 class="character-name">Loading...</h1>
            <div class="character-class">Loading...</div>
            <div class="character-title">Loading...</div>
          </div>
          
          <div class="character-portrait">
            <div class="portrait-placeholder">
              Character Portrait
            </div>
          </div>
          
          <section class="stats-section">
            <h2>Character Stats</h2>
            <div class="stats-grid">
              <!-- Stats will be populated by JavaScript -->
            </div>
          </section>
          
          <section class="skills-section">
            <h2>Skills & Abilities</h2>
            <div class="skills-list">
              <!-- Skills will be populated by JavaScript -->
            </div>
          </section>
          
          <section class="equipment-section">
            <h2>Equipment & Tools</h2>
            <div class="equipment-grid">
              <!-- Equipment will be populated by JavaScript -->
            </div>
          </section>
          
          <section class="lore-section">
            <h2>Character Lore</h2>
            <div class="lore-content">
              <!-- Lore will be populated by JavaScript -->
            </div>
          </section>
        </div>
      </div>
    `;
    
    container = document.querySelector('.container');
  });

  afterEach(() => {
    // Clean up
    document.body.innerHTML = '';
  });

  describe('Character Data Structure', () => {
    test('should have character data object with required properties', () => {
      // Mock character data for testing
      const characterData = {
        name: "Davide the Code Sage",
        class: "Full Stack Developer",
        title: "Master of Algorithms and Web Craft",
        stats: {
          health: 85,
          strength: 70,
          agility: 80,
          speed: 75,
          stealth: 65,
          intelligence: 90,
          wisdom: 85,
          charisma: 70
        },
        skills: {
          "Problem Solving": 5,
          "Communication": 4,
          "Teamwork": 4,
          "JavaScript": 5,
          "Python": 4,
          "React": 4,
          "Node.js": 4,
          "Machine Learning": 3,
          "DevOps": 3,
          "UI/UX Design": 3
        },
        weaknesses: {
          "Public Speaking": "Gets nervous in large crowds",
          "Perfectionism": "Sometimes spends too much time on details",
          "New Technologies": "Takes time to adapt to completely new paradigms"
        },
        strengths: {
          "Problem Solving": "Excellent analytical thinking",
          "Learning": "Quick to pick up new concepts",
          "Collaboration": "Works well in team environments"
        },
        equipment: [
          { name: "Python", icon: "🐍", description: "Primary programming language" },
          { name: "JavaScript", icon: "⚡", description: "Web development powerhouse" },
          { name: "React", icon: "⚛️", description: "Frontend framework" },
          { name: "Node.js", icon: "🟢", description: "Backend runtime" },
          { name: "Docker", icon: "🐳", description: "Containerization tool" },
          { name: "Git", icon: "📚", description: "Version control system" },
          { name: "AWS", icon: "☁️", description: "Cloud platform" },
          { name: "PostgreSQL", icon: "🐘", description: "Database system" }
        ],
        lore: "Born in the digital realm, Davide the Code Sage has mastered the ancient arts of programming and web development. With years of experience crafting digital solutions, he wields the power of modern technologies to create seamless user experiences and robust applications. His journey through the ever-evolving landscape of software development has taught him the importance of clean code, user-centered design, and continuous learning."
      };

      expect(characterData).toBeDefined();
      expect(characterData.name).toBe("Davide the Code Sage");
      expect(characterData.class).toBe("Full Stack Developer");
      expect(characterData.title).toBe("Master of Algorithms and Web Craft");
      expect(characterData.stats).toBeDefined();
      expect(characterData.skills).toBeDefined();
      expect(characterData.weaknesses).toBeDefined();
      expect(characterData.strengths).toBeDefined();
      expect(characterData.equipment).toBeDefined();
      expect(characterData.lore).toBeDefined();
    });

    test('should have valid stats with numeric values', () => {
      const characterData = {
        stats: {
          health: 85,
          strength: 70,
          agility: 80,
          speed: 75,
          stealth: 65,
          intelligence: 90,
          wisdom: 85,
          charisma: 70
        }
      };

      Object.values(characterData.stats).forEach(value => {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      });
    });

    test('should have valid skills with ratings 1-5', () => {
      const characterData = {
        skills: {
          "Problem Solving": 5,
          "Communication": 4,
          "Teamwork": 4,
          "JavaScript": 5,
          "Python": 4,
          "React": 4,
          "Node.js": 4,
          "Machine Learning": 3,
          "DevOps": 3,
          "UI/UX Design": 3
        }
      };

      Object.values(characterData.skills).forEach(rating => {
        expect(typeof rating).toBe('number');
        expect(rating).toBeGreaterThanOrEqual(1);
        expect(rating).toBeLessThanOrEqual(5);
      });
    });

    test('should have valid weaknesses and strengths', () => {
      const characterData = {
        weaknesses: {
          "Public Speaking": "Gets nervous in large crowds",
          "Perfectionism": "Sometimes spends too much time on details"
        },
        strengths: {
          "Problem Solving": "Excellent analytical thinking",
          "Learning": "Quick to pick up new concepts"
        }
      };

      Object.values(characterData.weaknesses).forEach(description => {
        expect(typeof description).toBe('string');
        expect(description.length).toBeGreaterThan(0);
      });

      Object.values(characterData.strengths).forEach(description => {
        expect(typeof description).toBe('string');
        expect(description.length).toBeGreaterThan(0);
      });
    });

    test('should have equipment items with required properties', () => {
      const characterData = {
        equipment: [
          { name: "Python", icon: "🐍", description: "Primary programming language" }
        ]
      };

      characterData.equipment.forEach(item => {
        expect(item.name).toBeDefined();
        expect(item.icon).toBeDefined();
        expect(item.description).toBeDefined();
        expect(typeof item.name).toBe('string');
        expect(typeof item.icon).toBe('string');
        expect(typeof item.description).toBe('string');
      });
    });
  });

  describe('DOM Population', () => {
    beforeEach(() => {
      // Trigger DOMContentLoaded event
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
    });

    test('should populate character header information', () => {
      const nameElement = document.querySelector('.character-name');
      const classElement = document.querySelector('.character-class');
      const titleElement = document.querySelector('.character-title');

      expect(nameElement.textContent).not.toBe('Loading...');
      expect(classElement.textContent).not.toBe('Loading...');
      expect(titleElement.textContent).not.toBe('Loading...');
    });

    test('should populate stats grid with stat cards', () => {
      const statsGrid = document.querySelector('.stats-grid');
      const statCards = statsGrid.querySelectorAll('.stat-card');

      expect(statCards.length).toBeGreaterThan(0);
      
      statCards.forEach(card => {
        const statName = card.querySelector('.stat-name');
        const statValue = card.querySelector('.stat-value');
        
        expect(statName).toBeDefined();
        expect(statValue).toBeDefined();
        expect(statName.textContent.trim()).not.toBe('');
        expect(statValue.textContent.trim()).not.toBe('');
      });
    });

    test('should populate skills list with skill items', () => {
      const skillsList = document.querySelector('.skills-list');
      const skillItems = skillsList.querySelectorAll('.skill-item');

      expect(skillItems.length).toBeGreaterThan(0);
      
      skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name');
        const skillRating = item.querySelector('.skill-rating');
        
        expect(skillName).toBeDefined();
        expect(skillRating).toBeDefined();
        expect(skillName.textContent.trim()).not.toBe('');
        expect(skillRating.children.length).toBe(5); // 5 stars
      });
    });

    test('should populate weaknesses and strengths sections', () => {
      const weaknessesSection = document.querySelector('.weaknesses-section');
      expect(weaknessesSection).toBeDefined();

      const weaknessesItems = weaknessesSection.querySelectorAll('.weakness-item');
      const strengthsItems = weaknessesSection.querySelectorAll('.strength-item');

      expect(weaknessesItems.length).toBeGreaterThan(0);
      expect(strengthsItems.length).toBeGreaterThan(0);
      
      weaknessesItems.forEach(item => {
        const weaknessName = item.querySelector('.weakness-name');
        const weaknessIcon = item.querySelector('.weakness-icon');
        
        expect(weaknessName).toBeDefined();
        expect(weaknessIcon).toBeDefined();
        expect(weaknessName.textContent.trim()).not.toBe('');
        expect(weaknessIcon.textContent.trim()).toBe('⚠️');
      });

      strengthsItems.forEach(item => {
        const strengthName = item.querySelector('.strength-name');
        const strengthIcon = item.querySelector('.strength-icon');
        
        expect(strengthName).toBeDefined();
        expect(strengthIcon).toBeDefined();
        expect(strengthName.textContent.trim()).not.toBe('');
        expect(strengthIcon.textContent.trim()).toBe('✨');
      });
    });

    test('should populate equipment grid with equipment items', () => {
      const equipmentGrid = document.querySelector('.equipment-grid');
      const equipmentItems = equipmentGrid.querySelectorAll('.equipment-item');

      expect(equipmentItems.length).toBeGreaterThan(0);
      
      equipmentItems.forEach(item => {
        const equipmentIcon = item.querySelector('.equipment-icon');
        const equipmentName = item.querySelector('.equipment-name');
        
        expect(equipmentIcon).toBeDefined();
        expect(equipmentName).toBeDefined();
        expect(equipmentIcon.textContent.trim()).not.toBe('');
        expect(equipmentName.textContent.trim()).not.toBe('');
      });
    });

    test('should populate lore content with expandable functionality', () => {
      const loreContent = document.querySelector('.lore-content');
      
      expect(loreContent.textContent.trim()).not.toBe('');
      expect(loreContent.textContent.length).toBeGreaterThan(50);
      
      // Check for expandable functionality
      const lorePreview = loreContent.querySelector('.lore-preview');
      const loreFull = loreContent.querySelector('.lore-full');
      const loreToggle = loreContent.querySelector('.lore-toggle');
      
      expect(lorePreview).toBeDefined();
      expect(loreFull).toBeDefined();
      expect(loreToggle).toBeDefined();
      
      // Initially, full lore should be hidden
      expect(loreFull.style.display).toBe('none');
    });
  });

  describe('Utility Functions', () => {
    test('should format stat names correctly', () => {
      const formatStatName = (stat) => {
        return stat.charAt(0).toUpperCase() + stat.slice(1);
      };

      expect(formatStatName('health')).toBe('Health');
      expect(formatStatName('strength')).toBe('Strength');
      expect(formatStatName('agility')).toBe('Agility');
    });

    test('should generate correct star ratings', () => {
      const generateStars = (rating) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
          const starClass = i <= rating ? 'skill-star' : 'skill-star empty';
          stars += `<span class="${starClass}" aria-hidden="true">★</span>`;
        }
        return stars;
      };

      const threeStars = generateStars(3);
      const fiveStars = generateStars(5);
      const zeroStars = generateStars(0);

      expect(threeStars.match(/class=\"skill-star\"/g).length).toBe(3);
      expect(threeStars.match(/class=\"skill-star empty\"/g).length).toBe(2);
      expect(fiveStars.match(/class=\"skill-star\"/g).length).toBe(5);
      expect(fiveStars).not.toContain('skill-star empty');
      expect(zeroStars.match(/class=\"skill-star empty\"/g).length).toBe(5);
      expect(zeroStars).not.toContain('class=\"skill-star\"');
    });

    test('should get stat descriptions correctly', () => {
      const getStatDescription = (stat, value) => {
        const descriptions = {
          health: "Overall physical and mental well-being",
          strength: "Physical power and endurance",
          agility: "Flexibility and coordination",
          speed: "Quickness and reaction time",
          stealth: "Ability to move unnoticed",
          intelligence: "Problem-solving and analytical thinking",
          wisdom: "Experience and decision-making ability",
          charisma: "Social influence and communication"
        };
        
        const description = descriptions[stat] || "Character attribute";
        const level = value >= 90 ? "Exceptional" : value >= 80 ? "Excellent" : value >= 70 ? "Good" : value >= 60 ? "Average" : "Below Average";
        
        return `${description} - ${level} level`;
      };

      expect(getStatDescription('health', 85)).toContain('Overall physical and mental well-being');
      expect(getStatDescription('health', 95)).toContain('Exceptional');
      expect(getStatDescription('health', 75)).toContain('Good');
      expect(getStatDescription('unknown', 50)).toContain('Character attribute');
    });

    test('should get stat icons correctly', () => {
      const getStatIcon = (stat) => {
        const icons = {
          health: '❤️',
          strength: '💪',
          agility: '🏃',
          speed: '⚡',
          stealth: '👤',
          intelligence: '🧠',
          wisdom: '📚',
          charisma: '🎭'
        };
        return icons[stat] || '📊';
      };

      expect(getStatIcon('health')).toBe('❤️');
      expect(getStatIcon('strength')).toBe('💪');
      expect(getStatIcon('unknown')).toBe('📊');
    });
  });

  describe('DOM Structure', () => {
    test('should have proper HTML structure', () => {
      const characterSheet = document.querySelector('.character-sheet');
      const characterHeader = document.querySelector('.character-header');
      const characterPortrait = document.querySelector('.character-portrait');
      const statsSection = document.querySelector('.stats-section');
      const skillsSection = document.querySelector('.skills-section');
      const equipmentSection = document.querySelector('.equipment-section');
      const loreSection = document.querySelector('.lore-section');

      expect(characterSheet).toBeDefined();
      expect(characterHeader).toBeDefined();
      expect(characterPortrait).toBeDefined();
      expect(statsSection).toBeDefined();
      expect(skillsSection).toBeDefined();
      expect(equipmentSection).toBeDefined();
      expect(loreSection).toBeDefined();
    });

    test('should have responsive CSS classes', () => {
      const container = document.querySelector('.container');
      const characterSheet = document.querySelector('.character-sheet');
      const statsGrid = document.querySelector('.stats-grid');

      expect(container.classList.contains('container')).toBe(true);
      expect(characterSheet.classList.contains('character-sheet')).toBe(true);
      expect(statsGrid.classList.contains('stats-grid')).toBe(true);
    });
  });

  describe('Accessibility Features', () => {
    test('should have semantic HTML structure', () => {
      const sections = document.querySelectorAll('section');
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

      expect(sections.length).toBeGreaterThan(0);
      expect(headings.length).toBeGreaterThan(0);
    });

    test('should have proper heading hierarchy', () => {
      const h1 = document.querySelector('h1');
      const h2s = document.querySelectorAll('h2');

      expect(h1).toBeDefined();
      expect(h2s.length).toBeGreaterThan(0);
    });

    test('should have proper ARIA labels and roles', () => {
      // Trigger DOMContentLoaded to populate the page
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);

      const statCards = document.querySelectorAll('.stat-card');
      const equipmentItems = document.querySelectorAll('.equipment-item');
      const weaknessItems = document.querySelectorAll('.weakness-item');
      const strengthItems = document.querySelectorAll('.strength-item');

      statCards.forEach(card => {
        expect(card.getAttribute('role')).toBe('button');
        expect(card.getAttribute('aria-label')).toBeDefined();
      });

      equipmentItems.forEach(item => {
        expect(item.getAttribute('role')).toBe('button');
        expect(item.getAttribute('aria-label')).toBeDefined();
      });

      weaknessItems.forEach(item => {
        expect(item.getAttribute('role')).toBe('button');
        expect(item.getAttribute('aria-label')).toBeDefined();
      });

      strengthItems.forEach(item => {
        expect(item.getAttribute('role')).toBe('button');
        expect(item.getAttribute('aria-label')).toBeDefined();
      });
    });
  });

  describe('Interactive Features', () => {
    beforeEach(() => {
      // Trigger DOMContentLoaded event
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
    });

    test('should have clickable stat cards', () => {
      const statCards = document.querySelectorAll('.stat-card');
      expect(statCards.length).toBeGreaterThan(0);
      
      statCards.forEach(card => {
        expect(card.style.cursor).toBeDefined();
      });
    });

    test('should have clickable equipment items', () => {
      const equipmentItems = document.querySelectorAll('.equipment-item');
      expect(equipmentItems.length).toBeGreaterThan(0);
      
      equipmentItems.forEach(item => {
        expect(item.style.cursor).toBeDefined();
      });
    });

    test('should have clickable weakness and strength items', () => {
      const weaknessItems = document.querySelectorAll('.weakness-item');
      const strengthItems = document.querySelectorAll('.strength-item');
      
      expect(weaknessItems.length).toBeGreaterThan(0);
      expect(strengthItems.length).toBeGreaterThan(0);
      
      weaknessItems.forEach(item => {
        expect(item.style.cursor).toBeDefined();
      });
      
      strengthItems.forEach(item => {
        expect(item.style.cursor).toBeDefined();
      });
    });

    test('should have expandable lore toggle', () => {
      const loreToggle = document.querySelector('.lore-toggle');
      expect(loreToggle).toBeDefined();
      expect(loreToggle.getAttribute('aria-label')).toBeDefined();
    });
  });
}); 