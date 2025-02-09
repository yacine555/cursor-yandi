import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatAnthropic } from "@langchain/anthropic";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

export interface SummaryResult {
  summary: string;
  cool_facts: string[];
}

export async function summarizeReadme(readmeContent: string) {

  const respSchema = z.object({
    summary: z.string().describe("A concise summary of the GitHub repository"),
    cool_facts: z.array(z.string()).describe("Interesting facts about the repository")
  });

  // Initialize the LLM with structured output
  const model = new ChatAnthropic({
    modelName: "claude-3-5-sonnet-20241022",
    temperature: 0,
  }).withStructuredOutput<SummaryResult>(respSchema);

  // Create the prompt template
  const prompt = ChatPromptTemplate.fromTemplate(`
    Analyze this GitHub repository README content and provide a structured summary.
    Please format your response as a JSON object with the following structure:
    {{
      "summary": "A concise summary of the repository",
      "cool_facts": ["fact 1", "fact 2"]
    }}
    
    README Content:
    {readme_content}
  `);

  // Create the chain
  const chain = RunnableSequence.from([prompt, model]);

  const result = await chain.invoke({ readme_content: readmeContent});


  return result;
}

