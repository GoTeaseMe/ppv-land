'use client';

import { useRef, useImperativeHandle, forwardRef } from 'react';

export type UserRole = 'supporter' | 'creator' | 'requester';

export interface PreferencesState {
	roles: Set<UserRole>;
	country: string;
	tags: Set<string>;
}

interface PreferencesModalProps {
	preferences: PreferencesState;
	onPreferencesChange: (preferences: PreferencesState) => void;
}

export interface PreferencesModalRef {
	open: () => void;
	close: () => void;
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

export const PreferencesModal = forwardRef<PreferencesModalRef, PreferencesModalProps>(
	({ preferences, onPreferencesChange }, ref) => {
		const modalRef = useRef<HTMLDialogElement>(null);

		useImperativeHandle(ref, () => ({
			open: () => modalRef.current?.showModal(),
			close: () => modalRef.current?.close(),
		}));

		const toggleRole = (role: UserRole) => {
			const newRoles = new Set(preferences.roles);
			if (newRoles.has(role)) {
				newRoles.delete(role);
			} else {
				newRoles.add(role);
			}
			if (newRoles.size === 0) newRoles.add('supporter');
			onPreferencesChange({
				roles: newRoles,
				country: preferences.country,
				tags: preferences.tags,
			});
		};

		const toggleTag = (tag: string) => {
			const newTags = new Set(preferences.tags);
			if (newTags.has(tag)) {
				newTags.delete(tag);
			} else {
				if (newTags.size >= 5) return;
				newTags.add(tag);
			}
			onPreferencesChange({
				roles: preferences.roles,
				country: preferences.country,
				tags: newTags,
			});
		};

		const handleClear = () => {
			onPreferencesChange({
				roles: new Set(['supporter']),
				country: '',
				tags: new Set(),
			});
		};

		const rolesArray = Array.from(preferences.roles).join(', ');
		const tagsArray = Array.from(preferences.tags).join(', ') || 'No interests selected yet.';

		return (
			<dialog ref={modalRef} className="modal">
				<div className="modal-box max-w-2xl bg-base-100 border border-warning/20">
					<div className="flex justify-between items-center gap-4">
						<h2 className="text-lg font-bold">Quick preferences (optional)</h2>
						<form method="dialog">
							<button className="btn btn-sm btn-ghost">Close</button>
						</form>
					</div>

					<div className="flex flex-col gap-6">
						<p className="text-sm text-base-content/70">
							This helps us recruit the right creators and launch with content you actually want.
						</p>

						<div className="flex flex-col gap-3">
							<label className="label py-0">
								<span className="label-text font-semibold">I&apos;m here as (pick any)</span>
							</label>
							<div className="flex gap-2 flex-wrap">
								{(['supporter', 'creator', 'requester'] as UserRole[]).map(role => (
									<button
										key={role}
										type="button"
										onClick={() => toggleRole(role)}
										className={`btn btn-sm ${
											preferences.roles.has(role) ? 'btn-warning text-base-100' : 'btn-ghost'
										}`}
									>
										{role.charAt(0).toUpperCase() + role.slice(1)}
									</button>
								))}
							</div>
							<p className="text-xs text-base-content/60">
								We&apos;ll tailor your updates based on this.
							</p>
						</div>

						<div className="flex flex-col gap-3">
							<label className="label py-0">
								<span className="label-text font-semibold">Country / Region (optional)</span>
							</label>
							<input
								type="text"
								placeholder="Japan / US / UK / etc."
								className="input input-bordered input-warning bg-white"
								value={preferences.country}
								onChange={e =>
									onPreferencesChange({
										roles: preferences.roles,
										country: e.target.value,
										tags: preferences.tags,
									})
								}
							/>
						</div>

						<div className="flex flex-col gap-3">
							<label className="label py-0">
								<span className="label-text font-semibold">
									What are you interested in? (pick up to 5)
								</span>
							</label>
							<div className="flex flex-wrap gap-2">
								{ALL_TAGS.map(tag => (
									<button
										key={tag}
										type="button"
										onClick={() => toggleTag(tag)}
										className={`badge badge-lg cursor-pointer transition-all ${
											preferences.tags.has(tag)
												? 'badge-warning'
												: 'badge-outline badge-neutral hover:badge-warning/50'
										}`}
									>
										{tag}
									</button>
								))}
							</div>
							<p className="text-xs text-base-content/60">
								You can refine categories later. This is just for launch direction.
							</p>
						</div>

						<div className="flex flex-col gap-3">
							<div className="flex gap-2 flex-wrap">
								<form method="dialog">
									<button className="btn btn-warning text-base-100">Done</button>
								</form>
								<button className="btn btn-ghost" onClick={handleClear}>
									Clear
								</button>
							</div>
							<div className="text-xs text-base-content/60">
								Roles: {rolesArray || 'None'}. Interests: {tagsArray}
							</div>
						</div>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		);
	},
);

PreferencesModal.displayName = 'PreferencesModal';
