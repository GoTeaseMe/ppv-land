'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Sidebar } from '@/components/Sidebar';
import { WhyUs } from '@/components/WhyUs';
import { HowItWorks } from '@/components/HowItWorks';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { PreferencesModal, PreferencesState, UserRole } from '@/components/PreferencesModal';

export default function Home() {
  const [isSupporterActive, setIsSupporterActive] = useState(true);
  const [isCreatorActive, setIsCreatorActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitWarning, setSubmitWarning] = useState(false);
  const [preferences, setPreferences] = useState<PreferencesState>({
    roles: new Set<UserRole>(['supporter']),
    country: '',
    tags: new Set<string>(),
  });

  const toggleSupporter = () => {
    setIsSupporterActive((prev) => !prev);
    // Sync with preferences
    setPreferences((prev) => {
      const newRoles = new Set(prev.roles);
      if (isSupporterActive) {
        newRoles.delete('supporter');
      } else {
        newRoles.add('supporter');
      }
      if (newRoles.size === 0) newRoles.add('supporter');
      return { ...prev, roles: newRoles };
    });
  };

  const toggleCreator = () => {
    setIsCreatorActive((prev) => !prev);
    // Sync with preferences
    setPreferences((prev) => {
      const newRoles = new Set(prev.roles);
      if (isCreatorActive) {
        newRoles.delete('creator');
      } else {
        newRoles.add('creator');
      }
      if (newRoles.size === 0) newRoles.add('supporter');
      return { ...prev, roles: newRoles };
    });
  };

  // Sync UI state when preferences change from modal
  const handlePreferencesChange = (newPreferences: PreferencesState) => {
    setPreferences(newPreferences);
    setIsSupporterActive(newPreferences.roles.has('supporter'));
    setIsCreatorActive(newPreferences.roles.has('creator'));
  };

  const handleSubmit = (email: string, ageConfirmed: boolean) => {
    setSubmitSuccess(false);
    setSubmitWarning(false);

    if (!email || !email.includes('@') || !ageConfirmed) {
      setSubmitWarning(true);
      return;
    }

    // Prepare payload for backend
    const payload = {
      email,
      roles: Array.from(preferences.roles),
      prefs: Array.from(preferences.tags),
      country: preferences.country || null,
      ts: new Date().toISOString(),
    };

    console.log('WAITLIST_PAYLOAD', payload);

    // TODO: Replace with real endpoint call:
    // await fetch('/api/waitlist', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });

    setSubmitSuccess(true);

    // Reset form
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const ageCheckbox = document.querySelector('input[name="age"]') as HTMLInputElement;
    if (emailInput) emailInput.value = '';
    if (ageCheckbox) ageCheckbox.checked = false;
  };

  return (
    <div className="container">
      <Header />

      <div className="grid grid-cols-[1.25fr_.75fr] gap-6 items-stretch py-6">
        <Hero
          isSupporterActive={isSupporterActive}
          isCreatorActive={isCreatorActive}
          onToggleSupporter={toggleSupporter}
          onToggleCreator={toggleCreator}
          onOpenQuiz={() => setIsModalOpen(true)}
          onSubmit={handleSubmit}
          submitSuccess={submitSuccess}
          submitWarning={submitWarning}
        />
        <Sidebar />
      </div>

      <WhyUs />
      <HowItWorks />
      <FAQ />
      <Footer />

      <PreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preferences={preferences}
        onPreferencesChange={handlePreferencesChange}
      />
    </div>
  );
}
