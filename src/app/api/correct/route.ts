import { NextResponse } from "next/server";
import type { ResumeData } from "@/lib/types";
import { localCorrect, type Correction } from "@/lib/corrections";
import { Agent, fetch as undiciFetch } from "undici";

// Ambiente corporativo com proxy que intercepta HTTPS (certificado próprio):
// usamos um agente que não valida a cadeia de certificados apenas para a OpenAI.
const OPENAI_AGENT = new Agent({ connect: { rejectUnauthorized: false } });

function buildPrompt(data: ResumeData): string {
  return `Você é um especialista em currículos e otimização ATS. Corrija e otimize AUTOMATICAMENTE todo o currículo abaixo, mantendo TODOS os fatos originais (não invente nada).

Aplique os padrões de currículos que passam em sistemas ATS e agradam recrutadores:
- Seções com títulos padrão (Resumo, Experiência, Formação, Habilidades), datas no formato 'Jan 2022 – Atual', verbos de ação, resultados mensuráveis e texto legível.
- Ortografia, gramática, pontuação e concordância verbal/nominal: corrija automaticamente em TODOS os textos.

Regras:
- summary: reescreva em 2-3 frases impactantes e profissionais, incorporando palavras-chave relevantes.
- jobTitle: ajuste o cargo para o título profissional mais adequado à vaga.
- experiences: reescreva cada description com verbos de ação e resultados mensuráveis (mantenha o id exato de cada item). Não altere role, company ou period.
- skills: reordene colocando as mais relevantes para a vaga primeiro e remova duplicadas; não adicione habilidades que não existem.
- atsKeywords: se houver descrição da vaga (jobDescription), extraia dela as 6 a 12 palavras-chave mais importantes e incorpore-as naturalmente no summary e nas descriptions, onde fizer sentido. Liste as palavras-chave em atsKeywords.
- fitScore: avalie o quão bom o currículo está para a vaga oferecida (se houver jobDescription) ou para o cargo alvo em geral, seguindo os padrões de currículos aprovados. De 0 a 100.
- fitFeedback: escreva 1 a 3 frases curtas avaliando a compatibilidade do currículo com a vaga e o que foi melhorado.
- foundSkills: liste as competências do currículo que correspondem à vaga (ou as mais relevantes para o cargo alvo, se não houver jobDescription).
- missingSkills: se houver jobDescription, liste as habilidades exigidas pela vaga que NÃO estão no currículo; caso contrário, liste competências recomendadas para o cargo alvo.
- suggestions: 3 a 5 sugestões objetivas do que o candidato deve adicionar ou melhorar para aumentar a aderência à vaga.
- issues: analise o currículo original em profundidade e liste de 4 a 8 problemas REAIS identificados e corrigidos, sendo específico (ex.: "Erro de ortografia corrigido em 'recrutaento'", "Concordância verbal ajustada em 2 frases", "Palavras informais substituídas por termos profissionais", "Experiência reescrita com verbos de ação e resultados", "Resumo reescrito para ser mais impactante", "Pontuação corrigida em frases longas"). Não invente problemas que não existem.
- NÃO retorne dicas; aplique as melhorias diretamente no conteúdo.
- Responda APENAS com JSON válido, sem markdown, no formato:
{"summary": "...", "jobTitle": "...", "experiences": [{"id": "...", "description": "..."}], "skills": ["..."], "atsKeywords": ["..."], "fitScore": 85, "fitFeedback": "...", "foundSkills": ["..."], "missingSkills": ["..."], "suggestions": ["..."], "issues": ["..."]}

Dados:
${JSON.stringify({
  fullName: data.fullName,
  jobTitle: data.jobTitle,
  summary: data.summary,
  jobDescription: data.jobDescription,
  experiences: data.experiences.map((e) => ({
    id: e.id,
    role: e.role,
    company: e.company,
    period: e.period,
    description: e.description,
  })),
  skills: data.skills,
  certifications: data.certifications,
  languages: data.languages,
})}`;
}

export async function POST(request: Request) {
  const data = (await request.json()) as ResumeData;

  const unchanged: Correction = {
    ...localCorrect(data),
    fitFeedback:
      "Modo demonstração: chave da OpenAI não configurada. Correções automáticas de formatação aplicadas — configure OPENAI_API_KEY para a correção completa por IA.",
  };

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ correction: unchanged, fallback: true });
  }

  try {
    const res = await undiciFetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Você é um especialista em currículos. Responda sempre com JSON válido, sem markdown.",
            },
            { role: "user", content: buildPrompt(data) },
          ],
          temperature: 0.5,
          response_format: { type: "json_object" },
        }),
        dispatcher: OPENAI_AGENT,
      }
    );

    if (!res.ok) {
      const raw = await res.text();
      console.error("Erro OpenAI (correct):", res.status, raw);
      return NextResponse.json({ correction: unchanged, fallback: true });
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ correction: unchanged, fallback: true });
    }

    const parsed = JSON.parse(content) as Correction;
    return NextResponse.json({ correction: parsed, fallback: false });
  } catch (error) {
    console.error("Erro ao corrigir currículo:", error);
    return NextResponse.json({ correction: unchanged, fallback: true });
  }
}