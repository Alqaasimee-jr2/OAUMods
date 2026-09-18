// js/clearance.js
// Interactive clearance checklist controller for OAUMods

import { CLEARANCE_PIPELINE } from '../data/clearance_pipeline.js';

const STORAGE_KEY = 'oaumods_clearance_progress_v1';

export function initClearanceModule(openModalFn) {
  const container = document.getElementById('clearance-list-container');
  const countEl = document.getElementById('clearance-completed-count');
  const fillBarEl = document.getElementById('clearance-bar-fill');

  if (!container) return;

  // Load saved state
  let completedSteps = getCompletedSteps();

  function getCompletedSteps() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCompletedSteps(steps) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(steps));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  }

  function updateProgressBar() {
    const total = CLEARANCE_PIPELINE.length;
    const completed = completedSteps.length;
    const pct = Math.round((completed / total) * 100);
    
    if (countEl) countEl.textContent = `${completed}/${total} (${pct}%)`;
    if (fillBarEl) fillBarEl.style.width = `${pct}%`;
  }

  function renderList() {
    container.innerHTML = '';

    CLEARANCE_PIPELINE.forEach((step, index) => {
      const isCompleted = completedSteps.includes(step.id);
      const card = document.createElement('div');
      card.className = `item-card clearance-card ${isCompleted ? 'completed' : ''}`;
      card.id = `clearance-${step.id}`;

      card.innerHTML = `
        <div class="checkbox-custom" id="check-${step.id}" title="${isCompleted ? 'Mark as incomplete' : 'Mark as completed'}">
          ${isCompleted ? '✓' : ''}
        </div>
        <div style="flex: 1;">
          <div class="step-number-tag">STEP ${index + 1} OF ${CLEARANCE_PIPELINE.length}</div>
          <div class="card-top">
            <h3 class="card-title">${step.title}</h3>
            <span class="badge-tag">${step.category}</span>
          </div>
          <div class="card-meta">
            <span>📍 ${step.location}</span>
          </div>
          <p class="card-desc">${step.summary}</p>
          <div class="card-footer">
            <span>🏛️ ${step.office}</span>
            <span class="action-link">View Documents & Tips ➔</span>
          </div>
        </div>
      `;

      // Checkbox click (Toggle completion)
      const checkbox = card.querySelector('.checkbox-custom');
      checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStep(step.id);
      });

      // Card body click (Open full drawer modal)
      card.addEventListener('click', () => {
        showStepDetailModal(step, isCompleted, openModalFn);
      });

      container.appendChild(card);
    });

    updateProgressBar();
  }

  function toggleStep(stepId) {
    if (completedSteps.includes(stepId)) {
      completedSteps = completedSteps.filter(id => id !== stepId);
    } else {
      completedSteps.push(stepId);
    }
    saveCompletedSteps(completedSteps);
    renderList();
  }

  function showStepDetailModal(step, isCompleted, openModal) {
    const docItems = step.documents.map(d => `<li class="modal-doc-item">📄 ${d}</li>`).join('');
    const proTips = step.proTips.map(t => `<li style="margin-bottom:6px;">💡 ${t}</li>`).join('');

    const contentHtml = `
      <div style="margin-bottom: 12px;">
        <span class="badge-tag">${step.category}</span>
        <h2 class="modal-title" style="margin-top: 6px;">${step.title}</h2>
        <div style="color: var(--color-accent); font-weight: 600; font-size: 13px; margin-top: 2px;">
          📍 Location: ${step.location} | 🏛️ Office: ${step.office}
        </div>
      </div>

      ${step.importantNote ? `
        <div class="alert-box" style="margin-bottom: 14px;">
          <div class="alert-icon">⚠️</div>
          <div class="alert-content">
            <h4>Important Notice</h4>
            <p>${step.importantNote}</p>
          </div>
        </div>
      ` : ''}

      <h4 style="color: var(--text-main); font-size: 14px; margin-top: 14px; margin-bottom: 6px;">📋 Required Documents & Items:</h4>
      <ul class="modal-doc-list">${docItems}</ul>

      <h4 style="color: var(--text-main); font-size: 14px; margin-top: 16px; margin-bottom: 6px;">💡 Great Ife Pro-Tips:</h4>
      <ul style="padding-left: 18px; color: var(--text-muted); font-size: 13px;">${proTips}</ul>

      <div style="margin-top: 20px;">
        <button class="btn-primary" id="modal-toggle-step-btn">
          ${isCompleted ? '✓ Mark as Incomplete' : 'Mark as Completed'}
        </button>
      </div>
    `;

    openModal(step.title, contentHtml, () => {
      const toggleBtn = document.getElementById('modal-toggle-step-btn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          toggleStep(step.id);
          // refresh button text
          const nowCompleted = completedSteps.includes(step.id);
          toggleBtn.textContent = nowCompleted ? '✓ Mark as Incomplete' : 'Mark as Completed';
        });
      }
    });
  }

  renderList();
}
