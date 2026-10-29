import type { Project, SkillGroup, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Sharique Akhtar',
  shortName: 'Sharique',
  role: 'Upcoming Software Engineer at Hitachi Digital',
  tagline: 'Agentic AI Systems • GraphRAG • Distributed Microservices (Go & Python) • MLOps',
  location: 'Noida, UP, India',
  email: 'akhtersharique75@gmail.com',
  phone: '+91 7520371336',
  avatar: '/memoji.png',
  bio: `I specialize in building production-ready, agentic AI systems and high-throughput backend infrastructure. My focus isn't just on stitching together LLM calls, but on designing the reliable system architecture around them—from multi-agent workflows, stateful orchestration, and GraphRAG pipelines to scalable microservices in Go and Python. I place a heavy emphasis on system design, deterministic state management, and evaluation metrics to ensure performance, quality, and low-latency delivery in production.`,
  socialLinks: {
    linkedin: 'https://linkedin.com/in/akhter-sharique',
    github: 'https://github.com/realshak7781',
    leetcode: 'https://leetcode.com',
    email: 'mailto:akhtersharique75@gmail.com',
  },
  education: {
    institution: 'Dr. B. R. Ambedkar National Institute of Technology (NIT) Jalandhar',
    degree: 'Bachelor of Technology (B.Tech) in Information Technology',
    period: 'July 2022 – June 2026',
    status: 'Final Year IT Undergrad',
  },
  achievements: [
    {
      title: '1,000+ LeetCode Problems Solved',
      detail: 'Deep mastery over Data Structures, Graph Algorithms, and Dynamic Programming. 100+ solved on Codeforces.',
      icon: 'code',
    },
    {
      title: 'All India Rank 16,000 (JEE Mains)',
      detail: 'Top percentile engineering entrance merit among over 1.1 million candidates across India.',
      icon: 'trophy',
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'careergraph',
    category: 'Agentic GraphRAG',
    title: 'CareerGraph.AI',
    subtitle: 'Built with a stubborn refusal to let a resume be just a PDF 🕸️',
    src: '/careergraph-preview.png',
    description: `An AI-powered platform that converts static resumes and LinkedIn archives into a dynamic Vector-Graph database. Built with a stubborn refusal to let a resume be just a PDF, it uses multi-agent orchestration to discover hidden 2nd and 3rd-degree referral paths, matching users to high-probability job opportunities.`,
    highlights: [
      'Engineered an asynchronous ingestion pipeline (Celery, Redis) to parse LinkedIn archives and resumes entirely in-memory into a unified Vector-Graph database.',
      'Built a multi-agent orchestration layer (LangGraph) paired with a stealth Playwright scraper.',
      'Executes hybrid Cypher queries (vector similarity + graph traversal) to surface hidden referral routes that keyword search misses.',
    ],
    stack: ['FastAPI', 'Next.js', 'Neo4j', 'LangGraph', 'Sigma.js (WebGL)', 'Celery', 'Redis', 'Playwright'],
    githubUrl: 'https://github.com/realshak7781/CareerGraph.AI',
    liveUrl: 'https://careergraph.ai',
    stats: 'In-Memory Graph Parsing',
  },
  {
    id: 'fitweek',
    category: 'Distributed AI System',
    title: 'FitWeek',
    subtitle: 'Turn Weeks Into WINS — Distributed full-stack fitness coaching',
    src: '/fitweek-preview.png',
    description: `FitWeek is a distributed full-stack application designed to track strength training progress while providing real-time, context-aware coaching. Built with a microservices-inspired architecture, it bridges an Enterprise Java Backend, a Global CDN-delivered React Frontend, and an Autonomous Python AI Agent.`,
    highlights: [
      'Identified and resolved production unauthorized access risk: traced exposed S3 bucket endpoints bypassing CDN; implemented strict Origin Access Control (OAC) & CORS policies, eliminating 100% of direct bucket exposure.',
      'Engineered a distributed full-stack architecture serving 50+ concurrent users with Java 17 Spring Boot REST APIs containerized using Docker on Amazon EC2.',
      'Built autonomous AI coaching agents in Python & LangGraph, utilizing multi-step reasoning over complex user telemetry.',
      'Traced global frontend latency bottlenecks; deployed globally via AWS CloudFront CDN, slashing average load times from 3s+ to under 300ms.',
    ],
    stack: ['Java 17 (Spring Boot)', 'Python', 'React', 'TypeScript', 'LangGraph', 'AWS (EC2/S3/CloudFront)', 'Docker', 'PostgreSQL'],
    githubUrl: 'https://github.com/realshak7781/FitWeek/tree/main/',
    liveUrl: 'https://fitweek.app',
    stats: '<300ms Global CDN Latency',
  },
  {
    id: 'loomai',
    category: 'Multimodal Agentic RAG',
    title: 'LoomAI',
    subtitle: 'Sub-second inference RAG engine on 2GB RAM cloud instances',
    src: '/defaipreview.png',
    description: `High-performance multimodal RAG pipeline extracting insights from PDFs and audio streams, optimized for tight resource constraints with sub-second inference.`,
    highlights: [
      'Engineered a multimodal ingestion pipeline handling PDFs and media; optimized processing for a 2GB RAM AWS EC2 (t3.small) environment by deploying Whisper-Tiny for timestamp-linked transcription extraction.',
      'Designed a high-performance Agentic RAG engine using LangChain and Groq-hosted LLaMA 3.3, achieving sub-second inference latency (~300ms) with in-memory FAISS L2 distance search.',
    ],
    stack: ['FastAPI', 'React', 'LLaMA 3.3 (Groq)', 'FAISS', 'OpenAI Whisper', 'LangChain', 'AWS EC2/S3', 'Vercel'],
    githubUrl: 'https://github.com/realshak7781/loom-ai',
    liveUrl: 'https://loomai.dev',
    stats: '~300ms Inference Latency',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: '1. AI System Design & Agentic Architecture',
    iconName: 'Cpu',
    skills: [
      'LangGraph',
      'CrewAI',
      'MCP (Model Context Protocol)',
      'Multi-Agent Orchestration',
      'GraphRAG',
      'Neo4j',
      'Pinecone',
      'FAISS',
      'ChromaDB',
      'Langfuse',
      'OpenTelemetry',
      'Evaluation & Tracing',
    ],
    color: '#856ED9',
    badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800/40',
    items: [
      {
        area: 'Agentic Workflows & Multi-Agent Orchestration',
        details: 'Designing autonomous, stateful agent systems using tools like LangGraph, CrewAI, and MCP (Model Context Protocol).',
        chips: ['LangGraph', 'CrewAI', 'MCP Protocol', 'Multi-Agent Swarms', 'Stateful Graphs'],
      },
      {
        area: 'Advanced RAG & Vector Systems',
        details: 'Architecting hybrid retrieval, GraphRAG, and context pipelines leveraging Neo4j, Pinecone, FAISS, and ChromaDB.',
        chips: ['GraphRAG', 'Neo4j', 'Pinecone', 'FAISS', 'ChromaDB', 'Hybrid Retrieval'],
      },
      {
        area: 'Evaluation & Quality Assurance',
        details: 'Implementing systematic evaluation frameworks, tracing, and quality metrics (e.g., using Langfuse, OpenTelemetry) to ensure production reliability.',
        chips: ['Langfuse', 'OpenTelemetry', 'Evaluation Frameworks', 'Tracing Metrics', 'Guardrails'],
      },
    ],
  },
  {
    category: '2. Backend Engineering & High-Performance Infrastructure',
    iconName: 'Server',
    skills: [
      'Go',
      'Python',
      'FastAPI',
      'Java 17 (Spring Boot)',
      'Microservices',
      'Redis Distributed Caching',
      'Celery Task Queues',
      'Event-Driven Systems',
      'PostgreSQL',
      'Query Optimization',
      'Vector Datastores',
    ],
    color: '#3E9858',
    badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40',
    items: [
      {
        area: 'Systems & Microservices',
        details: 'Building low-latency, scalable microservices and APIs using Go, Python (FastAPI), and Java (Spring Boot).',
        chips: ['Go', 'Python (FastAPI)', 'Java 17 (Spring Boot)', 'Microservices Architecture', 'Low-Latency APIs'],
      },
      {
        area: 'Distributed Systems & Caching',
        details: 'Engineering high-throughput pipelines with Redis distributed caching, asynchronous task queues (Celery), and event-driven architectures.',
        chips: ['Redis Caching', 'Celery Queues', 'Event-Driven Architecture', 'High-Throughput Pipelines'],
      },
      {
        area: 'Storage & Data Engineering',
        details: 'Schema design and query optimization across relational (PostgreSQL), graph, and vector datastores.',
        chips: ['PostgreSQL', 'Query Optimization', 'Graph Datastores', 'Vector Databases', 'Schema Design'],
      },
    ],
  },
  {
    category: '3. Productionization & MLOps',
    iconName: 'Layout',
    skills: [
      'Docker',
      'AWS (EC2, S3, Bedrock)',
      'CI/CD Automation',
      'LLM APIs',
      'Custom Model Deployments',
      'State Management',
      'Next.js',
      'React',
    ],
    color: '#0171E3',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/40',
    items: [
      {
        area: 'Deployment & Containerization',
        details: 'Shipping containerized AI workflows with Docker, AWS cloud infrastructure (EC2, S3, Bedrock), and CI/CD automation.',
        chips: ['Docker', 'AWS (EC2, S3, Bedrock)', 'CI/CD Automation', 'Containerized AI Workflows'],
      },
      {
        area: 'Integration & Orchestration',
        details: 'Interfacing with LLM APIs, custom model deployments, state management, and full-stack integration (Next.js/React).',
        chips: ['LLM APIs', 'Custom Model Deployments', 'Deterministic State Management', 'Next.js', 'React'],
      },
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Full Stack AI Intern',
    company: 'VAIA',
    period: 'Recent',
    type: 'Production Experience',
    description: [
      'Built and maintained backend APIs and database logic (FastAPI, PostgreSQL) for production, client-facing ESG and investment-advisory tools used by real investment and sustainability teams.',
      'Integrated an LLM API into an existing backend workflow to add AI-assisted functionality to a live product surface; fixed bugs and improved reliability of existing backend endpoints.',
    ],
  },
];

export const CATEGORY_TRIGGERS = [
  {
    key: 'Me' as const,
    label: 'Me',
    color: '#3B82F6',
    prompt: 'Who are you? What is your background and engineering focus?',
    icon: 'Avatar',
    avatarSrc: '/me-avatar.png',
  },
  {
    key: 'Projects' as const,
    label: 'Projects',
    color: '#3E9858',
    prompt: 'What are your projects? What are you working on right now?',
    icon: 'Projects',
    svgSrc: '/projects.svg',
  },
  {
    key: 'Skills' as const,
    label: 'Skills',
    color: '#856ED9',
    prompt: 'What is your skill matrix breakdown and core architectural stack?',
    icon: 'Skills',
    svgSrc: '/skills.svg',
  },
  {
    key: 'Fun' as const,
    label: 'Fun',
    color: '#B95F9D',
    prompt: 'What’s the craziest thing you’ve ever done? What are your hobbies?',
    icon: 'Fun',
    svgSrc: '/fun.svg',
  },
  {
    key: 'Contact' as const,
    label: 'Contact',
    color: '#C19433',
    prompt: 'How can I contact you?',
    icon: 'Contact',
    svgSrc: '/contact.svg',
  },
];
