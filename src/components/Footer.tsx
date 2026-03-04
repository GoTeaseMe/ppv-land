'use client';

import { useRef } from 'react';
import { TermsModal, type TermsModalRef } from './TermsModal';
import { PrivacyModal, type PrivacyModalRef } from './PrivacyModal';
import { ContactModal, type ContactModalRef } from './ContactModal';

export const Footer = () => {
	const year = new Date().getFullYear();
	const termsModalRef = useRef<TermsModalRef>(null);
	const privacyModalRef = useRef<PrivacyModalRef>(null);
	const contactModalRef = useRef<ContactModalRef>(null);

	return (
		<>
			<footer className="py-8 text-base-content/70 text-sm border-t border-primary/20 mt-8">
				<div className="flex justify-between gap-4 flex-wrap">
					<div>
						<div className="font-extrabold text-base-content mb-1">LOGO</div>
						<div>© {year} PPV Land</div>
					</div>
					<div className="flex gap-4 flex-wrap">
						<button
							type="button"
							onClick={() => termsModalRef.current?.open()}
							className="link link-hover link-accent"
						>
							Terms
						</button>
						<button
							type="button"
							onClick={() => privacyModalRef.current?.open()}
							className="link link-hover link-accent"
						>
							Privacy
						</button>
						<button
							type="button"
							onClick={() => contactModalRef.current?.open()}
							className="link link-hover link-accent"
						>
							Contact
						</button>
					</div>
				</div>
			</footer>

			<TermsModal ref={termsModalRef} />
			<PrivacyModal ref={privacyModalRef} />
			<ContactModal ref={contactModalRef} />
		</>
	);
};
