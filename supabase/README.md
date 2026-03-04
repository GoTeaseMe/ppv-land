# Supabase Setup

This project uses Supabase for database and API services.

## Prerequisites

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project

## Database Setup

### 1. Run the Schema SQL

Go to your Supabase project dashboard:
1. Navigate to **SQL Editor** in the left sidebar
2. Copy the content of `supabase/schema.sql`
3. Paste and run the SQL

This will create:
- `waitlist_entries` table (for early access signups)
- `contact_messages` table (for contact form submissions)
- `user_role` enum (supporter | creator | requester)
- Row Level Security (RLS) policies
- Indexes for performance

### 2. Get API Credentials

Go to **Settings > API** to get:
- Project URL
- anon public key

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy from .env.local.example and fill in your credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Database Tables

### waitlist_entries

Stores user waitlist signups and preferences:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| email | text | User email (unique) |
| age_confirmed | boolean | User confirmed 18+ |
| roles | user_role[] | User roles (supporter, creator, requester) |
| tags | text[] | Interest tags |
| country | text | User country/region |
| created_at | timestamptz | Record creation time |
| updated_at | timestamptz | Last update time |

### contact_messages

Stores contact form submissions:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Contact name |
| email | text | Contact email |
| subject | text | Message subject |
| message | text | Message content |
| created_at | timestamptz | Submission time |

## API Endpoints

### POST /api/waitlist
Add or update a waitlist entry.

Request body:
```json
{
  "email": "user@example.com",
  "ageConfirmed": true,
  "roles": ["supporter", "creator"],
  "tags": ["Fitness", "Cosplay"],
  "country": "Japan"
}
```

### GET /api/waitlist
Get all waitlist entries (for admin use).

### POST /api/contact
Submit a contact form message.

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "support",
  "message": "I need help with..."
}
```

## Row Level Security (RLS)

The schema includes RLS policies that:
- Allow public read access to all entries
- Allow public insert for signups/contacts
- Allow users to update their own entries by email (authenticated)

**Note:** For production, you may want to restrict read access to authenticated admin users only.
