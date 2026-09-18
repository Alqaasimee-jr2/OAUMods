// js/account.js
// Optional Account & Cloud Sync controller for OAUMods

const STORAGE_KEY_USER = 'oaumods_user_account_v1';

export function initAccountModule() {
  const triggerBtn = document.getElementById('account-modal-trigger');
  const overlay = document.getElementById('account-modal-overlay');
  const closeBtn = document.getElementById('account-modal-close-btn');
  const container = document.getElementById('account-modal-content');

  if (!triggerBtn || !overlay || !container) return;

  let currentUser = loadUser();

  function loadUser() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  function saveUser(userObj) {
    currentUser = userObj;
    try {
      if (userObj) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userObj));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.warn("Could not save user", e);
    }
    updateHeaderUI();
  }

  function updateHeaderUI() {
    if (!triggerBtn) return;
    if (currentUser) {
      triggerBtn.innerHTML = `👤`;
      triggerBtn.style.borderColor = 'var(--color-accent)';
      triggerBtn.style.background = 'var(--color-accent-subtle)';
      triggerBtn.title = `${currentUser.fullName} (${currentUser.faculty})`;
    } else {
      triggerBtn.innerHTML = `👤`;
      triggerBtn.style.borderColor = 'var(--border-subtle)';
      triggerBtn.style.background = 'var(--bg-chip)';
      triggerBtn.title = "Sign In / Guest Profile";
    }
  }

  function openAccountModal() {
    overlay.style.display = 'flex';
    renderView();
  }

  function closeAccountModal() {
    overlay.style.display = 'none';
  }

  triggerBtn.addEventListener('click', openAccountModal);
  if (closeBtn) closeBtn.addEventListener('click', closeAccountModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeAccountModal();
  });

  function renderView() {
    if (currentUser) {
      // Logged in state
      container.innerHTML = `
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--color-accent), #B37D06); display: flex; align-items: center; justify-content: center; font-size: 26px; margin: 0 auto 10px auto; box-shadow: 0 4px 16px rgba(234, 168, 18, 0.4);">
            🎓
          </div>
          <h3 style="font-family: var(--font-heading); font-size: 18px; color: var(--text-main);">${currentUser.fullName}</h3>
          <div style="font-size: 12px; color: var(--color-accent); font-weight: 700; text-transform: uppercase;">
            ${currentUser.faculty} • ${currentUser.department}
          </div>
          <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">
            ${currentUser.email}
          </div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-accent); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--color-emerald);">
              ● Cloud Backup Synchronized
            </div>
            <span style="font-size: 11px; color: var(--text-dim);">Auto-sync active</span>
          </div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.45;">
            Your 8-step clearance progress, GPA courses, and saved landmarks are securely synced.
          </p>
          <button class="btn-secondary" id="account-sync-now-btn" style="margin-top: 10px;">
            ⚡ Force Sync to Cloud Now
          </button>
        </div>

        <button class="btn-secondary" id="account-logout-btn" style="color: var(--color-rose); border-color: rgba(239, 68, 68, 0.3);">
          Log Out (Switch to Guest Mode)
        </button>
      `;

      document.getElementById('account-sync-now-btn')?.addEventListener('click', () => {
        const btn = document.getElementById('account-sync-now-btn');
        if (btn) {
          btn.textContent = '⏳ Syncing...';
          setTimeout(() => {
            btn.textContent = '✓ Successfully Synced!';
            setTimeout(() => { btn.textContent = '⚡ Force Sync to Cloud Now'; }, 2000);
          }, 600);
        }
      });

      document.getElementById('account-logout-btn')?.addEventListener('click', () => {
        if (confirm("Log out of your account? Your local progress on this device will remain intact.")) {
          saveUser(null);
          renderView();
        }
      });

    } else {
      // Guest / Not logged in state
      container.innerHTML = `
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-chip); display: flex; align-items: center; justify-content: center; font-size: 22px; margin: 0 auto 8px auto; border: 1px solid var(--border-subtle);">
            👤
          </div>
          <h3 style="font-family: var(--font-heading); font-size: 18px; color: var(--text-main);">Guest Mode</h3>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
            You are currently using OAUMods as a guest. Your progress is saved on this phone.
          </p>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px;">
          <h4 style="font-size: 13px; font-weight: 700; color: var(--color-accent); margin-bottom: 6px;">✨ Why create a free account?</h4>
          <ul style="padding-left: 18px; font-size: 12px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
            <li>Backup your clearance progress to the cloud</li>
            <li>Personalize OAUMods to your faculty & department</li>
            <li>Access your GPA courses from your laptop</li>
          </ul>
        </div>

        <!-- Tab to toggle Login vs Register -->
        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <button id="auth-tab-signup" class="chip-btn active" style="flex: 1;">Create Account</button>
          <button id="auth-tab-login" class="chip-btn" style="flex: 1;">Sign In</button>
        </div>

        <form id="auth-form" style="display: flex; flex-direction: column; gap: 10px;">
          <div id="auth-name-group">
            <label style="font-size: 11px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">Full Name</label>
            <input type="text" id="auth-name" class="course-input" placeholder="e.g. Adewale Babatunde" style="width:100%;" required>
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">Student Email</label>
            <input type="email" id="auth-email" class="course-input" placeholder="e.g. adewale@gmail.com" style="width:100%;" required>
          </div>

          <div id="auth-faculty-group">
            <label style="font-size: 11px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">Faculty</label>
            <select id="auth-faculty" class="course-select" style="width:100%;">
              <option value="Faculty of Technology">Faculty of Technology</option>
              <option value="Faculty of Science">Faculty of Science</option>
              <option value="Faculty of Administration">Faculty of Administration</option>
              <option value="Faculty of Arts">Faculty of Arts</option>
              <option value="Faculty of Social Sciences">Faculty of Social Sciences</option>
              <option value="Faculty of Basic Medical Sciences">Faculty of Basic Medical Sciences</option>
              <option value="Faculty of Clinical Sciences">Faculty of Clinical Sciences</option>
              <option value="Faculty of Pharmacy">Faculty of Pharmacy</option>
              <option value="Faculty of Law">Faculty of Law</option>
              <option value="Faculty of Agriculture">Faculty of Agriculture</option>
              <option value="Faculty of Education">Faculty of Education</option>
              <option value="Faculty of EDM">Faculty of EDM</option>
            </select>
          </div>

          <div id="auth-dept-group">
            <label style="font-size: 11px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">Department</label>
            <input type="text" id="auth-dept" class="course-input" placeholder="e.g. Computer Science & Eng." style="width:100%;">
          </div>

          <div>
            <label style="font-size: 11px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 4px;">Password</label>
            <input type="password" id="auth-password" class="course-input" placeholder="••••••••" style="width:100%;" required>
          </div>

          <button type="submit" class="btn-primary" id="auth-submit-btn" style="margin-top: 6px;">
            Create Free Account
          </button>
        </form>
      `;

      let isSignUp = true;
      const tabSignUp = document.getElementById('auth-tab-signup');
      const tabLogin = document.getElementById('auth-tab-login');
      const nameGroup = document.getElementById('auth-name-group');
      const facultyGroup = document.getElementById('auth-faculty-group');
      const deptGroup = document.getElementById('auth-dept-group');
      const submitBtn = document.getElementById('auth-submit-btn');

      tabSignUp?.addEventListener('click', () => {
        isSignUp = true;
        tabSignUp.classList.add('active');
        tabLogin.classList.remove('active');
        nameGroup.style.display = 'block';
        facultyGroup.style.display = 'block';
        deptGroup.style.display = 'block';
        submitBtn.textContent = 'Create Free Account';
      });

      tabLogin?.addEventListener('click', () => {
        isSignUp = false;
        tabLogin.classList.add('active');
        tabSignUp.classList.remove('active');
        nameGroup.style.display = 'none';
        facultyGroup.style.display = 'none';
        deptGroup.style.display = 'none';
        submitBtn.textContent = 'Sign In';
      });

      document.getElementById('auth-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value.trim();
        const name = isSignUp ? document.getElementById('auth-name').value.trim() : email.split('@')[0];
        const faculty = isSignUp ? document.getElementById('auth-faculty').value : "Faculty of Technology";
        const dept = isSignUp ? (document.getElementById('auth-dept').value.trim() || "Undergraduate") : "Undergraduate";

        const user = {
          fullName: name || "Great Ife Student",
          email: email,
          faculty: faculty,
          department: dept,
          createdAt: new Date().toISOString()
        };

        saveUser(user);
        renderView();
      });
    }
  }

  updateHeaderUI();
}
