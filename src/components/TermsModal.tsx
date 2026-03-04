'use client';

import { useRef, useImperativeHandle, forwardRef } from 'react';

export interface TermsModalRef {
	open: () => void;
	close: () => void;
}

interface TermsModalProps {
	onAccept?: () => void;
}

export const TermsModal = forwardRef<TermsModalRef, TermsModalProps>(({ onAccept }, ref) => {
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
					<h2 className="text-xl font-bold">Terms of Service</h2>
					<form method="dialog">
						<button className="btn btn-sm btn-ghost">Close</button>
					</form>
				</div>

				<div className="flex flex-col gap-6 max-h-96 overflow-y-auto pr-2">
					<section>
						<h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
						<p className="text-sm text-base-content/70 leading-relaxed">
							By accessing and using PPV Land, you agree to be bound by these Terms of Service and all
							applicable laws and regulations. If you do not agree with any of these terms, you are
							prohibited from using this service.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">2. Age Requirements</h3>
						<p className="text-sm text-base-content/70 leading-relaxed">
							You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to
							use this service. By using PPV Land, you represent and warrant that you meet this age
							requirement.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">3. User Accounts</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">
							You are responsible for maintaining the confidentiality of your account credentials and for
							all activities that occur under your account. You agree to notify us immediately of any
							unauthorized use of your account.
						</p>
						<p className="text-sm text-base-content/70 leading-relaxed">
							You agree to provide accurate, current, and complete information during registration. We
							reserve the right to suspend or terminate accounts that violate these terms.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">4. Content & Conduct</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">
							Users may submit content for campaigns. You retain ownership of content you submit but grant
							us a license to use, display, and distribute such content in connection with the service.
						</p>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">
							You agree not to: (a) submit illegal, harmful, or non-consensual content; (b) harass or
							abuse other users; (c) attempt to gain unauthorized access to the service; (d) use the
							service for any fraudulent or unlawful purpose.
						</p>
						<p className="text-sm text-base-content/70 leading-relaxed">
							Adult content is permitted only in designated areas and must comply with all applicable laws
							and platform guidelines.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">5. Payments & Refunds</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">
							Campaigns are funded through user contributions. Once a campaign reaches its funding goal
							and content is delivered, refunds are not available unless the creator fails to fulfill
							their obligations.
						</p>
						<p className="text-sm text-base-content/70 leading-relaxed">
							We reserve the right to change pricing and payment terms at any time. All payments are final
							and non-refundable except as required by law or as explicitly stated in our refund policy.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">6. Intellectual Property</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">
							PPV Land and its original content, features, and functionality are owned by us and are
							protected by international copyright, trademark, and other intellectual property laws.
						</p>
						<p className="text-sm text-base-content/70 leading-relaxed">
							You may not reproduce, modify, create derivative works from, distribute, or exploit any
							portion of the service without our express written permission.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">7. Disclaimers & Limitation of Liability</h3>
						<p className="text-sm text-base-content/70 leading-relaxed mb-2">
							The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make
							no representations or warranties of any kind regarding the service.
						</p>
						<p className="text-sm text-base-content/70 leading-relaxed">
							In no event shall we be liable for any indirect, incidental, special, or consequential
							damages arising from your use of the service.
						</p>
					</section>

					<section>
						<h3 className="font-semibold mb-2">8. Modifications</h3>
						<p className="text-sm text-base-content/70 leading-relaxed">
							We reserve the right to modify these terms at any time. Continued use of the service after
							such modifications constitutes acceptance of the new terms.
						</p>
					</section>
				</div>

				<div className="flex gap-3 mt-6">
					<button type="button" className="btn btn-primary flex-1" onClick={handleAccept}>
						I Accept
					</button>
					<form method="dialog" className="flex-1">
						<button className="btn btn-ghost w-full">Decline</button>
					</form>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
});

TermsModal.displayName = 'TermsModal';
