'use client';

import { useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Sidebar } from '@/components/Sidebar';
import { WhyUs } from '@/components/WhyUs';
import { HowItWorks } from '@/components/HowItWorks';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { PreferencesModal, PreferencesState, UserRole, PreferencesModalRef } from '@/components/PreferencesModal';

export default function Home() {
	const modalRef = useRef<PreferencesModalRef>(null);
	const [isSupporterActive, setIsSupporterActive] = useState(true);
	const [isCreatorActive, setIsCreatorActive] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [submitWarning, setSubmitWarning] = useState(false);
	const [preferences, setPreferences] = useState<PreferencesState>({
		roles: new Set<UserRole>(['supporter']),
		country: '',
		tags: new Set<string>(),
	});

	const toggleSupporter = () => {
		setIsSupporterActive(prev => !prev);
		setPreferences(prev => {
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
		setIsCreatorActive(prev => !prev);
		setPreferences(prev => {
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

		const payload = {
			email,
			roles: Array.from(preferences.roles),
			prefs: Array.from(preferences.tags),
			country: preferences.country || null,
			ts: new Date().toISOString(),
		};

		console.log('WAITLIST_PAYLOAD', payload);

		setSubmitSuccess(true);

		const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
		const ageCheckbox = document.querySelector('input[name="age"]') as HTMLInputElement;
		if (emailInput) emailInput.value = '';
		if (ageCheckbox) ageCheckbox.checked = false;
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-4">
			<Header />

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start py-6">
				<div className="lg:col-span-3">
					<Hero
						isSupporterActive={isSupporterActive}
						isCreatorActive={isCreatorActive}
						onToggleSupporter={toggleSupporter}
						onToggleCreator={toggleCreator}
						onOpenQuiz={() => modalRef.current?.open()}
						onSubmit={handleSubmit}
						submitSuccess={submitSuccess}
						submitWarning={submitWarning}
					/>
				</div>
				<div className="lg:col-span-2">
					<Sidebar />
				</div>
			</div>

			<WhyUs />
			<HowItWorks />
			<FAQ />
			<Footer />

			<PreferencesModal ref={modalRef} preferences={preferences} onPreferencesChange={handlePreferencesChange} />
		</div>
	);
}
