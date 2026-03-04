import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
	public: {
		Tables: {
			waitlist_entries: {
				Row: {
					id: string;
					email: string;
					age_confirmed: boolean;
					roles: UserRole[];
					tags: string[];
					country: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					email: string;
					age_confirmed: boolean;
					roles: UserRole[];
					tags?: string[];
					country?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					email?: string;
					age_confirmed?: boolean;
					roles?: UserRole[];
					tags?: string[];
					country?: string | null;
					updated_at?: string;
				};
			};
			contact_messages: {
				Row: {
					id: string;
					name: string;
					email: string;
					subject: string;
					message: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					email: string;
					subject: string;
					message: string;
					created_at?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			user_role: 'supporter' | 'creator' | 'requester';
		};
	};
};

export type UserRole = Database['public']['Enums']['user_role'];
