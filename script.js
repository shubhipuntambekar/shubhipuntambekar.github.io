// Portfolio Dashboard JavaScript
function initializeDashboard(data) {
    renderSkillsCloud(data.skills);
    renderAchievementsTimeline(data.achievements);
    renderStatistics(data);
}

function renderSkillsCloud(skills) {
    const skillsCloud = document.getElementById('skills-cloud');
    skillsCloud.innerHTML = '';
    
    skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill.name;
        skillTag.title = `${skill.name} - ${skill.level} (used ${skill.frequency} times)`;
        skillsCloud.appendChild(skillTag);
    });
}

function renderAchievementsTimeline(achievements) {
    const timeline = document.getElementById('achievements-timeline');
    timeline.innerHTML = '';
    
    // Sort achievements by date (newest first)
    const sortedAchievements = achievements.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    sortedAchievements.forEach(achievement => {
        const achievementItem = document.createElement('div');
        achievementItem.className = 'achievement-item';
        
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
    });
}

function renderStatistics(data) {
    const statsGrid = document.getElementById('statistics-grid');
    statsGrid.innerHTML = '';
    
    const stats = [
        { number: data.achievements.length, label: 'Achievements' },
        { number: data.skills.length, label: 'Skills' },
        { number: data.achievements.reduce((sum, a) => sum + a.commits.length, 0), label: 'Total Commits' },
        { number: Math.max(...data.achievements.map(a => a.impact_score), 0).toFixed(1), label: 'Max Impact Score' }
    ];
    
    stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsGrid.appendChild(statCard);
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