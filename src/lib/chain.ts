import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatAnthropic } from "@langchain/anthropic";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

export interface SummaryResult {
  summary: string;
  cool_facts: string[];
}

export async function summarizeReadme(readmeContent: string) {

  // Initialize the LLM
  const model = new ChatAnthropic({
    modelName: "claude-3-sonnet-20240229",
    temperature: 0,
  });

  const respSchema = z.object({
    summary: z.string().describe("A concise summary of the GitHub repository"),
    cool_facts: z.array(z.string()).describe("Interesting facts about the repository")
  });

  // Create the output parser with the desired schema
  const outputParser = StructuredOutputParser.fromZodSchema(respSchema);

  // Create the prompt template
  const prompt = ChatPromptTemplate.fromTemplate(`
    Analyze this GitHub repository README content and provide a structured summary.
    
    README Content:
    {readme_content}
    
    Provide your response in the following format:
    {format_instructions}
  `);

  // Create the chain
  const chain = RunnableSequence.from([
    prompt,
    model,
    outputParser,
  ]);

  const result = await chain.invoke({
    readme_content: readmeContent,
    format_instructions: outputParser.getFormatInstructions()
  });


  return result;
}

