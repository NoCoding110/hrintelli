// import { createClient } from '@supabase/supabase-js';

// const LLM_API_ENDPOINT = process.env.NEXT_PUBLIC_LLM_API_ENDPOINT || 'http://localhost:8000';
const LLM_API_ENDPOINT = '/api/llm';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export type Metric = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
};

export type Scenario = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export type ChatContext = {
  type: 'analytics' | 'scenario';
  metrics?: {
    totalEmployees?: string | number;
    turnoverRate?: string | number;
    avgSalary?: string | number;
    avgHours?: string | number;
    diversityIndex?: string | number;
  };
  scenarios?: Array<{
    title: string;
    description: string;
  }>;
};

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getLLMResponse(
  messages: Message[],
  context: ChatContext,
  retryCount = 0
): Promise<string> {
  try {
    const response = await fetch(`${LLM_API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        context,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await delay(RETRY_DELAY * (retryCount + 1));
      return getLLMResponse(messages, context, retryCount + 1);
    }
    console.error('LLM API error:', error);
    throw new Error('Failed to get response from AI assistant. Please try again later.');
  }
}

// Helper function to format context for analytics queries
export function formatAnalyticsContext(metrics: Metric[]) {
  return {
    type: 'analytics' as const,
    metrics: {
      totalEmployees: metrics.find((m) => m.title === 'Total Employees')?.value,
      turnoverRate: metrics.find((m) => m.title === 'Turnover Rate')?.value,
      avgSalary: metrics.find((m) => m.title === 'Avg. Salary')?.value,
      avgHours: metrics.find((m) => m.title === 'Avg. Hours/Week')?.value,
      diversityIndex: metrics.find((m) => m.title === 'Diversity Index')?.value,
    },
  };
}

// Helper function to format context for scenario planning queries
export function formatScenarioContext(scenarios: Scenario[]) {
  return {
    type: 'scenario' as const,
    scenarios: scenarios.map((s) => ({
      title: s.title,
      description: s.description,
    })),
  };
} 