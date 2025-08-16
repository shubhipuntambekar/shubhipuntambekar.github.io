// Modern Portfolio Dashboard JavaScript
function initializeDashboard(data) {
    renderSkillsCloud(data.skills);
    renderAchievementsTimeline(data.achievements);
    renderStatistics(data);
    addInteractions();
    initializeAnimations();
}

function renderSkillsCloud(skills) {
    const skillsCloud = document.getElementById('skills-cloud');
    skillsCloud.innerHTML = '';
    
    skills.forEach((skill, index) => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill.name;
        skillTag.title = `${skill.name} - ${skill.level} (used ${skill.frequency} times)`;
        skillTag.style.animationDelay = `${index * 0.1}s`;
        skillTag.style.opacity = '0';
        skillTag.style.transform = 'translateY(20px)';
        
        skillsCloud.appendChild(skillTag);
        
        // Animate in
        setTimeout(() => {
            skillTag.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            skillTag.style.opacity = '1';
            skillTag.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function renderAchievementsTimeline(achievements) {
    const timeline = document.getElementById('achievements-timeline');
    timeline.innerHTML = '';
    
    // Sort achievements by date (newest first)
    const sortedAchievements = achievements.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    sortedAchievements.forEach((achievement, index) => {
        const achievementItem = document.createElement('div');
        achievementItem.className = 'achievement-item';
        achievementItem.style.opacity = '0';
        achievementItem.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
        
        const date = new Date(achievement.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        achievementItem.innerHTML = `
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-date">${date}</div>
            <div class="achievement-description">${achievement.description}</div>
            <div class="achievement-skills">
                ${achievement.skills_used.map(skill => 
                    `<span class="achievement-skill">${skill}</span>`
                ).join('')}
            </div>
        `;
        
        timeline.appendChild(achievementItem);
        
        // Animate in with delay
        setTimeout(() => {
            achievementItem.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            achievementItem.style.opacity = '1';
            achievementItem.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

function renderStatistics(data) {
    const statsGrid = document.getElementById('statistics-grid');
    statsGrid.innerHTML = '';
    
    const stats = [
        { number: data.achievements.length, label: 'Achievements', icon: '🏆' },
        { number: data.skills.length, label: 'Skills', icon: '🛠️' },
        { number: data.achievements.reduce((sum, a) => sum + a.commits.length, 0), label: 'Total Commits', icon: '📝' },
        { number: Math.max(...data.achievements.map(a => a.impact_score), 0).toFixed(1), label: 'Max Impact Score', icon: '⭐' }
    ];
    
    stats.forEach((stat, index) => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.style.opacity = '0';
        statCard.style.transform = 'translateY(30px)';
        
        statCard.innerHTML = `
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-number" data-target="${stat.number}">0</div>
            <div class="stat-label">${stat.label}</div>
        `;
        
        statsGrid.appendChild(statCard);
        
        // Animate in with delay
        setTimeout(() => {
            statCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            statCard.style.opacity = '1';
            statCard.style.transform = 'translateY(0)';
            
            // Animate number counting
            animateNumber(statCard.querySelector('.stat-number'), stat.number);
        }, index * 150);
    });
}

function animateNumber(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

function addInteractions() {
    // Add hover effects for skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects for achievement items
    document.querySelectorAll('.achievement-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        });
    });
}

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});