import { useState, useRef, useEffect, useCallback, type RefObject } from "react";
import { motion, useInView } from "framer-motion";
import {
  Lightbulb24Regular,
  TaskListSquareLtr24Regular,
  Rocket24Regular,
  CheckmarkStarburst24Regular,
  CheckmarkCircle16Filled,
  Circle16Regular,
  ShieldCheckmark20Filled,
  Play20Filled,
  Eye24Regular,
  PlugConnected20Regular,
  ArrowRepeatAll20Regular,
  Notepad20Regular,
  TextDescription20Regular,
  BranchFork20Regular,
} from "@fluentui/react-icons";

/* ------------------------------------------------------------------ */
/*  Scroll-triggered fade-up wrapper                                  */
/* ------------------------------------------------------------------ */
function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                  */
/* ------------------------------------------------------------------ */
function Counter({
  target,
  suffix = "",
  containerRef,
}: {
  target: number;
  suffix?: string;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const inView = useInView(containerRef, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round(t * target));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Terminal-style mockup                                              */
/* ------------------------------------------------------------------ */
function MockTerminal({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0c0c0d] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
        </div>
        {title && (
          <span className="text-[11px] text-white/25 ml-1 font-mono">
            {title}
          </span>
        )}
      </div>
      <div className="p-4 font-mono text-[11.5px] leading-[1.8] text-white/50 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const steps = [
  {
    Icon: Lightbulb24Regular,
    title: "Describe",
    desc: "Tell your crew what needs to be built in plain language",
  },
  {
    Icon: TaskListSquareLtr24Regular,
    title: "Plan",
    desc: "Dispatcher breaks it into epics, features, and tasks with full context",
  },
  {
    Icon: Rocket24Regular,
    title: "Dispatch",
    desc: "Agents are assigned sessions with memory, specs, and constraints",
  },
  {
    Icon: CheckmarkStarburst24Regular,
    title: "Ship",
    desc: "Automated validation confirms the work is actually done",
  },
];

const capabilities = [
  {
    Icon: PlugConnected20Regular,
    title: "98 MCP Tools",
    desc: "Full API surface for agents to manage epics, features, tasks, sessions, and compliance",
  },
  {
    Icon: ShieldCheckmark20Filled,
    title: "Quality Gates",
    desc: "Automated scoring ensures work meets standards before tasks are marked complete",
  },
  {
    Icon: ArrowRepeatAll20Regular,
    title: "Session Handoff",
    desc: "Memory, decisions, and progress preserved automatically across every agent session",
  },
  {
    Icon: Notepad20Regular,
    title: "Decision Logging",
    desc: "Every agent choice recorded with rationale, alternatives, and impact analysis",
  },
  {
    Icon: BranchFork20Regular,
    title: "Dependency Graph",
    desc: "Phases resolve automatically as upstream work completes — no manual coordination",
  },
  {
    Icon: TaskListSquareLtr24Regular,
    title: "Execution Plans",
    desc: "Dependency-aware phase planning with parallel groups and critical path enforcement",
  },
  {
    Icon: TextDescription20Regular,
    title: "Structured Specs",
    desc: "AI instructions, acceptance criteria, and file references on every task — no guessing",
  },
  {
    Icon: Eye24Regular,
    title: "Compliance Audit",
    desc: "The Fed audits every session. Agents scored 0–100 on execution quality",
  },
];

const integrations = [
  {
    name: "Claude Code",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 13v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V5h2c1.1 0 2-.9 2-2v-.41C18.93 4.56 22 8.13 22 12c0 1.65-.38 3.22-1.1 4.39z"/>
      </svg>
    ),
  },
  {
    name: "OpenClaw",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    name: "Terminal",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M0 3a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3zm2 1v16h20V4H2zm4.146 3.146a.5.5 0 0 1 .708 0l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L9.293 11 6.146 7.854a.5.5 0 0 1 0-.708zM11.5 14.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function DispatcherMarketing() {
  const [betaEmail, setBetaEmail] = useState("");
  const [betaStatus, setBetaStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const statsRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  // Lerp animation loop — GPU-accelerated via translate3d
  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running || !orbRef.current) return;
      const lerp = isHoveringRef.current ? 0.08 : 0.04;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
      orbRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 240;
      const y = e.clientY - rect.top + e.currentTarget.scrollTop - 240;
      targetRef.current = { x, y };
      isHoveringRef.current = true;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (rightPanelRef.current) {
      const w = rightPanelRef.current.clientWidth;
      targetRef.current = { x: w / 2 - 240, y: -128 };
    }
    isHoveringRef.current = false;
  }, []);

  const handleBetaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!betaEmail.trim()) return;
    setBetaStatus("sending");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: betaEmail.trim(), tag: "dispatcher-beta" }),
      });

      if (res.ok) {
        setBetaStatus("success");
      } else {
        setBetaStatus("error");
      }
    } catch {
      setBetaStatus("error");
    }
  };

  const card = "bg-white/[0.03] border border-white/[0.06] rounded-xl";

  return (
    <div
      ref={rightPanelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-y-auto"
      style={{ background: "#0a0a0b" }}
    >
      <div className="px-6 md:px-14 lg:px-24 xl:px-32 py-16 space-y-28 max-w-5xl mx-auto">
        {/* ---- Hero ---- */}
        <section className="relative">
          {/* Hue orb */}
          <div
            ref={orbRef}
            className="pointer-events-none absolute w-[480px] h-[480px] rounded-full opacity-20 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, #7C3AED 0%, #A78BFA 50%, transparent 70%)",
              left: 0,
              top: 0,
              willChange: "transform",
            }}
          />

          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]/60 mb-5">
              AI Agent Orchestration
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.08]">
              <span className="text-white">Agents that take orders.</span>
              <br />
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] bg-clip-text text-transparent">
                Actually ship.
              </span>
            </h2>
            <p className="mt-6 text-[15px] text-white/40 max-w-lg leading-relaxed">
              Dispatcher gives your AI crew memory, structure, and
              accountability. Turn vague requests into planned, executed, and
              verified deliverables — across your entire crew, working in
              parallel.
            </p>

            {/* Hero inline CTA */}
            <div className="mt-8">
              {betaStatus === "success" ? (
                <p className="text-sm text-emerald-400/80">You're on the list. We'll be in touch.</p>
              ) : (
                <form className="flex gap-3 max-w-md" onSubmit={handleBetaSubmit}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={betaEmail}
                    onChange={(e) => setBetaEmail(e.target.value)}
                    className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#8B5CF6]/40"
                    required
                  />
                  <button
                    type="submit"
                    disabled={betaStatus === "sending"}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    {betaStatus === "sending" ? "Sending..." : "Get Early Access"}
                  </button>
                </form>
              )}
              {betaStatus === "error" && (
                <p className="mt-2 text-[11px] text-red-400/70">Something went wrong. Try again.</p>
              )}
              <p className="mt-2 text-[11px] text-white/20">No spam. We'll reach out when your spot opens.</p>
            </div>
          </FadeUp>
        </section>

        {/* ---- How it works ---- */}
        <section>
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-6">
              How it works
            </p>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {steps.map((s, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div
                  className={`${card} p-5 h-full hover:bg-white/[0.05] transition-colors duration-200`}
                >
                  <s.Icon className="w-5 h-5 text-[#8B5CF6]/70 mb-3" />
                  <p className="text-sm font-medium text-white">{s.title}</p>
                  <p className="mt-1 text-[11px] text-white/35 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ---- Plan ---- */}
        <section>
          <FadeUp>
            <div className="flex items-center gap-2.5 mb-3">
              <TaskListSquareLtr24Regular className="w-5 h-5 text-[#8B5CF6]/70" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]/70">
                Plan
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
              From vague idea to
              <br />
              structured execution
            </h3>
            <p className="mt-3 text-sm text-white/35 max-w-md leading-relaxed">
              Describe what you want built in plain language. Dispatcher
              decomposes it into epics with features, tasks, acceptance criteria,
              and complexity estimates.
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {/* Epic header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06]">
                <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <span className="text-[13px] text-white/80 font-medium">
                  User Authentication System
                </span>
                <span className="text-[10px] text-white/20 ml-auto">
                  3 features · 11 tasks
                </span>
              </div>

              {/* Feature cards */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { name: "Database Schema", complexity: "moderate", tasks: 3, progress: 67, status: "active" },
                    { name: "API Endpoints", complexity: "moderate", tasks: 4, progress: 25, status: "active" },
                    { name: "Auth UI", complexity: "complex", tasks: 4, progress: 0, status: "pending" },
                  ].map((f, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-colors"
                    >
                      <p className="text-[11px] text-white/60 font-medium truncate">
                        {f.name}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              f.progress > 50
                                ? "bg-emerald-400/60"
                                : f.progress > 0
                                ? "bg-amber-400/60"
                                : ""
                            }`}
                            style={{ width: `${f.progress}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-white/20 w-7 text-right">
                          {f.progress}%
                        </span>
                      </div>
                      <p className="mt-1.5 text-[9px] text-white/20">
                        {f.complexity} · {f.tasks} tasks
                      </p>
                    </div>
                  ))}
                </div>

                {/* Task list */}
                <div className="mt-3 space-y-1">
                  {[
                    { text: "Create User model", status: "done" },
                    { text: "Add JWT middleware", status: "progress" },
                    { text: "Implement refresh tokens", status: "pending" },
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-1 py-0.5"
                    >
                      {t.status === "done" ? (
                        <CheckmarkCircle16Filled className="w-4 h-4 text-emerald-400/70 shrink-0" />
                      ) : t.status === "progress" ? (
                        <div className="w-4 h-4 rounded-full border-2 border-amber-400/40 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70 animate-pulse" />
                        </div>
                      ) : (
                        <Circle16Regular className="w-4 h-4 text-white/15 shrink-0" />
                      )}
                      <span
                        className={`text-[11px] flex-1 ${
                          t.status === "pending"
                            ? "text-white/25"
                            : "text-white/50"
                        }`}
                      >
                        {t.text}
                      </span>
                      <span
                        className={`text-[9px] ${
                          t.status === "done"
                            ? "text-emerald-400/50"
                            : t.status === "progress"
                            ? "text-amber-400/50"
                            : "text-white/15"
                        }`}
                      >
                        {t.status === "done"
                          ? "done"
                          : t.status === "progress"
                          ? "in progress"
                          : "pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ---- Execute ---- */}
        <section>
          <FadeUp>
            <div className="flex items-center gap-2.5 mb-3">
              <Rocket24Regular className="w-5 h-5 text-[#8B5CF6]/70" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]/70">
                Execute
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
              Parallel agents,
              <br />
              coordinated phases
            </h3>
            <p className="mt-3 text-sm text-white/35 max-w-md leading-relaxed">
              Dispatcher orchestrates multiple AI agents working simultaneously.
              Dependencies are respected, context is shared, and phases advance
              automatically when work is verified.
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06]">
                <Play20Filled className="w-4 h-4 text-[#8B5CF6]/70" />
                <span className="text-[13px] text-white/80 font-medium">
                  Execution Progress
                </span>
                <span className="text-[10px] text-amber-400/60 ml-auto">
                  Phase 2 of 3
                </span>
              </div>

              {/* Phase 1 - Complete */}
              <div className="px-5 py-3.5 border-b border-white/[0.04]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] text-white/40 font-medium">
                    Phase 1
                  </span>
                  <span className="text-[10px] text-emerald-400/60 flex items-center gap-1">
                    <CheckmarkCircle16Filled className="w-3 h-3" />
                    Complete
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.04] p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-400/15 flex items-center justify-center">
                        <CheckmarkCircle16Filled className="w-3.5 h-3.5 text-emerald-400/80" />
                      </div>
                      <div>
                        <p className="text-[11px] text-white/60 font-medium">
                          Database Schema
                        </p>
                        <p className="text-[9px] text-white/20">
                          agent-1 · 4m 23s
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2 - In Progress */}
              <div className="px-5 py-3.5 border-b border-white/[0.04]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] text-white/40 font-medium">
                    Phase 2
                  </span>
                  <span className="text-[10px] text-amber-400/60">
                    In Progress
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.04] p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-400/15 flex items-center justify-center">
                        <CheckmarkCircle16Filled className="w-3.5 h-3.5 text-emerald-400/80" />
                      </div>
                      <div>
                        <p className="text-[11px] text-white/60 font-medium">
                          API Endpoints
                        </p>
                        <p className="text-[9px] text-white/20">
                          agent-2 · 8m 12s
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 rounded-lg border border-amber-400/15 bg-amber-400/[0.03] p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-amber-400/15 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-[11px] text-white/60 font-medium">
                          Auth UI
                        </p>
                        <p className="text-[9px] text-amber-400/40">
                          in progress…
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-center">
                  <span className="text-[9px] text-white/15 bg-white/[0.03] px-2.5 py-0.5 rounded-full">
                    ↕ running in parallel
                  </span>
                </div>
              </div>

              {/* Phase 3 - Pending */}
              <div className="px-5 py-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] text-white/25 font-medium">
                    Phase 3
                  </span>
                  <span className="text-[10px] text-white/15">Pending</span>
                </div>
                <div className="flex gap-2 opacity-40">
                  <div className="flex-1 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-white/[0.04] flex items-center justify-center">
                        <Circle16Regular className="w-3.5 h-3.5 text-white/20" />
                      </div>
                      <div>
                        <p className="text-[11px] text-white/40 font-medium">
                          E2E Testing
                        </p>
                        <p className="text-[9px] text-white/15">
                          waiting on Phase 2
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ---- Monitor ---- */}
        <section>
          <FadeUp>
            <div className="flex items-center gap-2.5 mb-3">
              <Eye24Regular className="w-5 h-5 text-[#8B5CF6]/70" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]/70">
                Monitor
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
              Real-time visibility into
              <br />
              every agent decision
            </h3>
            <p className="mt-3 text-sm text-white/35 max-w-md leading-relaxed">
              Watch your crew work live. Every event, decision, and progress
              update streams in real time — full transparency into what's
              happening and why.
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="mt-6">
              <MockTerminal title="dispatcher — agent monitor">
                <div className="space-y-0.5">
                  {[
                    { time: "14:32:01", icon: "●", color: "text-blue-400/60", type: "session_started", detail: "bobby · epic ENG-E42" },
                    { time: "14:33:22", icon: "✓", color: "text-emerald-400/60", type: "task_completed", detail: "Create User model" },
                    { time: "14:33:45", icon: "◆", color: "text-purple-400/60", type: "decision_made", detail: "Use bcrypt rounds=12 for security" },
                    { time: "14:35:12", icon: "✓", color: "text-emerald-400/60", type: "validation_passed", detail: "TypeScript compiles (0 errors)" },
                    { time: "14:38:01", icon: "●", color: "text-blue-400/60", type: "task_started", detail: "Add JWT middleware" },
                    { time: "14:42:33", icon: "△", color: "text-amber-400/60", type: "progress_note", detail: "Adjusting token expiry for edge case" },
                    { time: "14:44:18", icon: "✓", color: "text-emerald-400/60", type: "task_completed", detail: "Add JWT middleware" },
                  ].map((e, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-white/20 w-16 shrink-0">
                        {e.time}
                      </span>
                      <span className={`${e.color} w-4 text-center`}>
                        {e.icon}
                      </span>
                      <span className="text-white/30 w-28 shrink-0 truncate">
                        {e.type}
                      </span>
                      <span className="text-white/55">{e.detail}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-white/20 text-[10.5px]">
                  7 events · 2 decisions · 0 blocked
                </div>
              </MockTerminal>
            </div>
          </FadeUp>
        </section>

        {/* ---- Validate ---- */}
        <section>
          <FadeUp>
            <div className="flex items-center gap-2.5 mb-3">
              <ShieldCheckmark20Filled className="w-5 h-5 text-[#8B5CF6]/70" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]/70">
                Validate
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
              Done means
              <br />
              actually done
            </h3>
            <p className="mt-3 text-sm text-white/35 max-w-md leading-relaxed">
              Every task has acceptance criteria verified by automated checks.
              The Fed audits every session. No "looks good to me" — real proof
              that the work is complete.
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06]">
                <ShieldCheckmark20Filled className="w-4 h-4 text-emerald-400/70" />
                <span className="text-[13px] text-white/80 font-medium">
                  Validation Report
                </span>
                <span className="text-[10px] text-emerald-400/60 ml-auto flex items-center gap-1">
                  <CheckmarkCircle16Filled className="w-3 h-3" />
                  4/5 passed
                </span>
              </div>

              {/* Check items */}
              <div className="divide-y divide-white/[0.03]">
                {[
                  { label: "TypeScript compiles", cmd: "pnpm exec tsc --noEmit", result: "exit 0", time: "0.8s", pass: true },
                  { label: "Route registered", cmd: "file_contains router.post.*auth", result: "matched", time: "0.2s", pass: true },
                  { label: "Tests pass", cmd: "pnpm test auth.test.ts", result: "8 passed", time: "2.1s", pass: true },
                  { label: "Session logged", cmd: "dispatcher session verified", result: "confirmed", time: "0.3s", pass: true },
                  { label: "Code review", cmd: "manual review", result: "pending", time: "—", pass: false },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        c.pass ? "bg-emerald-400/15" : "bg-amber-400/10"
                      }`}
                    >
                      {c.pass ? (
                        <CheckmarkCircle16Filled className="w-3.5 h-3.5 text-emerald-400/80" />
                      ) : (
                        <Circle16Regular className="w-3.5 h-3.5 text-amber-400/60" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-white/60 font-medium">
                        {c.label}
                      </p>
                      <p className="text-[9px] text-white/20 font-mono truncate">
                        {c.cmd}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] shrink-0 ${
                        c.pass
                          ? "text-emerald-400/50"
                          : "text-amber-400/40"
                      }`}
                    >
                      {c.result}
                    </span>
                    <span className="text-[9px] text-white/15 w-8 text-right shrink-0">
                      {c.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full w-[80%] rounded-full bg-emerald-400/60" />
                </div>
                <span className="text-[11px] text-emerald-400/70 font-medium">
                  80%
                </span>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ---- Capabilities Grid ---- */}
        <section>
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-3">
              Capabilities
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Everything you need to
              <br />
              run a disciplined crew
            </h3>
          </FadeUp>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capabilities.map((c, i) => (
              <FadeUp key={i} delay={i * 0.04}>
                <div
                  className={`${card} p-5 h-full hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200 group`}
                >
                  <c.Icon className="w-5 h-5 text-[#8B5CF6]/50 group-hover:text-[#8B5CF6]/70 transition-colors mb-3" />
                  <p className="text-[13px] font-medium text-white">
                    {c.title}
                  </p>
                  <p className="mt-1 text-[11.5px] text-white/35 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ---- Works with ---- */}
        <section>
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-6">
              Works with your tools
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {integrations.map((t, i) => (
                <div
                  key={i}
                  className={`${card} p-4 text-center hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200 flex flex-col items-center`}
                >
                  <span className="text-white/30">{t.icon}</span>
                  <p className="mt-1.5 text-[11px] text-white/40">{t.name}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

        {/* ---- Stats ---- */}
        <section>
          <FadeUp>
            <div
              ref={statsRef}
              className={`${card} grid grid-cols-3 divide-x divide-white/[0.06] py-10`}
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white tracking-tight">
                  <Counter target={98} suffix="+" containerRef={statsRef} />
                </p>
                <p className="mt-1 text-[11px] text-white/25">MCP tools</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white tracking-tight">
                  <Counter target={120} suffix="+" containerRef={statsRef} />
                </p>
                <p className="mt-1 text-[11px] text-white/25">
                  API endpoints
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white tracking-tight">
                  <Counter target={5} containerRef={statsRef} />
                </p>
                <p className="mt-1 text-[11px] text-white/25">
                  Stage pipeline
                </p>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ---- Quote ---- */}
        <section>
          <FadeUp>
            <blockquote className="text-lg md:text-xl text-white/30 leading-relaxed w-full">
              "Dispatcher doesn't replace your engineers. It gives your AI
              agents the discipline to actually ship."
            </blockquote>
            <p className="mt-4 text-[11px] text-white/15">
              Built for operators who ship with AI
            </p>
          </FadeUp>
        </section>

        {/* ---- Beta CTA ---- */}
        <section className="pb-16">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]/60 mb-3">
              Early Access
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Join the beta
            </h3>
            <p className="mt-3 text-sm text-white/35 max-w-md leading-relaxed">
              We're letting operators in gradually. Drop your email and we'll
              reach out when your spot opens.
            </p>
            {betaStatus === "success" ? (
              <p className="mt-6 text-sm text-emerald-400/80">
                You're on the list. We'll be in touch.
              </p>
            ) : (
              <form
                className="mt-6 flex gap-3 max-w-md"
                onSubmit={handleBetaSubmit}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={betaEmail}
                  onChange={(e) => setBetaEmail(e.target.value)}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#8B5CF6]/40"
                  required
                />
                <button
                  type="submit"
                  disabled={betaStatus === "sending"}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  {betaStatus === "sending"
                    ? "Sending..."
                    : "Get Early Access"}
                </button>
              </form>
            )}
            {betaStatus === "error" && (
              <p className="mt-3 text-[11px] text-red-400/70">
                Something went wrong. Try again.
              </p>
            )}
            <p className="mt-3 text-[11px] text-white/20">
              No spam. We'll reach out when your spot opens.
            </p>
          </FadeUp>
        </section>
      </div>
    </div>
  );
}
