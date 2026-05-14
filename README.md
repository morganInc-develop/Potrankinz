# Next.js 14+ Starter Template

A modern starter template for web development client projects, featuring:

## USE THIS PROMPT

Here is your final, comprehensive AI prompt that includes:
• Project renaming
• Color & font theming via @theme
• Metadata updates
• Home page welcome message
• README rewrite
• Auth setup
• ✅ AND now cleanup of default Next.js boilerplate (like public/next.svg, .ico, etc.)

⸻

🧠 AI Prompt — Final Template Customization & Cleanup

I’ve cloned a Next.js 14+ starter template built with:
• Tailwind CSS v4 (CSS-first via @theme)
• Latest shadcn CLI
• Firebase + NextAuth.js
• Prettier + ESLint

Now I need to fully customize this project for a client. Perform the following steps:

⸻

🔁 1. Rename the project
• Replace all references to “template” with the new project name
• Update:
• package.json → name
• README.md title and instructions
• metadata.ts or layout.tsx → title, description, themeColor, etc.

⸻

🎨 2. Update theme colors and fonts in tailwind.css
• Use provided hex codes and name each color descriptively (e.g. --color-soft-red)
• Register as Tailwind v4 classes: bg-soft-red, text-muted-purple, etc.
• If fonts are provided:
• Import using @import url(...)
• Register in @theme as --font-\*
• Apply via utility class like font-display
• ⚠️ Do not modify :root — use only the @theme block for all customization

⸻

🔐 3. Configure authentication
• Use Google and Credentials providers in NextAuth.js
• Credentials should come from Firebase Console OAuth setup
• Store all keys in .env.local — no hardcoded secrets

⸻

📄 4. Clean up README
• Remove any placeholder/template text
• Add:
• Project purpose
• Setup instructions
• Auth usage
• Deployment steps

⸻

🏠 5. Update Home page
• Display:
"Welcome to [Project Name]"
• Below it, render a <ul> using shadcn/ui components listing:
• ✅ Project renamed
• ✅ Colors and fonts customized
• ✅ Metadata updated
• ✅ README rewritten
• ✅ Auth set up
• ✅ Boilerplate assets removed

⸻

🧹 6. Remove unused boilerplate files
• Delete unnecessary files from public/, such as:
• next.svg
• vercel.svg
• favicon.ico (if not used)
• Clean up unused imports or references to those assets in the codebase

⸻

✅ Reminder:
• This project uses Tailwind v4 (@theme) — no legacy tailwind.config.js tokens
• Only install components using:npx shadcn@latest add ...

## ⚙️ Stack

- **Next.js 14** (App Router)
- **Tailwind CSS v4** (CSS-first, with @theme block for colors & fonts)
- **shadcn/ui** initialized
- **Prettier** configured (`.prettierrc`, `.prettierignore`)
- **ESLint** for Next.js + Tailwind
- **Firebase** installed and initialized (`lib/firebase.ts`)
- **NextAuth.js** setup with Google & Credentials providers (`app/api/auth/[...nextauth]/route.ts`)
- **TanStack React Query** with Devtools and global Providers setup (`app/providers.tsx`)

## 🎨 Styling

- Uses [Urbanist](https://fonts.google.com/specimen/Urbanist) Google Font via `@import` in `tailwind.css`
- Custom color scheme with 5 theme tokens: `--color-accent`, `--color-background`, `--color-foreground`, `--color-primary`, `--color-secondary`
- Tailwind utility classes: `bg-accent`, `text-text`, `bg-background`, etc.

## 🧼 Home Page

Minimal, just text using the font and theme colors to confirm setup works.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   npm install @tanstack/react-query @tanstack/react-query-devtools
   # or
   yarn
   ```
2. **Set up environment variables:**
   Copy `.env.example` to `.env.local` and fill in your Firebase credentials.

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Format code:**

   ```bash
   npm run format
   ```

5. **Lint code:**
   ```bash
   npm run lint
   ```

---

## Directory Structure

- `/app` — Next.js App Router pages
- `/lib/firebase.ts` — Firebase initialization
- `/app/api/auth/[...nextauth]/route.ts` — NextAuth.js API route
- `/app/tailwind.css` — Tailwind entry with theme and font

---

## Customization

- Add your own providers to NextAuth in `app/api/auth/[...nextauth]/route.ts`
- Update theme colors and font in `app/tailwind.css`
- Use shadcn/ui components as needed

## Providers & React Query

Global providers are set up in `/app/providers.tsx` and used in the root layout. This wraps your app with:

- `SessionProvider` from `next-auth/react` (for authentication)
- `QueryClientProvider` from `@tanstack/react-query` (for data fetching/caching)
- `ReactQueryDevtools` for debugging React Query

**Usage:**

```
import Providers from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

You can now use React Query hooks (e.g. `useQuery`, `useMutation`) anywhere in your app.
