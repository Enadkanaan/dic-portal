/**
 * auth.js — DIC Portal authentication helpers
 * Role-based routing: startup | staff | admin
 */
import { supabase } from './supabase-config.js';

// ── Session guard ─────────────────────────────────────────────
// Call on every protected page. Redirects to login if no session.
export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = './index.html'; return null; }
  return session;
}

// ── Get current user profile (role + startup_id) ─────────────
export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  return data;
}

// ── Login ─────────────────────────────────────────────────────
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// ── Logout ────────────────────────────────────────────────────
export async function logout() {
  await supabase.auth.signOut();
  window.location.href = './index.html';
}

// ── Route after login based on role ──────────────────────────
export function routeByRole(role) {
  const routes = {
    startup: './startup-form.html',
    staff:   './staff-view.html',
    admin:   './admin.html'
  };
  window.location.href = routes[role] || './index.html';
}

// ── Render nav user info ──────────────────────────────────────
export function renderUserBadge(profile, container) {
  if (!container || !profile) return;
  const roleColors = { startup: '#00897B', staff: '#1565C0', admin: '#8B0000' };
  container.innerHTML = `
    <span class="user-badge" style="background:${roleColors[profile.role] || '#555'}">
      ${profile.role.toUpperCase()}
    </span>
    <span class="user-name">${profile.display_name || profile.role}</span>
    <button class="btn-logout" id="logout-btn">Sign Out</button>
  `;
  document.getElementById('logout-btn')?.addEventListener('click', logout);
}
