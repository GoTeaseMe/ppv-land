'use client';

import { useRef, useImperativeHandle, forwardRef } from 'react';

export interface PrivacyModalRef {
	open: () => void;
	close: () => void;
}

interface PrivacyModalProps {
	onAccept?: () => void;
}

export const PrivacyModal = forwardRef<PrivacyModalRef, PrivacyModalProps>(({ onAccept }, ref) => {
	const modalRef = useRef<HTMLDialogElement>(null);

	useImperativeHandle(ref, () => ({
		open: () => modalRef.current?.showModal(),
		close: () => modalRef.current?.close(),
	}));

	const handleAccept = () => {
		onAccept?.();
		modalRef.current?.close();
	};

	return (
		<dialog ref={modalRef} className="modal">
			<div className="modal-box max-w-2xl bg-base-100">
				<div className="flex justify-between items-center gap-4 mb-6">
					<h2 className="text-xl font-bold">Privacy Policy</h2>
					<form method="dialog">
						<button className="btn btn-sm btn-ghost">Close</button>
					</form>
				</div>

				<div className="flex flex-col gap-6 max-h-96 overflow-y-auto pr-2">
					<section>
						<h3 className="font-semibold mb-2">1. Information We Collect</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">
							We collect information you provide directly to us, including:
						</p>
						<ul className="text-sm text-base-content/70 leading-relaxed list-disc list-inside space-y-1">
							<li>Account information (email, username, optional demographic data)</li>
							<li>Payment information (processed securely through third-party providers)</li>
							<li>Preferences and interests</li>
							<li>Communications you send to us</li>
						</ul>
						<p className="text-sm text-base-content/70 leading-relaxed mt-2">
							We also automatically collect technical data such as IP address, device type, browser type,
							and usage patterns.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">2. How We Use Your Information</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">We use your information to:</p>
						<ul className="text-sm text-base-content/70 leading-relaxed list-disc list-inside space-y-1">
							<li>Provide, maintain, and improve our services</li>
							<li>Process transactions and send related information</li>
							<li>Send technical notices and support messages</li>
							<li>Respond to comments and questions</li>
							<li>Personalize content and recommendations</li>
							<li>Comply with legal obligations</li>
						</ul>
					</section>

					<section>
						<h3 className="font-semibold mb-2">3. Information Sharing</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">
							We do not sell your personal information. We may share your information with:
						</p>
						<ul className="text-sm text-base-content/70 leading-relaxed list-disc list-inside space-y-1">
							<li>
								<strong>Creators:</strong> When you fund a campaign, the creator may receive your email
								for content delivery purposes
							</li>
							<li>
								<strong>Service Providers:</strong> Third-party companies that perform services on our
								behalf (e.g., payment processing, data hosting, analytics)
							</li>
							<li>
								<strong>Legal Requirements:</strong> When required by law or to protect our rights
							</li>
						</ul>
					</section>

					<section>
						<h3 className="font-semibold mb-2">4. Adult Content & Privacy</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">
							Access to adult content areas requires age verification. We take additional measures to
							protect your privacy when accessing adult content:
						</p>
						<ul className="text-sm text-base-content/70 leading-relaxed list-disc list-inside space-y-1">
							<li>Adult content preferences are stored separately</li>
							<li>Adult-related activity is not publicly displayed</li>
							<li>Purchase history for adult content is private</li>
						</ul>
					</section>

					<section>
						<h3 className="font-semibold mb-2">5. Data Security</h3>
						<p className="text-sm text-base-content/70 leading-relaxed">
							We implement reasonable security measures to protect your information. However, no method of
							transmission over the internet is completely secure, and we cannot guarantee absolute
							security. Payment information is never stored on our servers and is processed through
							PCI-compliant payment providers.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">6. Your Rights</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">You have the right to:</p>
						<ul className="text-sm text-base-content/70 leading-relaxed list-disc list-inside space-y-1">
							<li>Access and update your personal information</li>
							<li>Delete your account and associated data</li>
							<li>Opt out of marketing communications</li>
							<li>Request information about data sharing</li>
							<li>Export your data</li>
						</ul>
					</section>

					<section>
						<h3 className="font-semibold mb-2">7. Cookies & Tracking</h3>
						<p className="text-sm text-base-content/70 leading-relaxed">
							We use cookies and similar technologies to improve your experience, analyze usage, and
							personalize content. You can control cookie settings through your browser preferences.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">8. Children&apos;s Privacy</h3>
						<p className="text-sm text-base-content/70 leading-relaxed">
							Our service is not intended for individuals under 18 years of age. We do not knowingly
							collect personal information from children. If we become aware that we have collected such
							information, we will take steps to delete it.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">9. Changes to This Policy</h3>
						<p className="text-sm text-base-content/70 leading-relaxed">
							We may update this privacy policy from time to time. We will notify users of significant
							changes by posting the new policy on our platform and sending an email notification.
						</p>
					</section>
				</div>

				<div className="flex gap-3 mt-6">
					<button type="button" className="btn btn-primary flex-1" onClick={handleAccept}>
						I Understand
					</button>
					<form method="dialog" className="flex-1">
						<button className="btn btn-ghost w-full">Close</button>
					</form>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
});

PrivacyModal.displayName = 'PrivacyModal';
