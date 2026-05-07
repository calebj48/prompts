import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useStreak } from '../../hooks/useStreak';

export function Navbar() {
  const { user, openAuthModal, signOut } = useAuth();
  const { streak } = useStreak();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          The Blank Page
        </Link>
        <div className="navbar-nav">
          <NavLink
            to="/write"
            className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
          >
            Write
          </NavLink>
          {user && (
            <NavLink
              to="/archive"
              className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
            >
              Archive
            </NavLink>
          )}
          <NavLink
            to="/about"
            className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
          >
            About
          </NavLink>
          {user && streak && streak.current_streak > 0 && (
            <span className="streak-badge" title={`${streak.longest_streak} day longest streak`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1C6 1 3 4.5 3 7a3 3 0 006 0C9 4.5 6 1 6 1z" fill="currentColor" opacity="0.9" />
              </svg>
              {streak.current_streak}
            </span>
          )}
          {user ? (
            <button className="btn-ghost" onClick={signOut} style={{ padding: '0.4rem 0.875rem' }}>
              Sign out
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={() => openAuthModal('signin')}
              style={{ padding: '0.5rem 1.125rem', fontSize: '0.875rem' }}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
