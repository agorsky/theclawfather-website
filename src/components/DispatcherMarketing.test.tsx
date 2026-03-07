import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DispatcherMarketing from './DispatcherMarketing';

// Mock framer-motion — render children as plain divs
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const safeProps: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(props)) {
        if (['className', 'style', 'id', 'role', 'onClick', 'onSubmit'].includes(key)) {
          safeProps[key] = val;
        }
      }
      return <div {...safeProps}>{children}</div>;
    },
  },
  useInView: () => true,
}));

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

function renderComponent() {
  return render(<DispatcherMarketing />);
}

describe('DispatcherMarketing', () => {
  it('renders the hero section with correct copy', () => {
    renderComponent();
    expect(screen.getByText('AI Agent Orchestration')).toBeInTheDocument();
    expect(screen.getByText('Agents that take orders.')).toBeInTheDocument();
    expect(screen.getByText('Actually ship.')).toBeInTheDocument();
    expect(
      screen.getByText(/Dispatcher gives your AI crew memory/)
    ).toBeInTheDocument();
  });

  it('renders the component with violet theme (not red)', () => {
    const { container } = renderComponent();
    const html = container.innerHTML;
    expect(html).toContain('#8B5CF6');
    expect(html).toContain('#7C3AED');
    expect(html).not.toContain('#E11837');
    expect(html).not.toContain('#c01530');
  });

  it('renders workflow step descriptions', () => {
    const { container } = renderComponent();
    const text = container.textContent || '';
    expect(text).toContain(
      'Tell your crew what needs to be built in plain language'
    );
    expect(text).toContain(
      'Dispatcher breaks it into epics, features, and tasks with full context'
    );
    expect(text).toContain(
      'Agents are assigned sessions with memory, specs, and constraints'
    );
    expect(text).toContain(
      'Automated validation confirms the work is actually done'
    );
  });

  it('renders the Plan section with epic and feature data', () => {
    const { container } = renderComponent();
    const text = container.textContent || '';
    expect(text).toContain('From vague idea to');
    expect(text).toContain('User Authentication System');
    expect(text).toContain('3 features · 11 tasks');
    expect(text).toContain('Database Schema');
    expect(text).toContain('API Endpoints');
    expect(text).toContain('Auth UI');
    expect(text).toContain('Create User model');
    expect(text).toContain('Add JWT middleware');
    expect(text).toContain('Implement refresh tokens');
  });

  it('renders the Execute section with phase data', () => {
    const { container } = renderComponent();
    const text = container.textContent || '';
    expect(text).toContain('Parallel agents,');
    expect(text).toContain('coordinated phases');
    expect(text).toContain('Execution Progress');
    expect(text).toContain('Phase 2 of 3');
    expect(text).toContain('E2E Testing');
    expect(text).toContain('↕ running in parallel');
  });

  it('renders the Monitor section with terminal events', () => {
    const { container } = renderComponent();
    const text = container.textContent || '';
    expect(text).toContain('dispatcher — agent monitor');
    expect(text).toContain('bobby · epic ENG-E42');
    expect(text).toContain('Use bcrypt rounds=12 for security');
    expect(text).toContain('7 events · 2 decisions · 0 blocked');
  });

  it('renders the Validate section with checks and progress', () => {
    const { container } = renderComponent();
    const text = container.textContent || '';
    expect(text).toContain('Done means');
    expect(text).toContain('actually done');
    expect(text).toContain('TypeScript compiles');
    expect(text).toContain('Route registered');
    expect(text).toContain('Session logged');
    expect(text).toContain('Code review');
    expect(text).toContain('4/5 passed');
    expect(text).toContain('80%');
  });

  it('renders all capability cards', () => {
    const { container } = renderComponent();
    const text = container.textContent || '';
    expect(text).toContain('98 MCP Tools');
    expect(text).toContain('Quality Gates');
    expect(text).toContain('Session Handoff');
    expect(text).toContain('Decision Logging');
    expect(text).toContain('Dependency Graph');
    expect(text).toContain('Structured Specs');
    expect(text).toContain('Compliance Audit');
    expect(text).toContain('run a disciplined crew');
  });

  it('renders integration logos', () => {
    const { container } = renderComponent();
    const text = container.textContent || '';
    expect(text).toContain('Claude Code');
    expect(text).toContain('OpenClaw');
    expect(text).toContain('GitHub');
    expect(text).toContain('Terminal');
  });

  it('renders the quote and attribution', () => {
    const { container } = renderComponent();
    const text = container.textContent || '';
    expect(text).toContain(
      "Dispatcher doesn't replace your engineers"
    );
    expect(text).toContain('Built for operators who ship with AI');
  });

  it('renders the stats section', () => {
    const { container } = renderComponent();
    const text = container.textContent || '';
    expect(text).toContain('MCP tools');
    expect(text).toContain('API endpoints');
    expect(text).toContain('Stage pipeline');
  });

  it('renders the beta CTA with email form', () => {
    renderComponent();
    expect(screen.getByText('Join the beta')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('your@email.com')
    ).toBeInTheDocument();
    expect(screen.getByText('Get Early Access')).toBeInTheDocument();
  });

  it('submits beta form and shows success message', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText('your@email.com');
    const submitBtn = screen.getByText('Get Early Access');

    await user.type(emailInput, 'test@example.com');
    await user.click(submitBtn);

    expect(global.fetch).toHaveBeenCalledWith('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        tag: 'dispatcher-beta',
      }),
    });

    expect(
      await screen.findByText("You're on the list. We'll be in touch.")
    ).toBeInTheDocument();
  });

  it('shows error on failed form submission', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText('your@email.com');
    const submitBtn = screen.getByText('Get Early Access');

    await user.type(emailInput, 'test@example.com');
    await user.click(submitBtn);

    expect(
      await screen.findByText('Something went wrong. Try again.')
    ).toBeInTheDocument();
  });
});
