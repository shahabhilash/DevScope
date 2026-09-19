# DevScope

DevScope is a premium GitHub analytics dashboard that provides deep, AI-powered insights into developer profiles. Simply search for any GitHub username to visualize their repository growth, language distribution, and get automated skill assessments powered by Google's Gemini AI.

## 🚀 Key Features

- **Deep Analytics:** Interactive charts for contribution graphs, language usage, and repository statistics using Recharts.
- **AI Skill Assessment:** Intelligent, automated analysis of developer strengths and expertise using Gemini.
- **Premium Design:** A modern, glassmorphic UI built with Tailwind CSS and Framer Motion.
- **Lightning Fast:** Built on Next.js 14 App Router for optimal performance.

## 📂 Project Structure

```text
├── app/                  # Next.js App Router pages and API routes
│   ├── api/insights/     # Gemini AI API endpoints
│   ├── dashboard/        # Dashboard views and error handling
│   └── page.jsx          # Landing page
├── components/           # Reusable UI and Dashboard components
│   ├── dashboard/        # Feature-specific components (Charts, Profile, etc.)
│   └── ui/               # Base UI components (Buttons, Inputs)
├── lib/                  # Utility functions and GitHub API client
└── public/               # Static assets
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS + Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **AI:** Google Gemini (`@google/genai`)

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js installed. You will also need a free **Gemini API Key** (from Google AI Studio) and a **GitHub Personal Access Token**.

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   GEMINI_API_KEY=your_gemini_key_here
   GITHUB_TOKEN=your_github_token_here
   ```

3. **Run the App**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard!

---
*Built as a personal project to explore modern Next.js, API integrations, and generative AI.*
