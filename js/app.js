// js/app.js
// Main application controller, routing, global search, and modal manager for OAUMods

import { initClearanceModule } from './clearance.js';
import { initAtlasModule } from './atlas.js';
import { initAccommodationModule } from './accommodation.js';
import { initTransitModule } from './transit.js';
import { initGpaModule } from './gpa.js';
import { initAccountModule } from './account.js';

import { CLEARANCE_PIPELINE } from '../data/clearance_pipeline.js';
import { OAU_LANDMARKS } from '../data/landmarks.js';
import { SURVIVAL_DATA } from '../data/survival_data.js';
import { TRANSIT_GUIDE } from '../data/transit_fares.js';

document.addEventListener('DOMContentLoaded', () => {
  // Modal Elements
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title-text');
  const modalBody = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal(title, htmlContent, onMounted) {
    if (!modalBackdrop) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = htmlContent;
    modalBackdrop.classList.add('open');
    if (typeof onMounted === 'function') {
      onMounted();
    }
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Bottom Navigation & Tab Switching
  const navButtons = document.querySelectorAll('.nav-item');
  const tabViews = document.querySelectorAll('.tab-view');

  function switchTab(tabId) {
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    tabViews.forEach(view => {
      view.classList.toggle('active', view.id === `view-${tabId}`);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (tab) switchTab(tab);
    });
  });

  // Offline / Online Status Indicator
  const offlineBadge = document.getElementById('app-offline-status');
  function updateNetworkStatus() {
    if (!offlineBadge) return;
    if (navigator.onLine) {
      offlineBadge.innerHTML = `<span class="offline-dot"></span> Offline Ready`;
      offlineBadge.style.color = 'var(--color-emerald)';
      offlineBadge.style.background = 'var(--color-emerald-subtle)';
    } else {
      offlineBadge.innerHTML = `<span class="offline-dot" style="background:var(--color-accent); box-shadow:0 0 6px var(--color-accent);"></span> Offline Mode`;
      offlineBadge.style.color = 'var(--color-accent)';
      offlineBadge.style.background = 'var(--color-accent-subtle)';
    }
  }
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  updateNetworkStatus();

  // Global Instant Search Logic
  const globalSearchBtn = document.getElementById('global-search-trigger');
  const globalSearchModal = document.getElementById('global-search-overlay');
  const globalSearchInput = document.getElementById('global-search-field');
  const globalSearchResults = document.getElementById('global-search-results');
  const globalSearchClose = document.getElementById('global-search-close-btn');

  function openGlobalSearch() {
    if (!globalSearchModal) return;
    globalSearchModal.style.display = 'flex';
    if (globalSearchInput) {
      globalSearchInput.value = '';
      globalSearchInput.focus();
      renderGlobalResults('');
    }
  }

  function closeGlobalSearch() {
    if (globalSearchModal) globalSearchModal.style.display = 'none';
  }

  if (globalSearchBtn) globalSearchBtn.addEventListener('click', openGlobalSearch);
  if (globalSearchClose) globalSearchClose.addEventListener('click', closeGlobalSearch);

  function renderGlobalResults(query) {
    if (!globalSearchResults) return;
    const q = query.toLowerCase().trim();

    if (!q) {
      globalSearchResults.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-dim); font-size: 13px;">
          Type anything to search: "BOOC", "White House", "clearance", "remita", "angola", "fare"...
        </div>
      `;
      return;
    }

    const matches = [];

    // Search Landmarks
    OAU_LANDMARKS.forEach(l => {
      if (l.name.toLowerCase().includes(q) || l.shortName.toLowerCase().includes(q) || l.faculty.toLowerCase().includes(q)) {
        matches.push({
          title: l.name,
          category: `Campus Location (${l.categoryLabel})`,
          detail: l.whatHappensHere,
          action: () => {
            closeGlobalSearch();
            switchTab('atlas');
            const el = document.getElementById(`poi-${l.id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    });

    // Search Clearance
    CLEARANCE_PIPELINE.forEach(c => {
      if (c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.office.toLowerCase().includes(q)) {
        matches.push({
          title: c.title,
          category: `Clearance Pipeline (${c.category})`,
          detail: c.summary,
          action: () => {
            closeGlobalSearch();
            switchTab('clearance');
            const el = document.getElementById(`clearance-${c.id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    });

    // Search Survival Lingo
    SURVIVAL_DATA.lingoDecoder.forEach(lingo => {
      if (lingo.term.toLowerCase().includes(q) || lingo.meaning.toLowerCase().includes(q)) {
        matches.push({
          title: lingo.term,
          category: "Campus Slang / Culture",
          detail: lingo.meaning,
          action: () => {
            closeGlobalSearch();
            switchTab('academics');
          }
        });
      }
    });

    // Search Transit
    TRANSIT_GUIDE.routes.forEach(route => {
      if (route.origin.toLowerCase().includes(q) || route.destination.toLowerCase().includes(q) || route.vehicleType.toLowerCase().includes(q)) {
        matches.push({
          title: `${route.origin} ➔ ${route.destination}`,
          category: `Transit (${route.fare})`,
          detail: route.tips,
          action: () => {
            closeGlobalSearch();
            switchTab('transit');
          }
        });
      }
    });

    if (matches.length === 0) {
      globalSearchResults.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-dim); font-size: 13px;">
          No direct results for "${query}". Try another keyword.
        </div>
      `;
      return;
    }

    globalSearchResults.innerHTML = '';
    matches.slice(0, 8).forEach(item => {
      const resultCard = document.createElement('div');
      resultCard.className = 'item-card';
      resultCard.style.marginBottom = '8px';
      resultCard.innerHTML = `
        <div class="card-top">
          <h4 class="card-title" style="font-size:14px;">${item.title}</h4>
          <span class="badge-tag">${item.category}</span>
        </div>
        <p class="card-desc" style="font-size:12px; margin-bottom:0;">${item.detail.length > 90 ? item.detail.substring(0, 90) + '...' : item.detail}</p>
      `;
      resultCard.addEventListener('click', item.action);
      globalSearchResults.appendChild(resultCard);
    });
  }

  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      renderGlobalResults(e.target.value);
    });
  }

  // Render Survival & Emergency on Academics Tab
  function renderSurvivalAndEmergency() {
    const lingoContainer = document.getElementById('survival-lingo-container');
    const emergencyContainer = document.getElementById('emergency-contacts-container');

    if (lingoContainer) {
      lingoContainer.innerHTML = '';
      SURVIVAL_DATA.lingoDecoder.forEach(item => {
        const row = document.createElement('div');
        row.style.background = 'var(--bg-card)';
        row.style.border = '1px solid var(--border-subtle)';
        row.style.borderRadius = 'var(--radius-sm)';
        row.style.padding = '10px 12px';
        row.style.marginBottom = '8px';
        row.innerHTML = `
          <div style="font-weight:700; color:var(--color-accent); font-size:14px; margin-bottom:2px;">
            ${item.term}
          </div>
          <div style="font-size:12px; color:var(--text-muted); line-height:1.4;">
            ${item.meaning}
          </div>
          <div style="font-size:11px; color:var(--color-teal); margin-top:4px;">
            💡 ${item.advice}
          </div>
        `;
        lingoContainer.appendChild(row);
      });
    }

    if (emergencyContainer) {
      emergencyContainer.innerHTML = '';
      SURVIVAL_DATA.emergencyContacts.forEach(contact => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'space-between';
        row.style.background = 'var(--bg-card)';
        row.style.border = '1px solid var(--border-subtle)';
        row.style.borderRadius = 'var(--radius-sm)';
        row.style.padding = '10px 12px';
        row.style.marginBottom = '8px';
        row.innerHTML = `
          <div>
            <div style="font-weight:700; color:var(--text-main); font-size:13px;">${contact.name}</div>
            <div style="font-size:11px; color:var(--text-dim);">${contact.role}</div>
          </div>
          <a href="tel:${contact.phone.replace(/\s+/g, '')}" class="chip-btn" style="background:var(--color-rose-subtle); color:var(--color-rose); border-color:rgba(239,68,68,0.3); text-decoration:none;">
            📞 Call
          </a>
        `;
        emergencyContainer.appendChild(row);
      });
    }
  }

  // Initialize all sub-modules
  initClearanceModule(openModal);
  initAtlasModule(openModal);
  initAccommodationModule(openModal);
  initTransitModule();
  initGpaModule();
  initAccountModule();
  renderSurvivalAndEmergency();

  // Register Service Worker for Offline PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('OAUMods ServiceWorker registered:', reg.scope))
        .catch(err => console.warn('ServiceWorker registration error:', err));
    });
  }
});
