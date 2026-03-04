export type UserRole = 'supporter' | 'creator' | 'requester';

export interface WaitlistEntry {
	id: string;
	email: string;
	ageConfirmed: boolean;
	roles: UserRole[];
	tags: string[];
	country: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface ContactForm {
	name: string;
	email: string;
	subject: string;
	message: string;
}
