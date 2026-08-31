# DevScope - Premium GitHub Analytics Platform

DevScope is a production-ready, modern GitHub analytics dashboard that provides deep insights into developer profiles. It leverages the GitHub REST API for metrics and Google's Gemini AI to generate automated skill assessments and career recommendations.

## Features
- **Comprehensive Analytics:** Visualize language distribution, repository growth, and stars using Recharts.
- **AI-Powered Insights:** Get Gemini-generated summaries of a developer's expertise and portfolio strength.
- **Premium UI:** Glassmorphic design, smooth Framer Motion animations, and full Dark/Light mode support.
- **Performance Optimized:** Uses Next.js App Router, dynamic imports for heavy chart libraries, and optimized Next.js Image components for high Lighthouse scores.
- **Export & Share:** Instantly share profiles or export them to PDF format.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **AI Integration:** `@google/genai` (Gemini 2.5 Pro)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/devscope.git
   cd devscope
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example `.env` file and insert your Gemini API Key.
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` to include your key.

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment
DevScope is fully optimized and ready to be deployed on Vercel.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add the `GEMINI_API_KEY` to your Vercel Environment Variables.
4. Deploy!
