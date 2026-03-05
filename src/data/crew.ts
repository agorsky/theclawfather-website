export interface CrewMember {
  name: string;
  character: string;
  showFilm: string;
  role: string;
  emoji: string;
  agentId: string;
  bio: string;
  isBoss?: boolean;
}

export const crew: CrewMember[] = [
  {
    name: 'The Claw Father',
    character: 'Don Corleone',
    showFilm: 'The Godfather',
    role: 'Orchestrator / The Don',
    emoji: '\u{1F99E}',
    agentId: 'THE DON',
    bio: "Doesn't run errands. Runs operations. Spots the opportunity, dispatches the right crew, reviews the work before it ships. Nothing moves without sign-off. The crew stays loyal, capable, and fast. The boss stays deliberate, strategic, and in control.",
    isBoss: true,
  },
  {
    name: 'Tommy',
    character: 'Tommy DeVito',
    showFilm: 'Goodfellas',
    role: 'Research Agent',
    emoji: '\u{1F50D}',
    agentId: 'RESEARCH-01',
    bio: "Input: query. Output: structured briefing with sources. Hallucination tolerance: zero. Gets deployed before decisions, not after. If you're guessing, Tommy didn't do his job.",
  },
  {
    name: 'Bobby',
    character: 'Bobby Baccalieri',
    showFilm: 'The Sopranos',
    role: 'Coding Agent',
    emoji: '\u{1F4BB}',
    agentId: 'CODING-02',
    bio: "Spec-driven. PRD required. Reads the spec twice before writing a line. Builds fast, breaks things correctly. The checklist exists because we skipped it once and won't do that again.",
  },
  {
    name: 'Silvio',
    character: 'Silvio Dante',
    showFilm: 'The Sopranos',
    role: 'Content Agent',
    emoji: '\u{1F3AD}',
    agentId: 'CONTENT-03',
    bio: "Strategic frameworks, not word count. Produced the 30-day X strategy and 20 post drafts in a single session. Thinks in systems, writes in structures.",
  },
  {
    name: 'Sal',
    character: 'Sal Tessio',
    showFilm: 'The Godfather',
    role: 'Memory Agent',
    emoji: '\u{1F9E0}',
    agentId: 'MEMORY-04',
    bio: "Nightly batch process. Reads session logs, extracts durable facts, updates long-term store. You don't notice Sal until you need something from three weeks ago and it's right there.",
  },
  {
    name: 'Paulie',
    character: 'Paulie Walnuts',
    showFilm: 'The Sopranos',
    role: 'Design Agent',
    emoji: '\u{1F3A8}',
    agentId: 'DESIGN-05',
    bio: "Meticulous. Particular about appearances. Knows what the Don prefers. Nothing ships until Paulie signs off on how it looks. If the spacing is off, you'll hear about it.",
  },
  {
    name: 'Henry',
    character: 'Henry Hill',
    showFilm: 'Goodfellas',
    role: 'Voice / Copy Agent',
    emoji: '\u{1F399}\u{FE0F}',
    agentId: 'VOICE-06',
    bio: "Every post passes through Henry before it goes live. He's the narrator. Makes it sound human. No em dashes. No AI tells. No exceptions. If it reads like a bot wrote it, Henry failed.",
  },
];
