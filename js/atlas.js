// js/atlas.js
// Campus Atlas & POI Directory controller for OAUMods

import { OAU_LANDMARKS } from '../data/landmarks.js';

export function initAtlasModule(openModalFn) {
  const container = document.getElementById('atlas-cards-container');
  const searchInput = document.getElementById('atlas-search-input');
  const chipButtons = document.querySelectorAll('.atlas-chip');

  if (!container) return;

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function filterLandmarks() {
    return OAU_LANDMARKS.filter(item => {
      const matchesCategory = (currentCategory === 'all') || (item.category === currentCategory);
      
      const query = currentSearchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const inName = item.name.toLowerCase().includes(query);
      const inShort = item.shortName.toLowerCase().includes(query);
      const inFaculty = item.faculty.toLowerCase().includes(query);
      const inWhat = item.whatHappensHere.toLowerCase().includes(query);
      const inTags = item.tags && item.tags.some(t => t.toLowerCase().includes(query));

      return matchesCategory && (inName || inShort || inFaculty || inWhat || inTags);
    });
  }

  function renderCards() {
    const landmarks = filterLandmarks();
    container.innerHTML = '';

    if (landmarks.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-dim);">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <div style="font-weight: 600; color: var(--text-muted);">No campus locations found</div>
          <div style="font-size: 13px; margin-top: 4px;">Try searching for "BOOC", "White House", "Moz", or "Library".</div>
        </div>
      `;
      return;
    }

    landmarks.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';
      card.id = `poi-${item.id}`;

      card.innerHTML = `
        <div class="card-top">
          <h3 class="card-title">${item.shortName}</h3>
          <span class="badge-tag ${item.category}">${item.categoryLabel}</span>
        </div>
        <div class="card-meta">
          <span>🏛️ ${item.faculty}</span>
        </div>
        <p class="card-desc">${item.whatHappensHere.length > 110 ? item.whatHappensHere.substring(0, 110) + '...' : item.whatHappensHere}</p>
        <div class="card-footer">
          <span>🚌 Stop: ${item.nearestStop}</span>
          <span class="action-link">Full Details ➔</span>
        </div>
      `;

      card.addEventListener('click', () => {
        showLandmarkDetailModal(item, openModalFn);
      });

      container.appendChild(card);
    });
  }

  function showLandmarkDetailModal(item, openModal) {
    const contentHtml = `
      <div style="margin-bottom: 14px;">
        <span class="badge-tag ${item.category}">${item.categoryLabel}</span>
        <h2 class="modal-title" style="margin-top: 6px;">${item.name}</h2>
        <div style="color: var(--color-accent); font-size: 13px; font-weight: 600; margin-top: 2px;">
          🏛️ ${item.faculty} | 📍 ${item.zone}
        </div>
      </div>

      <div style="background: var(--bg-card); border-radius: var(--radius-md); padding: 14px; margin-bottom: 14px; border: 1px solid var(--border-subtle);">
        <h4 style="color: var(--text-main); font-size: 13px; margin-bottom: 6px;">📖 What Happens Here:</h4>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">${item.whatHappensHere}</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; font-size: 13px;">
        <div style="display: flex; align-items: center; gap: 8px; color: var(--text-main);">
          <span>🚌</span> <strong>Nearest Transit Stop:</strong> <span style="color: var(--color-teal);">${item.nearestStop}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; color: var(--text-main);">
          <span>⏰</span> <strong>Hours:</strong> <span style="color: var(--text-muted);">${item.operatingHours}</span>
        </div>
      </div>

      <div style="background: var(--color-accent-subtle); border: 1px solid var(--border-accent); border-radius: var(--radius-md); padding: 12px 14px;">
        <h4 style="color: var(--color-accent); font-size: 13px; margin-bottom: 4px;">💡 Great Ife Insider Tip:</h4>
        <p style="font-size: 12px; color: var(--text-main); line-height: 1.45;">${item.proTip}</p>
      </div>
    `;

    openModal(item.shortName, contentHtml);
  }

  // Filter chips
  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chipButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category || 'all';
      renderCards();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderCards();
    });
  }

  renderCards();
}
