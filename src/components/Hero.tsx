import React from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Checkbox } from './ui/Checkbox';
import { Pill } from './ui/Pill';
import { Card } from './ui/Card';

interface HeroProps {
	isSupporterActive: boolean;
	isCreatorActive: boolean;
	onToggleSupporter: () => void;
	onToggleCreator: () => void;
	onOpenQuiz: () => void;
	onSubmit: (email: string, ageConfirmed: boolean) => void;
	submitSuccess: boolean;
	submitWarning: boolean;
}

export const Hero: React.FC<HeroProps> = ({
	isSupporterActive,
	isCreatorActive,
	onToggleSupporter,
	onToggleCreator,
	onOpenQuiz,
	onSubmit,
	submitSuccess,
	submitWarning,
}) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const ageConfirmed = formData.get('age') === 'on';
		onSubmit(email, ageConfirmed);
	};

	return (
		<section className="hero grid grid-cols-[1.25fr_.75fr] gap-6 items-stretch py-6" aria-label="Hero">
			<Card>
				<div className="kicker flex gap-2.5 flex-wrap mb-3.5">
					<Pill size="sm">Global community</Pill>
					<Pill size="sm">Backer-only access</Pill>
					<Pill size="sm">Fast fulfillment (72h)</Pill>
				</div>

				<h1 className="text-4xl leading-tight mb-2.5">Fund creators.</h1>
				<h1 className="text-4xl leading-tight mb-2.5">Unlock exclusive content—fast.</h1>
				<p className="text-base text-[var(--muted)] mb-4.5">
					Campaign-based content across mainstream and adult categories. Support what you want made. Get
					access only if you fund it.
				</p>

				<div className="flex gap-2.5 flex-wrap my-3.5">
					<Button
						variant="toggle"
						isActive={isSupporterActive}
						onClick={onToggleSupporter}
						aria-pressed={isSupporterActive}
					>
						Supporter
					</Button>
					<Button
						variant="toggle"
						isActive={isCreatorActive}
						onClick={onToggleCreator}
						aria-pressed={isCreatorActive}
					>
						Creator
					</Button>
					<Button variant="secondary" onClick={onOpenQuiz} title="Optional">
						Tell us what you want
					</Button>
				</div>

				<div className="h-px bg-[var(--line)] my-5" />

				<form id="waitlistForm" onSubmit={handleSubmit}>
					<Input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />

					<Checkbox
						name="age"
						required
						label="I confirm I am 18+ and I want launch updates."
						disclaimer="Adult content exists in designated areas. Age verification applies where required."
					/>

					<Button type="submit" variant="primary" className="w-full mt-2.5">
						Get Early Access
					</Button>

					<div className="text-[var(--muted)] text-xs mt-2.5">
						By joining, you agree to our{' '}
						<a
							href="#"
							onClick={e => {
								e.preventDefault();
								alert('Add your Terms URL.');
							}}
							className="text-[var(--text)] opacity-90"
						>
							Terms
						</a>{' '}
						and{' '}
						<a
							href="#"
							onClick={e => {
								e.preventDefault();
								alert('Add your Privacy URL.');
							}}
							className="text-[var(--text)] opacity-90"
						>
							Privacy Policy
						</a>
						. You can unsubscribe anytime.
					</div>

					{submitSuccess && (
						<div className="mt-3 p-3 rounded-xl border border-[rgba(45,212,191,0.35)] bg-[rgba(45,212,191,0.1)] text-[var(--text)]">
							You're on the list. Want to shape launch? Click "Tell us what you want" to answer 2 quick
							questions.
						</div>
					)}

					{submitWarning && (
						<div className="mt-3 p-3 rounded-xl border border-[rgba(255,77,109,0.35)] bg-[rgba(255,77,109,0.1)] text-[var(--text)]">
							Please enter a valid email and confirm you're 18+.
						</div>
					)}
				</form>
			</Card>
		</section>
	);
};
