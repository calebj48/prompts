import { type FormEvent, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../hooks/useToast';

type Mode = 'signin' | 'signup' | 'magic-link';

interface AuthFormProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onClose: () => void;
}

export function AuthForm({ mode, onModeChange, onClose }: AuthFormProps) {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'magic-link') {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        setMagicSent(true);
        return;
      }

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        addToast('Account created. Check your email to confirm.', 'success');
        onClose();
        return;
      }

      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        addToast('Welcome back.', 'success');
        onClose();
        return;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (magicSent) {
    return (
      <div>
        <h2 className="auth-title">Check your inbox</h2>
        <p className="auth-sub" style={{ marginBottom: 0 }}>
          We sent a magic link to <strong style={{ color: 'var(--color-text)' }}>{email}</strong>.
          Click it to sign in. You can close this.
        </p>
      </div>
    );
  }

  const titles: Record<Mode, string> = {
    signin: 'Sign in',
    signup: 'Create account',
    'magic-link': 'Magic link',
  };

  const subs: Record<Mode, string> = {
    signin: 'Continue your practice.',
    signup: 'Start your streak. Free, forever.',
    'magic-link': 'We\'ll email you a link to sign in — no password needed.',
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="auth-title">{titles[mode]}</h2>
      <p className="auth-sub">{subs[mode]}</p>

      <div className="auth-field">
        <label className="auth-label" htmlFor="auth-email">Email</label>
        <input
          id="auth-email"
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
      </div>

      {mode !== 'magic-link' && (
        <div className="auth-field">
          <label className="auth-label" htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === 'signup' ? 'At least 8 characters' : ''}
            required
            minLength={mode === 'signup' ? 8 : undefined}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />
        </div>
      )}

      {error && <p className="auth-error">{error}</p>}

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {loading ? 'One moment…' : titles[mode]}
      </button>

      <div className="auth-divider">or</div>

      <div className="auth-switch">
        {mode === 'signin' && (
          <>
            <button type="button" className="auth-switch-link" onClick={() => onModeChange('magic-link')}>
              Sign in with magic link
            </button>
            {' · '}
            <button type="button" className="auth-switch-link" onClick={() => onModeChange('signup')}>
              Create account
            </button>
          </>
        )}
        {mode === 'signup' && (
          <>
            Already have an account?{' '}
            <button type="button" className="auth-switch-link" onClick={() => onModeChange('signin')}>
              Sign in
            </button>
          </>
        )}
        {mode === 'magic-link' && (
          <>
            <button type="button" className="auth-switch-link" onClick={() => onModeChange('signin')}>
              Sign in with password
            </button>
            {' · '}
            <button type="button" className="auth-switch-link" onClick={() => onModeChange('signup')}>
              Create account
            </button>
          </>
        )}
      </div>
    </form>
  );
}
