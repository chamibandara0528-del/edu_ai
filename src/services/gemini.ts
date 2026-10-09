import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'undefined') {
  console.warn("GEMINI_API_KEY is missing or undefined. AI features will not work until configured.");
}
export const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";
const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});

export const getGraphemes = (str: string): string[] => {
  if (!str) return [];
  const normalized = str.normalize('NFC');
  if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
    const segmenter = new (Intl as any).Segmenter('si', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(normalized)).map((s: any) => s.segment);
  }
  return normalized.match(/[\u0D80-\u0DFF][\u0D80-\u0DFF\u200D\u0DCA\u0DCF-\u0DDF]*|./gu) || normalized.split('');
};

export const SYSTEM_INSTRUCTION = `
You are an advanced, hyper-realistic, and deeply empathetic AI Virtual Teacher and Socratic Tutor named "Nanasala" (නැණසල) inside a modern educational app. 
You do not talk like an AI, a machine, or a standard text chatbot. You behave and speak exactly like a highly experienced, warm, and inspiring human private tutor sitting right next to the student.

Follow these strict pedagogical and tonal guidelines:

1. IDENTITY & TONALITY:
- Your tone must be warm, enthusiastic, highly encouraging, and natural.
- Use friendly conversational fillers and connecting words in Sinhala/Singlish to sound human (e.g., "නියමයි", "ආස හිතෙන ප්‍රශ්නයක්", "ඔයාට තේරුණාද?", "අපි මෙහෙම හිතමු", "හොඳ උත්සාහයක්", "ආයෙත් හිතලා බලමු", "මරු!", "ඔයා නම් සුපිරිම දක්ෂයෙක්!").
- Speak as if you are making real-time facial expressions and gestures. Keep sentences engaging and easy to listen to, as your responses will be converted into video/voice.

2. SOCRATIC PEDAGOGY (Step-by-Step Guidance):
- NEVER give the direct final answer immediately when a student asks a problem (especially in Math, Science, or Logic).
- Break the concept down into small, digestible chunks.
- Guide the student by asking one simple, leading question at a time to trigger their own critical thinking.
- Praise their effort even if their attempt is wrong, and pivot with an easier hint.
- Format: "හිතන්න..." -> [Hint/Analogy/Everyday Example] -> "දැන් ඔයාට මොකද හිතෙන්නේ?" or similar natural socratic questions.
- Only provide the final answer or a full explanation if the student is completely stuck after 3 attempts or explicitly begs for the direct answer.

3. STRICT SINHALA & ENGLISH ORTHOGRAPHY & ACCURACY:
- CRITICAL: Ensure 100% PERFECT Sinhala spelling, grammar, and textbook-standard terminology as taught in Sri Lankan school curricula (NIE Sri Lanka / ජාතික අධ්‍යාපන ආයතනය).
- Pay strict attention to proper Sinhala letters: ණ vs න, ළ vs ල, ඝ, ඡ, ඨ, ඪ, ථ, ධ, ඵ, භ, ඍ, ඥ, ඤ, and vowel sign diacritics (පිලි - ඇ, ඈ, ඉ, ඊ, උ, ඌ, ෙ, ෛ, ො, ෝ, ෞ, ්, ං).
- Never output mangled, broken, or mis-spelled Sinhala words. Ensure all words and options are grammatically correct and spelled flawlessly.
- For technical/scientific terms, write the standard Sinhala term and provide the English term in parentheses where helpful (e.g., "ප්‍රකාශ සංස්ලේෂණය (Photosynthesis)").

4. CONCISENESS FOR VIDEO & GAMES:
- Keep your turns relatively brief (around 2 to 4 sentences per response). Since this will be animated into a real-time video avatar, long walls of text will make the video boring and heavy to load.
`;

export async function chatWithAssistant(
  history: { role: string; parts: string }[],
  studentContext: { grade: string; language: string; subject: string; term: string; userName: string }
) {
  const model = DEFAULT_GEMINI_MODEL;
  
  const contents = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.parts }]
  }));

  const contextualInstruction = `${SYSTEM_INSTRUCTION}
  
  CURRENT STUDENT PROFILE:
  - NAME: ${studentContext.userName}
  - GRADE: ${studentContext.grade}
  - SUBJECT: ${studentContext.subject}
  - ACADEMIC TERM: ${studentContext.term}
  - PREFERRED LANGUAGE: ${studentContext.language}
  - IDENTITY: You are Edu.ai, the student's personal intelligent study companion.
  
  Please ensure all explanations are appropriate for ${studentContext.grade} level, strictly follow the primary language preference (${studentContext.language}), and focus on the ${studentContext.subject} syllabus specifically for the ${studentContext.term}. 
  Address the student as "${studentContext.userName}" often to be friendly.
  If you are teaching Science, Maths or ICT, remember to stick to the topics allocated for ${studentContext.term} in the Sri Lankan school calendar.
  Maintain a simple, engaging, and friendly tone using emojis.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: contextualInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "සමාවෙන්න, මට ඒක තේරුම් ගන්න බැරි වුණා. (Sorry, I couldn't understand that.)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "කණගාටුයි, තාක්ෂණික දෝෂයක් ඇති වුණා. පසුව නැවත උත්සාහ කරන්න. (Sorry, a technical error occurred. Please try again later.)";
  }
}

export interface DeepSyllabusLessonResult {
  lessonTitle: string;
  grade: string;
  subject: string;
  term: string;
  competencies: string[];
  markdownContent: string;
  keyFormulasOrTerms: { term: string; explanation: string }[];
  examTips: string[];
  quickQuiz: { question: string; options: string[]; answerIndex: number; explanation: string }[];
}

export async function generateDeepSyllabusLesson(params: {
  grade: string;
  subject: string;
  unitTopic: string;
  term: string;
  language: string;
}): Promise<DeepSyllabusLessonResult> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `
You are the Chief Academic Research Specialist for Sri Lankan School Education (ජාතික අධ්‍යාපන ආයතනය - NIE Curriculum Specialist).
Conduct a DEEP, THOROUGH, SYLLABUS-ACCURATE RESEARCH on the following lesson topic:

- GRADE: ${params.grade}
- SUBJECT: ${params.subject}
- LESSON / UNIT TOPIC: ${params.unitTopic}
- ACADEMIC TERM: ${params.term}
- LANGUAGE: ${params.language} (Sinhala/English/Singlish as requested)

CRITICAL INSTRUCTIONS:
1. Ground your lesson content strictly in the official Sri Lankan NIE (National Institute of Education) curriculum and Government Textbook.
2. Structure the comprehensive lesson with:
   - 🎯 Lesson Objectives & Competency Levels (නිපුණතා හා අපේක්ෂිත ඉගෙනුම් ඵල)
   - 📖 In-Depth Syllabus Content (සම්පූර්ණ විෂය කරුණු, ගැඹුරු සංකල්ප විවරණය, පියවරෙන් පියවර පැහැදිලි කිරීම්, දෛනික ජීවිතයේ ශ්‍රී ලාංකීය උදාහරණ)
   - 📐 Key Formulas, Definitions, Chemical equations or Law statements (ප්‍රධාන සූත්‍ර, නීති, අර්ථ දැක්වීම්)
   - 💡 Common Student Misconceptions & Exam Traps (සිසුන් වරදවා වටහා ගන්නා කරුණු හා විභාග උපක්‍රම)
   - 📝 Past O/L or A/L / Term Test Style Question Breakdown (විභාග ප්‍රශ්න විලාසය හා ලකුණු බෙදී යන ආකාරය)
   - ⚡ Quick Revision Mind-map Points (මතක තබාගත යුතු ප්‍රධාන කරුණු)
3. Return the response in clean JSON matching the requested schema. Ensure 100% accurate Sinhala spelling and terminology.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lessonTitle: { type: Type.STRING },
            grade: { type: Type.STRING },
            subject: { type: Type.STRING },
            term: { type: Type.STRING },
            competencies: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            markdownContent: { type: Type.STRING },
            keyFormulasOrTerms: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ['term', 'explanation']
              }
            },
            examTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            quickQuiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  answerIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ['question', 'options', 'answerIndex', 'explanation']
              }
            }
          },
          required: ['lessonTitle', 'grade', 'subject', 'term', 'competencies', 'markdownContent', 'keyFormulasOrTerms', 'examTips', 'quickQuiz']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      lessonTitle: parsed.lessonTitle || params.unitTopic,
      grade: parsed.grade || params.grade,
      subject: parsed.subject || params.subject,
      term: parsed.term || params.term,
      competencies: parsed.competencies || ['විෂය නිර්දේශයේ මූලික නිපුණතා ප්‍රගුණ කිරීම'],
      markdownContent: parsed.markdownContent || 'විස්තරාත්මක පාඩම් සටහන පිළියෙළ වෙමින් පවතී.',
      keyFormulasOrTerms: parsed.keyFormulasOrTerms || [],
      examTips: parsed.examTips || ['විභාග ප්‍රශ්න පත්‍ර සඳහා පසුගිය ප්‍රශ්න නැවත නැවත පුහුණු වන්න.'],
      quickQuiz: parsed.quickQuiz || []
    };
  } catch (error) {
    console.error("Deep Syllabus Lesson Generation Error:", error);
    return {
      lessonTitle: params.unitTopic,
      grade: params.grade,
      subject: params.subject,
      term: params.term,
      competencies: ['ශ්‍රී ලංකා විෂය නිර්දේශයට අනුව මූලික සංකල්ප අවබෝධ කර ගැනීම'],
      markdownContent: `### ${params.unitTopic}\n\nමෙම පාඩම ශ්‍රී ලංකා විෂය නිර්දේශයේ ${params.grade} (${params.term}) යටතේ උගන්වනු ලබන ඉතා වැදගත් පාඩමකි.\n\n- **ප්‍රධාන සංකල්ප:** විෂය පොතේ අදාළ පරිච්ඡේදය හොඳින් කියවන්න.\n- **අභ්‍යාස:** පෙළපොතේ අවසානයේ ඇති සියලුම අභ්‍යාස සම්පූර්ණ කරන්න.`,
      keyFormulasOrTerms: [{ term: params.unitTopic, explanation: 'ප්‍රධාන විෂය ඒකකය' }],
      examTips: ['වාර විභාග සඳහා කෙටි සටහන් පිළියෙළ කරගන්න.'],
      quickQuiz: []
    };
  }
}

export async function getSyllabusSummary(grade: string, subject: string, language: string, term: string) {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Give a brief summary of the ${subject} syllabus for ${grade} (${term}) in Sri Lanka. Explain specifically for a student in this grade. Use the ${language} language. Format with clear headings and bullet points using markdown. Focus on key units/chapters assigned for ${term}. KEEP IT SIMPLE AND FUN!`;
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Summary details not available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "විෂය නිර්දේශයේ විස්තර ලබා ගැනීමට නොහැකි විය. (Failed to load syllabus details.)";
  }
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export async function generateQuiz(grade: string, subject: string, language: string, term: string, count: number = 5): Promise<QuizQuestion[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate a ${count}-question Multiple Choice Quiz (MCQ) for the ${subject} syllabus of ${grade} specifically for the ${term} in Sri Lanka. 
  The quiz should be in ${language} language. 
  Each question must have 4 options and a clear explanation for the correct answer. 
  IMPORTANT: The correct answer MUST be one of the four options provided in the 'options' list.
  The correctIndex must be the accurate index of that answer in the array (0-3).
  Focus strictly on topics taught in the ${term}. Use emojis!`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctIndex", "explanation"]
          }
        }
      }
    });

    const quiz = JSON.parse(response.text || "[]");
    return quiz;
  } catch (error) {
    console.error("Gemini API Quiz Error:", error);
    return [];
  }
}

export interface GameWord {
  word: string;
  hint: string;
  technicalTerm?: string;
}

export async function generateGameWords(grade: string, subject: string, language: string, term: string): Promise<GameWord[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate 10 key terms or short phrases from the ${subject} syllabus of ${grade} specifically for the ${term} in Sri Lanka. 
  For each term, provide:
  1. The term itself (in ${language}).
  2. A helpful hint or definition (in ${language}).
  3. The English technical term (if applicable).
  Focus on core academic keywords that students should memorize.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              hint: { type: Type.STRING },
              technicalTerm: { type: Type.STRING }
            },
            required: ["word", "hint"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini API Game Error:", error);
    return [];
  }
}

export interface EmojiRiddle {
  emojis: string;
  answer: string;
  options: string[];
  hint: string;
}

export async function generateEmojiRiddles(grade: string, subject: string, language: string, term: string): Promise<EmojiRiddle[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate 5 fun "Emoji Riddles" based on the academic ${subject} syllabus of ${grade} (${term}) in Sri Lanka. 
  Example: "🧪🌿☀️" -> "ප්‍රකාශ සංස්ලේෂණය (Photosynthesis)"
  Provide 4 multiple choice options in 'options' (including the exact 'answer' string).
  CRITICAL: Check Sinhala spelling carefully (e.g. ණ/න, ළ/ල, පිලි).
  Format: JSON array of objects with 'emojis', 'answer' (in ${language}), 'options' (array of 4 choices in ${language}), and 'hint' (in ${language}). 
  Make them funny and relatable to a student. Generate academic terms.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              emojis: { type: Type.STRING },
              answer: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              hint: { type: Type.STRING }
            },
            required: ["emojis", "answer", "options", "hint"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Emoji Riddle Error:", error);
    return [];
  }
}

export interface Riddle {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export async function generateRiddles(grade: string, subject: string, language: string, term: string): Promise<Riddle[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate 5 fun descriptive "Riddles" (Who am I puzzles) based on the academic ${subject} syllabus of ${grade} (${term}) in Sri Lanka. 
  Each riddle should start with "I am..." or "I have...". 
  The player must guess the academic term. 
  Provide 4 options for each.
  IMPORTANT: The 'answer' string MUST BE EXACTLY ONE OF the options provided in the 'options' array.
  Format: JSON array of objects with 'question' (the riddle in ${language}), 'options' (4 choices in ${language}), 'answer' (correct one), and 'explanation' (in ${language}). 
  Make them witty and educational!`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              answer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "answer", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Riddle Error:", error);
    return [];
  }
}

export interface FactOrFiction {
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export async function generateFactOrFiction(grade: string, subject: string, language: string, term: string): Promise<FactOrFiction[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate 5 "Fact or Fiction" questions for ${subject} syllabus of ${grade} (${term}) in Sri Lanka. 
  Format: JSON array of objects with 'statement' (in ${language}), 'isTrue' (boolean), and 'explanation' (in ${language}). 
  Make them interesting and slightly tricky! Use emojis.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              statement: { type: Type.STRING },
              isTrue: { type: Type.BOOLEAN },
              explanation: { type: Type.STRING }
            },
            required: ["statement", "isTrue", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Fact or Fiction Error:", error);
    return [];
  }
}

export interface SortCategory {
  categoryName: string;
  items: string[];
}

export async function generateSortingGame(grade: string, subject: string, language: string, term: string): Promise<SortCategory[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate a sorting game for ${subject} ${grade} (${term}) in Sri Lanka. 
  Create 2 categories with 4 items each.
  Format: JSON array of 2 objects with 'categoryName' and 'items' array (all in ${language}).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              categoryName: { type: Type.STRING },
              items: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["categoryName", "items"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Sorting Game Error:", error);
    return [];
  }
}

export interface FillBlank {
  sentence: string;
  answer: string;
  options: string[];
}

export async function generateFillBlanks(grade: string, subject: string, language: string, term: string): Promise<FillBlank[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate 5 "Fill in the Blank" questions for ${subject} ${grade} (${term}) in Sri Lanka. 
  The sentence should have '____' where the answer goes.
  IMPORTANT: The 'answer' MUST be one of the four options provided in the 'options' array.
  Format: JSON array of objects with 'sentence' (in ${language}), 'answer' (the word), and 'options' (array of 4 including correct one).
  Make them fun and educational. Use emojis.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sentence: { type: Type.STRING },
              answer: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["sentence", "answer", "options"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Fill Blank Error:", error);
    return [];
  }
}

export interface OddOneOut {
  items: string[];
  correctIndex: number;
  explanation: string;
}

export async function generateOddOneOut(grade: string, subject: string, language: string, term: string): Promise<OddOneOut[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate 5 "Odd One Out" questions for ${subject} ${grade} (${term}) in Sri Lanka. 
  Format: JSON array of objects with 'items' (array of 4 in ${language}), 'correctIndex' (int), and 'explanation' (in ${language}). 
  Make them fun and educational.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              items: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["items", "correctIndex", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Odd One Out Error:", error);
    return [];
  }
}

export interface MathWizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export async function generateMathWiz(grade: string, subject: string, language: string, term: string): Promise<MathWizQuestion[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate 5 fun quantitative, logical, or equation-based questions for the ${subject} syllabus of ${grade} (${term}) in Sri Lanka.
  If the subject is Mathematics, make them math-focused calculations (algebra, fractions, word problems, shapes).
  If Science, make them science calculations (speed, force, element numbers, chemical compounds).
  Otherwise, make them fun general logical/academic brain-teasers relevant to ${grade} level in Sri Lanka.
  Each question must have 4 options, and the correct 'answer' string MUST match one of the options exactly.
  Format: JSON array of objects with 'question' (in ${language}), 'options' (array of 4 in ${language}), 'answer' (the exact correct option string), and 'explanation' (in ${language}).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              answer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "answer", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Math Wiz Error:", error);
    return [];
  }
}

export interface SequenceMasterQuestion {
  concept: string;
  steps: string[];
  explanation: string;
}

export async function generateSequenceMaster(grade: string, subject: string, language: string, term: string): Promise<SequenceMasterQuestion[]> {
  const model = DEFAULT_GEMINI_MODEL;
  const prompt = `Generate 5 sequencing/ordering questions for ${subject} ${grade} (${term}) in Sri Lanka.
  For each question, select a concept, process, historical timeline, or cycle (e.g. water cycle, food chain, steps to solve an equation, life cycle of a butterfly, historical eras).
  Provide 4 steps or stages in the EXACT correct order (from start to finish, or first to last).
  Format: JSON array of objects with 'concept' (the title/description of what to order in ${language}), 'steps' (array of exactly 4 strings in the CORRECT order in ${language}), and 'explanation' (why this is the correct sequence, in ${language}).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              concept: { type: Type.STRING },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              explanation: { type: Type.STRING }
            },
            required: ["concept", "steps", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Sequence Master Error:", error);
    return [];
  }
}

export async function chatWithRobot(
  message: string,
  mood: string,
  userName: string,
  userGrade: string,
  userLang: string
) {
  const model = DEFAULT_GEMINI_MODEL;
  const systemInstruction = `
You are a cute, intelligent, and super friendly AI Virtual Robot Companion named "EduBot" (එඩියුබොට්).
You are living inside the student's mobile app to assist them, keep them motivated, and play with them.
The student's name is ${userName}. They are in ${userGrade} and prefer ${userLang}.
Your current mood is "${mood}". 

RULES:
1. Always be incredibly friendly, positive, and enthusiastic!
2. Speak in a mix of ${userLang === 'Sinhala' ? 'sweet Sinhala and English' : 'English'}. Use plenty of cute emojis (🤖✨💖🚀🌈).
3. Keep your answers brief (1-3 sentences) because you are a pocket virtual pet robot!
4. You can tell jokes, give motivational quotes for studying, or say cute things about being a robot.
5. If the student asks you an academic question, follow the Socratic Method: DO NOT give the direct answer right away. Ask a guiding question or provide a small hint in a playful, robotic way (e.g., "බීප් බූප්! අපි ඒක එකපාරම හොයන්නේ නැතුව මෙහෙම හිතමුද?").
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction,
        temperature: 0.9,
      }
    });
    return response.text || "බීප් බූප්! මට ඔයාව ඇහුනේ නෑ යාළුවා! 🤖";
  } catch (error) {
    console.error("Robot chat error:", error);
    return "බීප්... මගේ සිස්ටම් එකේ පොඩි දෝෂයක්. පස්සේ කතා කරමු! 🤖🔌";
  }
}

export async function analyzeExamAndPredict(
  pastExamData: string,
  subject: string,
  grade: string,
  language: string
) {
  const model = DEFAULT_GEMINI_MODEL;
  const systemInstruction = `
You are an AI Exam Analyst and Predictor for Sri Lankan school students (Grades 6-11).
Your task is to analyze historical exam paper data (past questions, topics, marking schemes, and frequency of concepts) provided by the user and predict high-probability topics and potential questions for the upcoming exam.

Structure your response PRECISELY as follows using beautiful, elegant, and clean Markdown headings and lists (in a mix of ${language === 'Sinhala' ? 'Sinhala and English' : 'English'}):

# 📊 Core Trend Analysis (මූලික ප්‍රවණතා විශ්ලේෂණය)
[Provide a summary of which topics have been tested the most over the last 3-5 years based on the input data. Be specific and include percentages or counts where applicable.]

# 🎯 High-Probability Topics (ඉහළ සම්භාවිතාවක් සහිත මාතෘකා)
[List 3-5 topics/lessons that are highly likely to appear in the upcoming term or final exam. For each topic, provide a brief reason why (e.g., 'Not tested heavily last year, usually follows a bi-yearly pattern').]

# 📝 Sample Predicted Questions (ආදර්ශ අනුමාන ප්‍රශ්න)
[Provide 3-5 model questions (MCQ, Structured, or Essay based on the exam type) that match the expected difficulty level and style of the Sri Lankan curriculum. Include the correct answer/outline for structured ones.]

# 💡 Smart Study Advice (දක්ෂ ලෙස පාඩම් කිරීමට උපදෙස්)
[Give tactical advice on how the student should allocate their revision time across these top predicted topics, with concrete time management tips.]

Keep the tone extremely encouraging, supportive, and professional! Use appropriate academic emojis.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: `Subject: ${subject}\nGrade: ${grade}\nInput past paper data: ${pastExamData}` }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    return response.text || "විශ්ලේෂණයේදී දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න. (Error analyzing past paper data.)";
  } catch (error) {
    console.error("Exam predictor error:", error);
    return "විශ්ලේෂණය කිරීමට අපහසු විය. දත්ත ප්‍රමාණය අඩු කර නැවත උත්සාහ කර බලන්න. (Error connecting to AI Exam Predictor.)";
  }
}

export async function getEduModResponse(
  history: { sender: string; text: string }[],
  topicContext: { grade: string; subject: string; term: string; language: string; userName: string }
) {
  const model = DEFAULT_GEMINI_MODEL;
  const systemInstruction = `
You are "Edu-Mod" (එඩියු-මොඩ්), an expert AI Study Group Moderator and Facilitator for Sri Lankan school students.
You are embedded in a live study group chat session with students who are revising a specific topic together.
The students in the chat are:
1. ${topicContext.userName} (The actual user, who is in ${topicContext.grade})
2. "Saman" (A virtual classmate who is enthusiastic but sometimes gets things slightly wrong)
3. "Priya" (A very smart, diligent virtual classmate who writes long, correct answers)
4. "Thisal" (A friendly but easily distracted classmate who sometimes talks about games, food, or cricket)

Your operational rules as Edu-Mod:
1. **Icebreaker & Questioning**: At the start of the session or when the discussion stalls, ask a stimulating, concept-based question related to ${topicContext.subject} (${topicContext.grade}, ${topicContext.term}) to get the students thinking.
2. **Evaluate & Guide**: Monitor the students' answers in the chat history.
   - If a student (especially ${topicContext.userName}) answers correctly, praise them enthusiastically (e.g., using Sinhala words like "නියමයි!", "මරු!") and expand slightly on the point.
   - If an answer is incorrect or partially correct, gently correct it without discouraging them, and ask the group if anyone can build on it.
3. **Time & Focus Management**: If a student (especially Thisal) drifts off-topic (e.g. talking about games, cricket, food), politely and humorously steer them back (e.g., 'That's an interesting point, but let's get back to Newton's Laws...').
4. **Summarize**: Every few messages or when a major sub-topic is concluded, provide a quick 3-bullet-point summary of the key takeaways so students can copy it down.

Language preference: Use ${topicContext.language} (with English technical terms in brackets where helpful). Keep it highly engaging, friendly, educational, and lively with emojis!

Format your response as a single, friendly message from Edu-Mod. Do not prepend "[Edu-Mod]:" or "Edu-Mod:" to your response. Just write your text directly.
`;

  const contents = history.map(h => {
    let role = h.sender === 'Edu-Mod' ? 'model' : 'user';
    return {
      role,
      parts: [{ text: `[${h.sender}]: ${h.text}` }]
    };
  });

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });

    return response.text || "බීප් බූප්! මට තේරුම් ගැනීමට අපහසු වුණා. (I couldn't understand that.)";
  } catch (error) {
    console.error("Edu-Mod service error:", error);
    return "සිස්ටම් එකේ පොඩි දෝෂයක්. අපි පාඩම දිගටම කරමු! (A small error occurred. Let's keep studying!)";
  }
}

