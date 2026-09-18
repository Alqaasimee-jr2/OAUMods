// js/transit.js
// Transit & Mobility controller for OAUMods

import { TRANSIT_GUIDE } from '../data/transit_fares.js';

export function initTransitModule() {
  const routesContainer = document.getElementById('transit-routes-container');
  const hacksContainer = document.getElementById('transit-hacks-container');

  if (!routesContainer) return;

  // Render Routes
  routesContainer.innerHTML = '';
  TRANSIT_GUIDE.routes.forEach(route => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="card-top">
        <h3 class="card-title">${route.origin} ➔ ${route.destination}</h3>
        <span class="badge-tag" style="background: rgba(0, 180, 216, 0.15); color: var(--color-teal);">${route.vehicleType}</span>
      </div>
      <div style="font-size: 15px; font-weight: 800; color: var(--color-accent); margin: 6px 0;">
        Fare: ${route.fare}
      </div>
      <div class="card-meta">
        <span>⏰ ${route.operatingHours}</span>
      </div>
      <div style="font-size: 12px; color: var(--text-dim); margin-bottom: 8px;">
        🛑 Stops: ${route.keyStops.join(' • ')}
      </div>
      <p class="card-desc" style="margin-bottom:0;">💡 ${route.tips}</p>
    `;
    routesContainer.appendChild(card);
  });

  // Render Hacks
  if (hacksContainer) {
    hacksContainer.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
        <h4 style="font-size: 14px; font-weight: 700; color: var(--color-accent); margin-bottom: 8px;">🚌 Transit Survival Rules:</h4>
        <ul style="padding-left: 18px; color: var(--text-muted); font-size: 13px; display: flex; flex-direction: column; gap: 6px;">
          ${TRANSIT_GUIDE.transitSurvivalHacks.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}
