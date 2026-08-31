import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { user, repos, languages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    const prompt = `
      Analyze the following GitHub developer profile and provide a professional, highly readable skill assessment and developer summary.
      
      User Profile:
      Name: ${user.name || user.login}
      Bio: ${user.bio || 'None'}
      Followers: ${user.followers}
      Public Repos: ${user.public_repos}
      
      Top Languages: ${languages.map((l) => l.name).join(', ')}
      
      Top 5 Repos (by stars):
      ${repos.slice(0, 5).map((r) => `- ${r.name}: ${r.description} (${r.stargazers_count} stars, ${r.language})`).join('\n')}

      Please provide a JSON response with exactly this structure:
      {
        "summary": "A 2-3 sentence overview of the developer's background and focus.",
        "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
        "expertise": "A brief analysis of their technical expertise based on languages and repos.",
        "portfolioStrength": "An assessment of their open-source presence.",
        "learningAreas": ["Area 1", "Area 2"],
        "careerRecommendations": "Brief advice on potential career paths or roles."
      }
      
      Return ONLY valid JSON. Do not include markdown formatting tags like \`\`\`json.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });

    const text = response.text || "{}";
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const insights = JSON.parse(cleanedText);

    return NextResponse.json(insights);
  } catch (error) {
    console.error("Error generating insights:", error);
    return NextResponse.json(
      { error: "Failed to generate AI insights." },
      { status: 500 }
    );
  }
}
