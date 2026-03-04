# GoTeaseMe.com

A crowdfunding platform for creators. Fund campaigns, unlock exclusive content, and discover new talent.

![GoTeaseMe](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3ecf8e?style=flat&logo=supabase&logoColor=white)

## Features

- **Waitlist Signup** - Join the waitlist to be notified when we launch
- **Contact Form** - Get in touch with the team
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Fast Performance** - Built with Next.js 16 and optimized for speed

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Database**: Supabase (PostgreSQL)
- **Fonts**: Sansita (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ppv-land.git
cd ppv-land
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Then add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-key
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Run the SQL schema from `supabase/schema.sql` to create tables
3. Copy your project URL and anon key to `.env.local`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [vercel.com](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

### Self-Hosted

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes (waitlist, contact)
│   ├── layout.tsx    # Root layout with SEO metadata
│   └── page.tsx      # Landing page
├── components/       # React components
├── lib/              # Utilities (Supabase client, types)
└── app/              # Global styles

supabase/
└── schema.sql        # Database schema
```

## License

MIT

---

**Live**: [GoTeaseMe.com](https://goteaseme.com) | **Status**: Launching Soon
