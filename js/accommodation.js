// js/accommodation.js
// Accommodation Hub controller for OAUMods

import { ACCOMMODATION_GUIDE } from '../data/accommodation_data.js';

export function initAccommodationModule(openModalFn) {
  const ballotingContainer = document.getElementById('balloting-guide-container');
  const hallsContainer = document.getElementById('on-campus-halls-container');
  const offCampusContainer = document.getElementById('off-campus-container');

  if (!ballotingContainer || !hallsContainer || !offCampusContainer) return;

  // 1. Render Balloting Strategy
  const strat = ACCOMMODATION_GUIDE.ballotingStrategy;
  ballotingContainer.innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border-accent); border-radius: var(--radius-md); padding: 16px;">
      <h3 style="font-family: var(--font-heading); font-size: 16px; color: var(--color-accent); margin-bottom: 10px;">
        🎯 ${strat.title}
      </h3>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
        ${strat.rules.map(r => `
          <div style="font-size: 13px; color: var(--text-main); display: flex; align-items: flex-start; gap: 8px; line-height: 1.45;">
            <span style="color: var(--color-accent); flex-shrink: 0;">▪</span>
            <span>${r}</span>
          </div>
        `).join('')}
      </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 10px;">
        <h4 style="font-size: 13px; color: var(--color-teal); margin-bottom: 6px;">⚡ Balloting Day Checklist:</h4>
        ${strat.proTips.map(p => `
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 4px; display: flex; gap: 6px;">
            <span>✓</span> <span>${p}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 2. Render On-Campus Halls
  hallsContainer.innerHTML = '';
  ACCOMMODATION_GUIDE.onCampusHalls.forEach(hall => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="card-top">
        <h3 class="card-title">${hall.name}</h3>
        <span class="badge-tag hostel">${hall.target}</span>
      </div>
      <div class="card-meta">
        <span>📍 ${hall.location}</span>
      </div>
      <p class="card-desc">${hall.highlights}</p>
      <div class="card-footer">
        <span>🔒 Curfew: ${hall.curfew}</span>
        <span>🔑 Porter: ${hall.porterDesk}</span>
      </div>
    `;
    hallsContainer.appendChild(card);
  });

  // 3. Render Off-Campus Zones
  offCampusContainer.innerHTML = '';
  ACCOMMODATION_GUIDE.offCampusZones.forEach(zone => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="card-top">
        <h3 class="card-title">${zone.zoneName}</h3>
        <span class="badge-tag" style="background:rgba(16,185,129,0.15); color:var(--color-emerald);">${zone.verdict}</span>
      </div>
      <div style="margin: 8px 0; font-size: 13px; color: var(--color-accent); font-weight: 700;">
        💰 Est. Rent: ${zone.estimatedPriceRange}
      </div>
      <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px; display: flex; flex-direction: column; gap: 4px;">
        <div>🚶 <strong>Distance to Campus:</strong> ${zone.distanceToCampus}</div>
        <div>⚡ <strong>Electricity:</strong> ${zone.electricityRating} | 🛡️ <strong>Security:</strong> ${zone.securityRating}</div>
      </div>
      <p class="card-desc" style="margin-bottom:0;">${zone.summary}</p>
    `;
    offCampusContainer.appendChild(card);
  });
}
