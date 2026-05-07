import { useAuth } from '../../hooks/useAuth';
import { Modal } from '../ui/Modal';
import { AuthForm } from './AuthForm';
import type { AuthModalState } from '../../types';

export function AuthModal() {
  const { authModal, closeAuthModal, openAuthModal } = useAuth();

  return (
    <Modal isOpen={authModal.isOpen} onClose={closeAuthModal}>
      <div className="auth-panel">
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>
        <AuthForm
          mode={authModal.mode}
          onModeChange={(mode: AuthModalState['mode']) => openAuthModal(mode)}
          onClose={closeAuthModal}
        />
      </div>
    </Modal>
  );
}
