-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('supporter', 'creator', 'requester');

-- Create waitlist_entries table
CREATE TABLE waitlist_entries (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	age_confirmed BOOLEAN NOT NULL DEFAULT false,
	roles user_role[] NOT NULL DEFAULT '{supporter}',
	tags TEXT[] DEFAULT '{}',
	country TEXT,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
	updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create contact_messages table
CREATE TABLE contact_messages (
	id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	subject TEXT NOT NULL,
	message TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_waitlist_entries_email ON waitlist_entries(email);
CREATE INDEX idx_waitlist_entries_created_at ON waitlist_entries(created_at DESC);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for waitlist_entries
-- Allow public read access for all entries (can be restricted later)
CREATE POLICY "Allow public read access" ON waitlist_entries
	FOR SELECT
	TO public
	USING (true);

-- Allow public insert for waitlist signup
CREATE POLICY "Allow public insert" ON waitlist_entries
	FOR INSERT
	TO public
	WITH CHECK (true);

-- Allow users to update their own entry by email
CREATE POLICY "Allow update own entry" ON waitlist_entries
	FOR UPDATE
	TO public
	USING (email = auth.email())
	WITH CHECK (email = auth.email());

-- RLS policies for contact_messages
-- Allow public read for all messages (for admin view)
CREATE POLICY "Allow public read messages" ON contact_messages
	FOR SELECT
	TO public
	USING (true);

-- Allow public insert for contact forms
CREATE POLICY "Allow public insert messages" ON contact_messages
	FOR INSERT
	TO public
	WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_waitlist_entries_updated_at
	BEFORE UPDATE ON waitlist_entries
	FOR EACH ROW
	EXECUTE FUNCTION update_updated_at_column();
