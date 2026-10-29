import type { CategoryKey } from '../types';

interface AiOutput {
  text: string;
  viewType?: CategoryKey | 'Resume';
}

export function generateAiResponse(query: string): AiOutput {
  const q = query.toLowerCase().trim();

  // 1. Projects intent
  if (
    q.includes('project') ||
    q.includes('work') ||
    q.includes('portfolio') ||
    q.includes('careergraph') ||
    q.includes('fit week') ||
    q.includes('loomai') ||
    q.includes('built') ||
    q.includes('startup')
  ) {
    return {
      text: `Here are my signature engineering projects. I specialize in Agentic GraphRAG (CareerGraph.AI), distributed microservices (Fit Week on AWS/Java), and sub-second multimodal RAG architectures (LoomAI). Click any card below to explore architecture diagrams and GitHub repos!`,
      viewType: 'Projects',
    };
  }

  // 2. Skills intent
  if (
    q.includes('skill') ||
    q.includes('stack') ||
    q.includes('tech') ||
    q.includes('language') ||
    q.includes('tools') ||
    q.includes('framework') ||
    q.includes('python') ||
    q.includes('go') ||
    q.includes('fastapi') ||
    q.includes('langgraph')
  ) {
    return {
      text: `Here is my structured Skill Matrix Breakdown across three core architectural pillars:
1. AI System Design & Agentic Architecture (LangGraph, CrewAI, MCP, GraphRAG, Neo4j, Langfuse)
2. Backend Engineering & High-Performance Infrastructure (Go, Python/FastAPI, Java, Redis distributed caching, Celery)
3. Productionization & MLOps (Docker, AWS EC2/S3/Bedrock, CI/CD, Next.js/React)`,
      viewType: 'Skills',
    };
  }

  // 3. About / Me / Experience intent
  if (
    q.includes('who are you') ||
    q.includes('about') ||
    q.includes('tell me about yourself') ||
    q.includes('experience') ||
    q.includes('vaia') ||
    q.includes('education') ||
    q.includes('college') ||
    q.includes('nit') ||
    q.includes('me')
  ) {
    return {
      text: `"I specialize in building production-ready, agentic AI systems and high-throughput backend infrastructure. My focus isn't just on stitching together LLM calls, but on designing the reliable system architecture around them—from multi-agent workflows, stateful orchestration, and GraphRAG pipelines to scalable microservices in Go and Python. I place a heavy emphasis on system design, deterministic state management, and evaluation metrics to ensure performance, quality, and low-latency delivery in production." Here is my engineering profile:`,
      viewType: 'Me',
    };
  }

  // 4. Fun / Hobbies intent
  if (
    q.includes('fun') ||
    q.includes('craziest') ||
    q.includes('hobby') ||
    q.includes('hobbies') ||
    q.includes('free time') ||
    q.includes('routine') ||
    q.includes('outside') ||
    q.includes('gym') ||
    q.includes('football') ||
    q.includes('ronaldo') ||
    q.includes('travel') ||
    q.includes('workout') ||
    q.includes('bench') ||
    q.includes('pr')
  ) {
    return {
      text: `When I'm not coding or architecting distributed systems, I'm usually busy at the gym or playing football! I'm a huge football fan and Cristiano Ronaldo admirer, love heavy lifting (flexing a 90 kg bench press & 30 kg dumbbell press PR), and love traveling—having explored all of North India. Take a look:`,
      viewType: 'Fun',
    };
  }

  // 5. Contact intent
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('hire') ||
    q.includes('phone') ||
    q.includes('reach') ||
    q.includes('message') ||
    q.includes('talk')
  ) {
    return {
      text: `I'd love to connect! You can reach me directly at akhtersharique75@gmail.com, connect with me on LinkedIn, or give me a call at +91 7520371336. Here is my contact sheet:`,
      viewType: 'Contact',
    };
  }

  // 6. Resume intent
  if (
    q.includes('resume') ||
    q.includes('cv') ||
    q.includes('pdf') ||
    q.includes('download')
  ) {
    return {
      text: `Here is my verified resume covering my engineering internships, agentic RAG architectures, full tech stack, and achievements. You can download or view it below:`,
      viewType: 'Resume',
    };
  }

  // Fallback intelligent conversation
  return {
    text: `Thanks for asking! I specialize in building production-ready, agentic AI systems and high-throughput backend infrastructure (Go & Python). Feel free to explore my architectural projects, structured skill matrix, or resume below!`,
    viewType: 'Projects',
  };
}
