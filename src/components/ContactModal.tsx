'use client';

import { useState, useRef, useImperativeHandle, forwardRef } from 'react';

export interface ContactModalRef {
	open: () => void;
	close: () => void;
}

interface ContactModalProps {
	onSubmit?: (data: ContactFormData) => void;
}

export interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export const ContactModal = forwardRef<ContactModalRef, ContactModalProps>(({ onSubmit }, ref) => {
	const modalRef = useRef<HTMLDialogElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [formData, setFormData] = useState<ContactFormData>({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	useImperativeHandle(ref, () => ({
		open: () => {
			modalRef.current?.showModal();
			setSubmitSuccess(false);
		},
		close: () => modalRef.current?.close(),
	}));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (!response.ok) {
				alert(result.error || 'Failed to send message');
				setIsSubmitting(false);
				return;
			}

			setSubmitSuccess(true);
			setIsSubmitting(false);
			onSubmit?.(formData);

			// Reset form after delay
			setTimeout(() => {
				setFormData({ name: '', email: '', subject: '', message: '' });
			}, 2000);
		} catch (error) {
			console.error('Contact submission error:', error);
			alert('Failed to send message. Please try again.');
			setIsSubmitting(false);
		}
	};

	if (submitSuccess) {
		return (
			<dialog ref={modalRef} className="modal modal-open">
				<div className="modal-box max-w-md bg-base-100 text-center">
					<div className="flex flex-col items-center gap-4">
						<div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8 text-success"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<div>
							<h3 className="text-lg font-bold mb-1">Message Sent!</h3>
							<p className="text-sm text-base-content/70">
								We&apos;ll get back to you within 24-48 hours.
							</p>
						</div>
						<form method="dialog">
							<button className="btn btn-primary w-full">Close</button>
						</form>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		);
	}

	return (
		<dialog ref={modalRef} className="modal">
			<div className="modal-box max-w-lg bg-base-100">
				<div className="flex justify-between items-center gap-4 mb-6">
					<h2 className="text-xl font-bold">Contact Us</h2>
					<form method="dialog">
						<button className="btn btn-sm btn-ghost">Close</button>
					</form>
				</div>

				<p className="text-sm text-base-content/70 mb-6">
					Have questions, feedback, or need support? Fill out the form below and we&apos;ll get back to you
					soon.
				</p>

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<label className="label py-0">
							<span className="label-text font-semibold">Name</span>
						</label>
						<input
							name="name"
							type="text"
							placeholder="Your name"
							className="input input-bordered input-primary w-full bg-white"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="label py-0">
							<span className="label-text font-semibold">Email</span>
						</label>
						<input
							name="email"
							type="email"
							placeholder="your@email.com"
							className="input input-bordered input-primary w-full bg-white"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="label py-0">
							<span className="label-text font-semibold">Subject</span>
						</label>
						<select
							name="subject"
							className="select select-bordered select-primary w-full bg-white"
							value={formData.subject}
							onChange={handleChange}
							required
						>
							<option value="" disabled>
								Select a topic
							</option>
							<option value="general">General Inquiry</option>
							<option value="support">Technical Support</option>
							<option value="billing">Billing & Payments</option>
							<option value="feedback">Feedback & Suggestions</option>
							<option value="report">Report an Issue</option>
							<option value="creator">Creator Questions</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<label className="label py-0">
							<span className="label-text font-semibold">Message</span>
						</label>
						<textarea
							name="message"
							placeholder="Tell us more about your inquiry..."
							className="textarea textarea-bordered textarea-primary w-full bg-white h-32"
							value={formData.message}
							onChange={handleChange}
							required
						/>
					</div>

					<button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
						{isSubmitting ? <span className="loading loading-spinner loading-sm" /> : 'Send Message'}
					</button>
				</form>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
});

ContactModal.displayName = 'ContactModal';
