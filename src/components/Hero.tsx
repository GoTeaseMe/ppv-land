'use client';

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

export const Hero = ({
	isSupporterActive,
	isCreatorActive,
	onToggleSupporter,
	onToggleCreator,
	onOpenQuiz,
	onSubmit,
	submitSuccess,
	submitWarning,
}: HeroProps) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const ageConfirmed = formData.get('age') === 'on';
		onSubmit(email, ageConfirmed);
	};

	return (
		<section
			className="card bg-white/80 border border-warning/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm"
			aria-label="Hero"
		>
			<div className="flex gap-2 flex-wrap mb-4">
				<span className="badge badge-warning badge-outline">Global community</span>
				<span className="badge badge-secondary badge-outline">Backer-only access</span>
				<span className="badge badge-accent badge-outline">Fast fulfillment (72h)</span>
			</div>

			<h1 className="text-4xl font-bold leading-tight mb-2 text-base-content">Fund creators.</h1>
			<h1 className="text-4xl font-bold leading-tight mb-3 text-base-content">Unlock exclusive content—fast.</h1>
			<p className="text-base text-base-content/70 mb-5">
				Campaign-based content across mainstream and adult categories. Support what you want made. Get access if
				you fund it.
			</p>

			<div className="flex gap-2 flex-wrap my-4">
				<button
					className={`btn ${isSupporterActive ? 'btn-warning text-base-100' : 'btn-ghost'}`}
					onClick={onToggleSupporter}
					aria-pressed={isSupporterActive}
				>
					Supporter
				</button>
				<button
					className={`btn ${isCreatorActive ? 'btn-warning text-base-100' : 'btn-ghost'}`}
					onClick={onToggleCreator}
					aria-pressed={isCreatorActive}
				>
					Creator
				</button>
				<button className="btn btn-ghost" onClick={onOpenQuiz} title="Optional">
					Tell us what you want
				</button>
			</div>

			<div className="divider my-5"></div>

			<form id="waitlistForm" onSubmit={handleSubmit}>
				<label className="label">
					<span className="label-text font-semibold">Email address</span>
				</label>
				<input
					name="email"
					type="email"
					placeholder="you@example.com"
					autoComplete="email"
					className="input input-bordered input-warning w-full mb-3 bg-white"
					required
				/>

				<div className="form-control">
					<label className="label cursor-pointer justify-start gap-3">
						<input name="age" type="checkbox" className="checkbox checkbox-warning" required />
						<span className="label-text">
							<span className="font-medium">I confirm I am 18+</span> and I want launch updates.
							<span className="block text-xs text-base-content/60 mt-1">
								Adult content exists in designated areas. Age verification applies where required.
							</span>
						</span>
					</label>
				</div>

				<button type="submit" className="btn btn-warning text-base-100 w-full mt-4">
					Get Early Access
				</button>

				<div className="text-base-content/60 text-xs mt-3">
					By joining, you agree to our{' '}
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							alert('Add your Terms URL.');
						}}
						className="link link-warning"
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
						className="link link-warning"
					>
						Privacy Policy
					</a>
					. You can unsubscribe anytime.
				</div>

				{submitSuccess && (
					<div className="alert alert-success mt-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>
							You&apos;re on the list! Click &quot;Tell us what you want&quot; to shape the launch.
						</span>
					</div>
				)}

				{submitWarning && (
					<div className="alert alert-error mt-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<span>Please enter a valid email and confirm you&apos;re 18+.</span>
					</div>
				)}
			</form>
		</section>
	);
};
