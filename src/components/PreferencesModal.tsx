import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export type UserRole = 'supporter' | 'creator' | 'requester';

export interface PreferencesState {
  roles: Set<UserRole>;
  country: string;
  tags: Set<string>;
}

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: PreferencesState;
  onPreferencesChange: (preferences: PreferencesState) => void;
}

const ALL_TAGS = [
  'Comedy/Challenges',
  'Fitness',
  'Cosplay',
  'Music/Performance',
  'ASMR/Voice',
  'Lifestyle',
  'Niche Requests',
  'Adult (General)',
  'Adult (Niche)',
] as const;

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onPreferencesChange,
}) => {
  const [localRoles, setLocalRoles] = useState<Set<UserRole>>(new Set());
  const [localCountry, setLocalCountry] = useState('');
  const [localTags, setLocalTags] = useState<Set<string>>(new Set());
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync with props when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalRoles(new Set(preferences.roles));
      setLocalCountry(preferences.country);
      setLocalTags(new Set(preferences.tags));
    }
  }, [isOpen, preferences]);

  // Close on backdrop click
  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const backdrop = document.getElementById('quizBackdrop');
    if (backdrop && isOpen) {
      backdrop.addEventListener('click', handleBackdropClick);
      return () => backdrop.removeEventListener('click', handleBackdropClick);
    }
  }, [isOpen, onClose]);

  const handleSave = () => {
    onPreferencesChange({
      roles: localRoles,
      country: localCountry,
      tags: localTags,
    });
    onClose();
  };

  const handleClear = () => {
    setLocalRoles(new Set(['supporter']));
    setLocalCountry('');
    setLocalTags(new Set());
  };

  const toggleRole = (role: UserRole) => {
    const newRoles = new Set(localRoles);
    if (newRoles.has(role)) {
      newRoles.delete(role);
    } else {
      newRoles.add(role);
    }
    if (newRoles.size === 0) newRoles.add('supporter');
    setLocalRoles(newRoles);
    // Update parent immediately for live sync
    onPreferencesChange({
      roles: newRoles,
      country: localCountry,
      tags: localTags,
    });
  };

  const toggleTag = (tag: string) => {
    const newTags = new Set(localTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      if (newTags.size >= 5) return;
      newTags.add(tag);
    }
    setLocalTags(newTags);
  };

  const rolesArray = Array.from(localRoles).join(', ');
  const tagsArray = Array.from(localTags).join(', ') || 'No interests selected yet.';

  if (!isOpen) return null;

  return (
    <div
      id="quizBackdrop"
      className="fixed inset-0 bg-[rgba(0,0,0,0.65)] flex items-center justify-center p-5 z-[999]"
      role="dialog"
      aria-modal="true"
      aria-label="Preferences"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[720px] bg-[#0f1118] border border-[var(--line)] rounded-[var(--radius)] p-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="flex justify-between items-center gap-2.5 mb-2">
          <h2 className="text-lg font-semibold m-0">Quick preferences (optional)</h2>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <p className="text-[var(--muted)] text-sm mb-3.5">
          This helps us recruit the right creators and launch with content you actually want.
        </p>

        <div>
          <label className="text-[13px] text-[var(--muted)] block mb-2">I'm here as (pick any)</label>
          <div className="flex gap-2.5 flex-wrap">
            {(['supporter', 'creator', 'requester'] as UserRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={[
                  'inline-flex items-center gap-2 px-3 py-2.5 border border-[var(--line)] rounded-xl',
                  'bg-[rgba(255,255,255,0.05)] text-[var(--text)] font-bold cursor-pointer',
                  'user-select-none transition-all',
                  localRoles.has(role)
                    ? 'border-[rgba(124,92,255,0.6)] bg-[rgba(124,92,255,0.16)] shadow-[inset_0_0_0_2px_rgba(124,92,255,0.18)]'
                    : '',
                ].join(' ')}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
          <div className="text-[12px] text-[var(--muted)] mt-2">We'll tailor your updates based on this.</div>
        </div>

        <div className="mt-3.5">
          <Input label="Country / Region (optional)" placeholder="Japan / US / UK / etc." value={localCountry} onChange={(e) => setLocalCountry(e.target.value)} />
        </div>

        <div className="mt-3.5">
          <label className="text-[13px] text-[var(--muted)] block mb-2.5">
            What are you interested in? (pick up to 5)
          </label>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={[
                  'border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-2.5 py-2',
                  'rounded-full text-[13px] text-[var(--muted)] cursor-pointer user-select-none',
                  'transition-all',
                  localTags.has(tag)
                    ? 'text-[var(--text)] border-[rgba(124,92,255,0.55)] bg-[rgba(124,92,255,0.16)]'
                    : '',
                ].join(' ')}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="text-[12px] text-[var(--muted)] mt-2">
            You can refine categories later. This is just for launch direction.
          </div>
        </div>

        <div className="flex gap-2.5 flex-wrap mt-4">
          <Button variant="primary" onClick={handleSave}>
            Save preferences
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>

        <div className="text-[12px] text-[var(--muted)] mt-2">
          Roles: {rolesArray || 'None'}. Interests: {tagsArray}
        </div>
      </div>
    </div>
  );
};
