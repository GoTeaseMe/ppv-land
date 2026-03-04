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

	const handlePreferencesSave = async (savedPreferences: PreferencesState) => {
		// 只有已经加入 waitlist 的用户才需要保存 preferences
		// 这里可以检查 localStorage 中是否有已提交的 email
		const savedEmail = localStorage.getItem('waitlist-email');
		if (!savedEmail) return;

		try {
			await fetch('/api/waitlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: savedEmail,
					ageConfirmed: true,
					roles: Array.from(savedPreferences.roles),
					tags: Array.from(savedPreferences.tags),
					country: savedPreferences.country || null,
				}),
			});
		} catch (error) {
			console.error('Preferences save error:', error);
		}
	};

	const handleSubmit = async (email: string, ageConfirmed: boolean) => {
		setSubmitSuccess(false);
		setSubmitWarning(false);

		if (!email || !email.includes('@') || !ageConfirmed) {
			setSubmitWarning(true);
			return;
		}

		try {
			const response = await fetch('/api/waitlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					ageConfirmed,
					roles: Array.from(preferences.roles),
					tags: Array.from(preferences.tags),
					country: preferences.country || null,
				}),
			});

			if (!response.ok) {
				setSubmitWarning(true);
				return;
			}

			setSubmitSuccess(true);

			// 保存 email 到 localStorage，用于后续 preferences 更新
			localStorage.setItem('waitlist-email', email.toLowerCase());

			const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
			const ageCheckbox = document.querySelector('input[name="age"]') as HTMLInputElement;
			if (emailInput) emailInput.value = '';
			if (ageCheckbox) ageCheckbox.checked = false;
		} catch (error) {
			console.error('Waitlist submission error:', error);
			setSubmitWarning(true);
		}
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-4">
			<Header />

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch py-6">
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

			<div className="flex flex-col gap-6">
				<WhyUs />
				<HowItWorks />
				<FAQ />
			</div>

			<Footer />

			<PreferencesModal
				ref={modalRef}
				preferences={preferences}
				onPreferencesChange={handlePreferencesChange}
				onSave={handlePreferencesSave}
			/>
		</div>
	);
}
