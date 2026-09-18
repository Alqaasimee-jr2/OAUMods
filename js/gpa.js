// js/gpa.js
// Authentic OAU 5.0 GPA Calculator controller for OAUMods

const STORAGE_KEY_GPA = 'oaumods_gpa_courses_v1';

const GRADE_POINTS = {
  'A': 5,
  'B': 4,
  'C': 3,
  'D': 2,
  'E': 1,
  'F': 0
};

const DEFAULT_COURSES = [
  { code: 'MTH 101', units: 4, grade: 'A' },
  { code: 'CHM 101', units: 3, grade: 'B' },
  { code: 'PHY 101', units: 4, grade: 'A' },
  { code: 'BIO 101', units: 3, grade: 'B' },
  { code: 'CHM 107', units: 1, grade: 'A' },
  { code: 'PHY 107', units: 1, grade: 'A' },
  { code: 'GST 101', units: 2, grade: 'A' }
];

export function initGpaModule() {
  const coursesContainer = document.getElementById('gpa-courses-list');
  const addCourseBtn = document.getElementById('gpa-add-course-btn');
  const resetBtn = document.getElementById('gpa-reset-btn');
  const gpaValueEl = document.getElementById('gpa-value-display');
  const gpaClassEl = document.getElementById('gpa-classification-display');
  const totalUnitsEl = document.getElementById('gpa-total-units');
  const totalPointsEl = document.getElementById('gpa-total-points');

  if (!coursesContainer) return;

  let courses = loadCourses();

  function loadCourses() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GPA);
      return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_COURSES));
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_COURSES));
    }
  }

  function saveCourses() {
    try {
      localStorage.setItem(STORAGE_KEY_GPA, JSON.stringify(courses));
    } catch (e) {
      console.warn("Could not save GPA courses", e);
    }
  }

  function getOAUClassification(gpa) {
    if (isNaN(gpa) || gpa === 0) return "Awaiting Courses";
    if (gpa >= 4.50) return "🌟 First Class Honours";
    if (gpa >= 3.50) return "🎖️ Second Class Upper (2:1)";
    if (gpa >= 2.40) return "📘 Second Class Lower (2:2)";
    if (gpa >= 1.50) return "📙 Third Class";
    if (gpa >= 1.00) return "⚠️ Pass";
    return "🚨 Academic Probation Risk";
  }

  function calculateAndRender() {
    coursesContainer.innerHTML = '';
    let totalUnits = 0;
    let totalQualityPoints = 0;

    courses.forEach((c, index) => {
      const units = parseInt(c.units) || 0;
      const points = GRADE_POINTS[c.grade] !== undefined ? GRADE_POINTS[c.grade] : 0;
      
      totalUnits += units;
      totalQualityPoints += (units * points);

      const row = document.createElement('div');
      row.className = 'course-row';
      row.innerHTML = `
        <input type="text" class="course-input" value="${c.code}" placeholder="Course" data-index="${index}" data-field="code">
        <select class="course-select" data-index="${index}" data-field="units">
          ${[1, 2, 3, 4, 5, 6].map(u => `<option value="${u}" ${u === units ? 'selected' : ''}>${u} unit${u > 1 ? 's' : ''}</option>`).join('')}
        </select>
        <select class="course-select" data-index="${index}" data-field="grade" style="font-weight:700; color:var(--color-accent);">
          ${['A', 'B', 'C', 'D', 'E', 'F'].map(g => `<option value="${g}" ${g === c.grade ? 'selected' : ''}>Grade ${g} (${GRADE_POINTS[g]}pts)</option>`).join('')}
        </select>
        <button class="course-del-btn" data-index="${index}" title="Remove course">✕</button>
      `;

      // Input events
      row.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', (e) => {
          const idx = parseInt(e.target.dataset.index);
          const field = e.target.dataset.field;
          courses[idx][field] = field === 'units' ? parseInt(e.target.value) : e.target.value.toUpperCase();
          saveCourses();
          calculateAndRender();
        });
      });

      row.querySelector('.course-del-btn').addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        courses.splice(idx, 1);
        saveCourses();
        calculateAndRender();
      });

      coursesContainer.appendChild(row);
    });

    const gpa = totalUnits > 0 ? (totalQualityPoints / totalUnits).toFixed(2) : "0.00";

    if (gpaValueEl) gpaValueEl.textContent = gpa;
    if (gpaClassEl) gpaClassEl.textContent = getOAUClassification(parseFloat(gpa));
    if (totalUnitsEl) totalUnitsEl.textContent = totalUnits;
    if (totalPointsEl) totalPointsEl.textContent = totalQualityPoints;
  }

  if (addCourseBtn) {
    addCourseBtn.addEventListener('click', () => {
      courses.push({ code: `COURSE ${courses.length + 1}`, units: 3, grade: 'A' });
      saveCourses();
      calculateAndRender();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("Reset to sample 100-level courses?")) {
        courses = JSON.parse(JSON.stringify(DEFAULT_COURSES));
        saveCourses();
        calculateAndRender();
      }
    });
  }

  calculateAndRender();
}
